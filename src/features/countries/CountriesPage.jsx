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
import { selectCountriesTotal } from "./countriesSlice.js";
import Button from "../../components/Button.jsx";
import { MdArrowForward, MdOutlineArrowForward } from "react-icons/md";
import React from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const CountriesPage = () => {
    const isAboveLg = useMediaQuery(ABOVE_LG);
    const isBelowLg = useMediaQuery(BELOW_LG);
    const isBelowSm = useMediaQuery(BELOW_SM);
    const isBelowXs = useMediaQuery(BELOW_XS);

    const { pageNum } = useParams();
    const navigate = useNavigate();
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

    const handlePrevClick = () => {
        navigate(`/${+pageNum - 1}`);
    };

    const handleNextClick = () => {
        navigate(`/${+pageNum + 1}`);
    };

    const isPrevDisabled = +pageNum === 1;
    const isNextDisabled =
        +pageNum === Math.ceil(countriesTotal / itemsPerPage);

    return (
        <div className="wrapper">
            <CountriesList currentPage={pageNum} itemsPerPage={itemsPerPage} />
            <div
                aria-hidden={true}
                className="mt-10 h-[0.1px] w-full bg-zinc-200 dark:bg-shark-900"
            />
            <div className="flex items-center justify-between gap-3 flex-col lg:flex-row mt-3">
                <p className="text-sm">
                    Showing {(pageNum - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(pageNum * itemsPerPage, countriesTotal)} of{" "}
                    {countriesTotal} results
                </p>
                <div className="flex gap-3">
                    <Button
                        size="sm"
                        variant="contained"
                        color="primary"
                        onClick={handlePrevClick}
                        disabled={isPrevDisabled}
                        startIcon={<GoArrowLeft className="text-base" />}
                    >
                        Prev
                    </Button>
                    <Button
                        size="sm"
                        variant="contained"
                        color="primary"
                        onClick={handleNextClick}
                        disabled={isNextDisabled}
                        endIcon={<GoArrowRight className="text-base" />}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CountriesPage;
