import { useSelector } from "react-redux";
import { selectCountryById } from "./countriesSlice.js";
import React, { useEffect, useState } from "react";
import imagePlaceholder from "../../assets/images/image-placeholder.webp";

let CountriesListItem = ({ countryId }) => {
    const {population, capital, flags, name, region} = useSelector(state => selectCountryById(state, countryId));

    const [imageSrc, setImageSrc] = useState(flags.svg);

    const formattedPopulation = new Intl.NumberFormat().format(population);
    const formattedCapital = capital.length > 0 ? capital.join(", ") : 'No capital'

    useEffect(() => {
        const img = new Image();
        img.src = flags.svg;
        img.onerror = () => {
            img.src = flags.png;
            img.onerror = () => setImageSrc(imagePlaceholder);
        };
        img.onload = () => setImageSrc(img.src);
    }, [flags.svg, flags.png]);

    return (
        <li className="bg-white dark:bg-shark-900 shadow w-full max-w-[16.5rem] sm:max-w-none mx-auto rounded-lg overflow-hidden transition-transform hover:-translate-y-3 focus-within:-translate-y-3 focus-within:outline outline-2 outline-zinc-900 dark:outline-white">
            <a href="#" className="outline-none">
                <img className="aspect-video bg-white object-cover w-full" src={imageSrc}
                     alt={flags.alt} aria-hidden={flags.alt ? undefined : true}/>
                <div className="p-6 pt-3">
                    <h2 className="text-lg font-bold">{name.common}</h2>
                    <ul className="mt-3 text-sm">
                        <li>
                            <span className="font-semibold">Population:</span> {formattedPopulation}
                        </li>
                        <li className="mt-1">
                            <span className="font-semibold">Region:</span> {region}
                        </li>
                        <li className="mt-1">
                            <span className="font-semibold">Capital:</span> {formattedCapital}
                        </li>
                    </ul>
                </div>
            </a>
        </li>
    )
}

CountriesListItem = React.memo(CountriesListItem);

export default CountriesListItem