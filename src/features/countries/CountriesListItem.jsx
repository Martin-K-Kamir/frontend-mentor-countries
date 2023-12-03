import { useSelector } from "react-redux";
import { selectCountryById } from "./countriesSlice.js";

const CountriesListItem = ({ countryId }) => {
    const country = useSelector(state => selectCountryById(state, countryId));

    const formattedPopulation = new Intl.NumberFormat().format(country.population);

    const formattedCapital = country.capital.length > 0 ? country.capital.join(", ") : 'No capital'

    console.log(country)

    return (
        <div className="bg-white dark:bg-shark-900 shadow w-full max-w-[16.5rem] sm:max-w-none mx-auto rounded-lg overflow-hidden">
            <img className="aspect-video bg-white object-cover w-full" src={country.flags.svg}
                 alt={country.flags.alt} aria-hidden={country.flags.alt ? undefined : true}/>
            <div className="p-6 pt-3">
                <h2 className="text-lg font-bold">{country.name.common}</h2>
                <ul className="mt-3 text-sm">
                    <li>
                        <span className="font-semibold">Population:</span> {formattedPopulation}
                    </li>
                    <li className="mt-1">
                        <span className="font-semibold">Region:</span> {country.region}
                    </li>
                    <li className="mt-1">
                        <span className="font-semibold">Capital:</span> {formattedCapital}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CountriesListItem