import CountriesList from "./CountriesList.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import {
    ABOVE_LG,
    ABOVE_MD,
    BELOW_LG,
    BELOW_MD,
    BELOW_SM,
    BELOW_XS,
} from "../../app/config.js";
import { useSelector } from "react-redux";
import {
    selectCountriesTotal,
    selectCountryIds,
    useGetCountriesQuery,
} from "./countriesSlice.js";
import Button from "../../components/Button.jsx";
import { MdArrowForward, MdOutlineArrowForward } from "react-icons/md";
import React from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Pagination from "../../components/Pagination.jsx";

const CountriesPage = () => {
    const isAboveLg = useMediaQuery(ABOVE_LG);
    const isBelowLg = useMediaQuery(BELOW_LG);
    const isBelowSm = useMediaQuery(BELOW_SM);
    const isBelowXs = useMediaQuery(BELOW_XS);

    const { pageNum } = useParams();
    const { isSuccess, isLoading, isError, error } = useGetCountriesQuery();
    const countryIds = useSelector(selectCountryIds);
    const countriesTotal = useSelector(selectCountriesTotal);

    let itemsPerPage = 0;
    if (isBelowXs) {
        itemsPerPage = 3;
    } else if (isBelowSm) {
        itemsPerPage = 4;
    } else if (isBelowLg) {
        itemsPerPage = 6;
    } else if (isAboveLg) {
        itemsPerPage = 8;
    }

    let content;
    if (isLoading) {
        content = <div>Loading...</div>;
    } else if (isSuccess) {
        content = (
            <>
                <CountriesList
                    list={countryIds}
                    currentPage={pageNum}
                    itemsPerPage={itemsPerPage}
                />
                <div
                    aria-hidden={true}
                    className="mt-10 mb-3 h-[0.1px] w-full bg-zinc-200 dark:bg-shark-800"
                />
                <Pagination
                    currentPage={pageNum}
                    itemsPerPage={itemsPerPage}
                    itemsTotal={countriesTotal}
                />
            </>
        );
    } else if (isError) {
        content = <div>{error}</div>;
    }

    return <div className="wrapper mt-20">{content}</div>;
};

export default CountriesPage;
