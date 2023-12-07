import { useSelector } from "react-redux";
import { selectCountryById } from "./countriesSlice.js";
import React from "react";
import Skeleton from "../../components/Skeleton.jsx";
import { Link, useParams } from "react-router-dom";
import { toCamelCase } from "../../helpers.js";
import CountryFlag from "./CountryFlag.jsx";
import classnames from "classnames";

let CountriesListItem = ({ countryId, loading }) => {
    const { pageId } = useParams();
    const { name, flags, info } =
        useSelector(state => selectCountryById(state, countryId)) || {};

    const classes = classnames(
        "bg-white dark:bg-shark-900 shadow w-full max-w-[16.5rem] sm:max-w-none mx-auto rounded-lg overflow-hidden transition-transform hover:-translate-y-3 outline-2 outline-zinc-900 dark:outline-white",
        {
            "pointer-events-none": loading,
            "[&:has(:focus-visible)]:-translate-y-3 [&:has(:focus-visible)]:outline":
                !loading,
        }
    );

    const renderedInfo = (
        info ?? Array.from({ length: 3 }, (_, i) => i + 1)
    ).map(item => {
        return (
            <li className="mt-1" key={item?.label ?? item}>
                <Skeleton loading={loading} className="h-[1.125rem] w-5/6">
                    <span className="font-medium">{item?.label}:</span>{" "}
                    {item?.value}
                </Skeleton>
            </li>
        );
    });

    return (
        <li className={classes}>
            <Link
                to={`/country/${toCamelCase(name?.official)}`}
                state={{ from: pageId }}
                className="outline-none"
            >
                <CountryFlag
                    loading={loading}
                    className="aspect-video bg-white object-cover w-full"
                    skeletonClassName="aspect-video w-full"
                    flags={flags}
                />

                <div className="p-6 pt-4">
                    <h2 className="text-lg font-bold">
                        <Skeleton
                            loading={loading}
                            className="h-[1.5rem] w-1/2"
                        >
                            {name?.common}
                        </Skeleton>
                    </h2>
                    <ul className="mt-4 text-sm">{renderedInfo}</ul>
                </div>
            </Link>
        </li>
    );
};

CountriesListItem = React.memo(CountriesListItem);

export default CountriesListItem;
