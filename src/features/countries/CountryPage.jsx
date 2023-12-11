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

const CountryPage = () => {
    const location = useLocation();
    const from = location.state?.from ?? "1";
    const { countryId } = useParams();

    const {
        data: country,
        isLoading,
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
                        className="rounded-lg max-h-96 w-full shadow-lg"
                        flags={flags}
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
        let message = `An error has occurred: ${error?.status} ${error?.message}`;
        if (error?.status === 404)
            message = `No results found for "${toTitleCase(countryId).trim()}"`;

        content = <ErrorMessage message={message} className="mt-10 lg:mt-20" />;
    }

    return (
        <div className="max-w-lg mx-auto px-8 pb-20 lg:max-w-none lg:mx-auto lg:px-0 lg:wrapper">
            <div className="mt-10 lg:mt-20">
                <Button
                    bold
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
