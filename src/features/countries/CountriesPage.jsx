import CountriesList from "./CountriesList.jsx";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import {
    ABOVE_SM,
    BELOW_LG,
} from "../../app/config.js";
import { useSelector } from "react-redux";
import {
    selectCountriesTotal,
    selectCountryIds,
    useGetCountriesQuery,
} from "./countriesSlice.js";
import Pagination from "../../components/Pagination.jsx";
import { GoAlert } from "react-icons/go";
import SearchCountry from "./SearchCountry.jsx";

const CountriesPage = () => {
    const isBelowLg = useMediaQuery(BELOW_LG);
    const isAboveSm = useMediaQuery(ABOVE_SM);
    const {pageId} = useParams();
    const {data, isSuccess, isLoading, isError, error} = useGetCountriesQuery();
    const countryIds = useSelector(selectCountryIds);
    const countriesTotal = useSelector(selectCountriesTotal);
    const itemsPerPage = isBelowLg && isAboveSm ? 9 : 8;

    console.log({data})

    console.log({countryIds})

    return <div className="wrapper mt-20">
        <SearchCountry/>

        <CountriesList
            data={countryIds}
            loading={isLoading}
            currentPage={pageId}
            itemsPerPage={itemsPerPage}
        />

        {isError && (
            <div className="text-lg font-semibold text-red-600 dark:text-red-100 flex flex-col items-center">
                <GoAlert className="text-xl" strokeWidth="1px"/>
                <p>
                    An error has occurred: {error.status} {error.statusText}
                </p>
            </div>
        )}


        {isSuccess && !isError && (
            <>
                <div
                    aria-hidden={true}
                    className="mt-10 mb-3 h-[0.1px] w-full bg-zinc-200 dark:bg-shark-800"
                />
                <Pagination
                    currentPage={pageId}
                    itemsPerPage={itemsPerPage}
                    itemsTotal={countriesTotal}
                />
            </>
        )}


    </div>;
};

export default CountriesPage;
