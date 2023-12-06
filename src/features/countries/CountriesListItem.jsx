import { useSelector } from "react-redux";
import { selectCountryById } from "./countriesSlice.js";
import React, { useEffect, useState } from "react";
import imagePlaceholder from "../../assets/images/image-placeholder.webp";
import Skeleton from "../../components/Skeleton.jsx";
import {Link} from "react-router-dom";

let CountriesListItem = ({countryId, loading}) => {
    const {population, capital, flags, name, region} = useSelector(state => selectCountryById(state, countryId)) || {};
    const [imageSrc, setImageSrc] = useState(flags?.svg);

    useEffect(() => {
        if (loading) return;
        const img = new Image();
        img.src = flags.svg;
        img.onerror = () => {
            img.src = flags.png;
            img.onerror = () => setImageSrc(imagePlaceholder);
        };
        img.onload = () => setImageSrc(img.src);
    }, [loading, flags?.svg, flags?.png]);

    return (
        <li className="bg-white dark:bg-shark-900 shadow w-full max-w-[16.5rem] sm:max-w-none mx-auto rounded-lg overflow-hidden transition-transform hover:-translate-y-3 [&:has(:focus-visible)]:-translate-y-3 [&:has(:focus-visible)]:outline outline-2 outline-zinc-900 dark:outline-white">
            <Link to={name?.common} className="outline-none">
                <Skeleton loading={loading} className="aspect-video w-full">
                    <img className="aspect-video bg-white object-cover w-full" src={imageSrc}
                         alt={flags?.alt} aria-hidden={flags?.alt ? undefined : true}/>
                </Skeleton>

                <div className="p-6 pt-4">
                    <h2 className="text-lg font-bold">
                        <Skeleton loading={loading} className="h-[1.5rem] w-1/2">
                            {name?.common}
                        </Skeleton>
                    </h2>
                    <ul className="mt-4 text-sm">
                        <li>
                            <Skeleton loading={loading} className="h-[1.125rem] w-5/6">
                                <span className="font-semibold">Population:</span> {population ? new Intl.NumberFormat().format(population) : 'No data'}
                            </Skeleton>
                        </li>
                        <li className="mt-1">
                            <Skeleton loading={loading} className="h-[18px] w-5/6">
                                <span className="font-semibold">Region:</span> {region}
                            </Skeleton>
                        </li>
                        <li className="mt-1">
                            <Skeleton loading={loading} className="h-[18px] w-5/6">
                                <span className="font-semibold">Capital:</span> {capital?.length > 0 ? capital?.join(", ") : 'No capital'}
                            </Skeleton>
                        </li>
                    </ul>
                </div>
            </Link>
        </li>
    )
}

CountriesListItem = React.memo(CountriesListItem);

export default CountriesListItem