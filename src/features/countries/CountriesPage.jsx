import CountriesList from "./CountriesList.jsx";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import {
    ABOVE_SM,
    BELOW_LG,
} from "../../app/config.js";
import {
    useGetCountriesQuery, useSearchCountryQuery,
} from "./countriesSlice.js";
import Pagination from "../../components/Pagination.jsx";
import { GoAlert } from "react-icons/go";
import SearchCountry from "./SearchCountry.jsx";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react"

const CountriesPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const isBelowLg = useMediaQuery(BELOW_LG);
    const isAboveSm = useMediaQuery(ABOVE_SM);
    const {pageId} = useParams();

    const {data, isSuccess, isLoading, isError, error} = useGetCountriesQuery();
    const {data: ids, isFetching: isFetchingIds, isError: isErrorIds} = useSearchCountryQuery(debouncedSearchTerm, {skip: !debouncedSearchTerm});

    const countryIds = debouncedSearchTerm ? ids ?? data?.ids : data?.ids;

    useEffect(() => {
        if (isErrorIds) {
            console.log("error");
        }
    }, [isErrorIds]);

    const itemsPerPage = isBelowLg && isAboveSm ? 9 : 8;

    const handleSearch = e => {
        setSearchTerm(e.target.value);
    }

    return <div className="wrapper mt-20">
        <SearchCountry searchTerm={searchTerm} onSearch={handleSearch} loading={isFetchingIds} />

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
                    itemsTotal={countryIds?.length}
                />
            </>
        )}


    </div>;
};

export default CountriesPage;
