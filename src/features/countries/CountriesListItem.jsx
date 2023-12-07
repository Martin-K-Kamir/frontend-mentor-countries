import { useSelector } from "react-redux";
import { selectCountryById } from "./countriesSlice.js";
import React, { useEffect, useState } from "react";
import imagePlaceholder from "../../assets/images/image-placeholder.webp";
import Skeleton from "../../components/Skeleton.jsx";
import { Link } from "react-router-dom";
import { toCamelCase } from "../../helpers.js";

let CountriesListItem = ({countryId, loading}) => {
    const {name, flags, info} = useSelector(state => selectCountryById(state, countryId)) || {};

    const renderedInfo = (info ?? Array.from({length: 3}, (_, i) => i + 1)).map((item) => {
        return (
            <li className="mt-1" key={item?.label ?? item}>
                <Skeleton
                    loading={loading}
                    className="h-[1.125rem] w-5/6"
                >
                    <span className="font-medium">{item?.label}:</span>{" "}
                    <span className="font-light">{item?.value}</span>
                </Skeleton>
            </li>
        );
    });

    return (
        <li className="bg-white dark:bg-shark-900 shadow w-full max-w-[16.5rem] sm:max-w-none mx-auto rounded-lg overflow-hidden transition-transform hover:-translate-y-3 [&:has(:focus-visible)]:-translate-y-3 [&:has(:focus-visible)]:outline outline-2 outline-zinc-900 dark:outline-white">
            <Link to={`/country/${toCamelCase(name?.official)}`} className="outline-none">
                <Skeleton loading={loading} className="aspect-video w-full">
                    <img
                        className="aspect-video bg-white object-cover w-full"
                        src={flags?.png}
                        alt={flags?.alt}
                        aria-hidden={flags?.alt ? undefined : true}
                    />
                </Skeleton>

                <div className="p-6 pt-4">
                    <h2 className="text-lg font-bold">
                        <Skeleton
                            loading={loading}
                            className="h-[1.5rem] w-1/2"
                        >
                            {name?.common}
                        </Skeleton>
                    </h2>
                    <ul className="mt-4 text-sm">
                        {renderedInfo}
                    </ul>
                </div>
            </Link>
        </li>
    );
};

CountriesListItem = React.memo(CountriesListItem);

export default CountriesListItem;
