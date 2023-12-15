import { useLocation, useParams } from "react-router-dom";
import {
    useGetBorderCountriesQuery,
    useGetCountryQuery,
} from "./countriesSlice.js";
import Button from "../../components/Button.jsx";
import { toCamelCase, toTitleCase } from "../../helpers.js";
import CountryFlag from "./CountryFlag.jsx";
import { GoAlert, GoArrowLeft } from "react-icons/go";
import Spinner from "../../components/Spinner.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import { useMediaQuery } from "@uidotdev/usehooks";
import { ABOVE_SM } from "../../app/config.js";
import { useEffect } from "react";

const CountryPage = () => {
    const isAboveSm = useMediaQuery(ABOVE_SM);
    const location = useLocation();
    const from = location.state?.from ?? "1";
    const { countryId } = useParams();

    const {
        data: country,
        isFetching,
        isSuccess,
        isError,
        error,
    } = useGetCountryQuery(toTitleCase(countryId));

    const { currentData: borderCountries } = useGetBorderCountriesQuery(
        country?.borders,
        {
            skip: !country?.borders?.length,
        }
    );

    const { name, flags, info } = country || {};

    useEffect(() => {
        const originalTitle = document.title;

        if (name) {
            document.title = `${name} | Where in the world`;
        } else {
            document.title = "Where in the world?";
        }

        return () => {
            document.title = originalTitle;
        };
    }, [name]);

    let content;
    if (isFetching) {
        content = (
            <div className="flex justify-center mt-20 lg:mt-32">
                <Spinner delay={200} />
            </div>
        );
    } else if (isSuccess) {
        const renderedInfo = info.map(({ label, value }) => {
            return (
                <li className="mt-2" key={label}>
                    <span className="font-semibold">{label}:</span>{" "}
                    <span className="">{value}</span>
                </li>
            );
        });

        const renderedBorderCountries = borderCountries?.map(name => (
            <li key={name}>
                <Button
                    bold
                    size="sm"
                    to={`/country/${toCamelCase(name)}`}
                    state={{ from }}
                >
                    {name}
                </Button>
            </li>
        ));

        content = (
            <div className="flex flex-col lg:flex-row mt-10 lg:mt-20 gap-7 lg:gap-12 lg:justify-between">
                <div className="max-w-lg w-full">
                    <CountryFlag
                        className="rounded-lg max-h-96 w-full shadow-lg bg-white"
                        flags={flags}
                        width="512"
                        height="250"
                    />
                </div>
                <div className="max-w-lg w-full lg:max-w-2xl text-base">
                    <h2 className="text-2xl lg:text-3xl	font-bold">{name}</h2>
                    <ul className="mt-6 lg:mt-7 xl:grid xl:grid-cols-[repeat(2,auto)] xl:gap-x-5">
                        {renderedInfo}
                    </ul>

                    {borderCountries?.length > 0 && (
                        <div className="mt-6 lg:mt-7 xl:mt-9 flex flex-col gap-3">
                            <h2 className="text-lg lg:text-xl font-bold">
                                Border Countries:
                            </h2>
                            <ul className="flex flex-wrap gap-3">
                                {renderedBorderCountries}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        );
    } else if (isError) {
        let message = "An error has occurred. Please try again later.";
        if (error?.status === 404)
            message = `No results found for "${toTitleCase(countryId).trim()}"`;

        content = (
            <ErrorMessage
                message={message}
                className="mt-10 sm:mt-20 sm:whitespace-nowrap"
            />
        );
    }

    return (
        <div className="max-w-lg mx-auto px-8 pb-20 lg:max-w-none lg:mx-auto lg:px-0 lg:wrapper">
            <div className="mt-10 sm:mt-20">
                <Button
                    bold
                    size={isAboveSm ? "md" : "sm"}
                    to={`/page/${from}`}
                    startIcon={
                        <GoArrowLeft
                            className="translate-y-[1px]"
                            strokeWidth="1px"
                        />
                    }
                >
                    Go Back
                </Button>
            </div>

            {content}
        </div>
    );
};

export default CountryPage;
