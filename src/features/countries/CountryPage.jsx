import { useParams } from "react-router-dom";
import {
    useGetBorderCountriesQuery,
    useGetCountryQuery,
} from "./countriesSlice.js";
import Button from "../../components/Button.jsx";

const CountryPage = () => {
    const { countryId } = useParams();

    const {
        data: country,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetCountryQuery(countryId);

    const { data: borderCountries } = useGetBorderCountriesQuery(
        country?.borders,
        {
            skip: !country?.borders?.length,
        }
    );

    const { name, flags, info } = country || {};

    console.log(borderCountries);

    if (isLoading) {
        return <div>Loading...</div>;
    } else if (isSuccess) {
        const renderedInfo = info.map(({ label, value }) => {
            return (
                <li className="mt-2" key={label}>
                    <span className="font-semibold">{label}:</span>{" "}
                    <span className="font-light">{value}</span>
                </li>
            );
        });

        const renderedBorderCountries = borderCountries?.map(name => (
            <li key={name}>
                <Button bold size="sm" to={`/${name}`}>
                    {name}
                </Button>
            </li>
        ));

        return (
            <div className="max-w-md mx-auto px-8 md:max-w-none md:mx-auto md:px-0 md:wrapper">
                <div className="flex flex-col md:flex-row mt-20 gap-8 md:items-center">
                    <img
                        className="rounded-lg max-w-lg"
                        src={flags.svg}
                        alt={flags?.alt}
                        aria-hidden={flags?.alt ? undefined : true}
                    />
                    <div className="text-base flex-shrink-0">
                        <h2 className="text-2xl font-bold">{name}</h2>
                        <ul className="mt-5">{renderedInfo}</ul>

                        {borderCountries?.length > 0 && (
                            <div className="mt-2 flex flex-col gap-3">
                                <p className="font-semibold">
                                    Border Countries:
                                </p>
                                <ul className="flex flex-wrap gap-3">
                                    {renderedBorderCountries}
                                </ul>{" "}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    } else if (isError) {
        return (
            <div>
                {error.status} {error.statusText}
            </div>
        );
    }
};

export default CountryPage;
