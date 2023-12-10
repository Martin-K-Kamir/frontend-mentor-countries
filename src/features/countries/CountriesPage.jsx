import CountriesList from "./CountriesList.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { ABOVE_SM, BELOW_LG } from "../../app/config.js";
import {
    useGetCountriesQuery,
    useSearchCountryQuery,
} from "./countriesSlice.js";
import Pagination from "../../components/Pagination.jsx";
import { GoAlert } from "react-icons/go";
import SearchCountry from "./SearchCountry.jsx";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

const CountriesPage = () => {
    const navigate = useNavigate();
    const { pageId } = useParams();
    const isBelowLg = useMediaQuery(BELOW_LG);
    const isAboveSm = useMediaQuery(ABOVE_SM);
    const itemsPerPage = isBelowLg && isAboveSm ? 9 : 8;
    const [countryIds, setCountryIds] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const lessDebouncedSearchTerm = useDebounce(searchTerm, 300);
    const debouncedSearchTerm = useDebounce(searchTerm, 1_000);

    const {
        data: countriesData,
        isSuccess: isCountriesQuerySuccess,
        isLoading: isCountriesQueryLoading,
        isError: isCountriesQueryError,
        error: countriesQueryError,
    } = useGetCountriesQuery();
    const {
        currentData: searchResults,
        isFetching: isSearchingCountries,
        isSuccess: isSearchSuccess,
        isError: isSearchError,
        error: searchError,
    } = useSearchCountryQuery(debouncedSearchTerm, {
        skip: !debouncedSearchTerm,
    });

    useEffect(() => {
        if (!lessDebouncedSearchTerm) {
            setCountryIds(countriesData?.ids || []);
            return;
        }

        if (isCountriesQuerySuccess && !debouncedSearchTerm) {
            setCountryIds(countriesData?.ids);
        }

        if (isSearchSuccess && !isSearchingCountries) {
            setCountryIds(searchResults);
            navigate("/page/1");
        }
    }, [
        isCountriesQuerySuccess,
        isSearchSuccess,
        isSearchingCountries,
        debouncedSearchTerm,
        lessDebouncedSearchTerm,
    ]);

    useEffect(() => {
        if (!isSearchError) return;

        alert(
            `An error has occurred: ${searchError.status} ${searchError.statusText}`
        );
    }, [isSearchError]);

    const handleSearch = e => {
        setSearchTerm(e.target.value);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
    };

    return (
        <div className="wrapper mt-10 lg:mt-20">
            <SearchCountry
                searchTerm={searchTerm}
                onSearch={handleSearch}
                onClear={handleClearSearch}
                loading={isSearchingCountries}
            />

            <div className="mt-10 lg:mt-20">
                <CountriesList
                    data={countryIds}
                    loading={isCountriesQueryLoading}
                    currentPage={pageId}
                    itemsPerPage={itemsPerPage}
                />
            </div>

            {isCountriesQueryError && (
                <div className="text-lg font-semibold text-red-600 dark:text-red-100 flex flex-col items-center">
                    <GoAlert className="w-7 h-7" strokeWidth="1px" />
                    <p>
                        An error has occurred: {countriesQueryError.status}{" "}
                        {countriesQueryError.statusText}
                    </p>
                </div>
            )}

            {isCountriesQuerySuccess && !isCountriesQueryError && (
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
        </div>
    );
};

export default CountriesPage;
