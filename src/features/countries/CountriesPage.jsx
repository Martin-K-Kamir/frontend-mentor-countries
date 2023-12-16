import CountriesList from "./CountriesList.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { ABOVE_SM, ALERT_TIMEOUT_LONG, BELOW_LG } from "../../app/config.js";
import {
    selectCountryIdsByRegion,
    useGetCountriesQuery,
    useSearchCountryQuery,
} from "./countriesSlice.js";
import Pagination from "../../components/Pagination.jsx";
import SearchCountry from "./SearchCountry.jsx";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { addAlert } from "../alert/alertSlice.js";
import { store } from "../../app/store.js";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import Select from "../../components/Select.jsx";
import { useSelector } from "react-redux";

const CountriesPage = () => {
    const navigate = useNavigate();
    const { pageId } = useParams();
    const isBelowLg = useMediaQuery(BELOW_LG);
    const isAboveSm = useMediaQuery(ABOVE_SM);
    const itemsPerPage = isBelowLg && isAboveSm ? 9 : 8;

    const [selectedRegion, setSelectedRegion] = useState(null);
    const [countryIds, setCountryIds] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const lessDebouncedSearchTerm = useDebounce(searchTerm, 300);
    const debouncedSearchTerm = useDebounce(searchTerm, 700);

    const {
        data: countriesData,
        isSuccess: isCountriesQuerySuccess,
        isLoading: isCountriesQueryLoading,
        isError: isCountriesQueryError,
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

    const filteredCountryIds = useSelector(state =>
        selectCountryIdsByRegion(state, searchResults, selectedRegion?.value)
    );

    useEffect(() => {
        if (selectedRegion) return;

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
        isSearchingCountries,
        isSearchSuccess,
        isSearchError,
        debouncedSearchTerm,
        lessDebouncedSearchTerm,
        selectedRegion,
    ]);

    useEffect(() => {
        if (isSearchError) return;

        if (selectedRegion && !isSearchingCountries) {
            setCountryIds(filteredCountryIds);
            navigate("/page/1");
        }
    }, [
        selectedRegion,
        isSearchingCountries,
        isSearchSuccess,
        filteredCountryIds,
        isSearchError,
    ]);

    useEffect(() => {
        if (!isSearchError) return;
        setSearchTerm("");

        let message = "An error has occurred. Please try again later.";
        if (searchError?.status === 404)
            message = `No results found for "${debouncedSearchTerm}"`;

        store.dispatch(
            addAlert({
                message,
                variant: "danger",
                timeout: ALERT_TIMEOUT_LONG,
            })
        );
    }, [isSearchError]);

    const handleSearch = e => {
        setSearchTerm(e.target.value);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
    };

    const handleSelectChange = option => {
        setSelectedRegion(option);
    };

    return (
        <div className="wrapper mt-10 sm:mt-20 pb-28">
            <form
                className="flex flex-col gap-5 sm:flex-row sm:justify-between"
                onSubmit={e => e.preventDefault()}
            >
                <SearchCountry
                    searchTerm={searchTerm}
                    onSearch={handleSearch}
                    onClear={handleClearSearch}
                    loading={isSearchingCountries}
                    disabled={isCountriesQueryLoading || isCountriesQueryError}
                />

                <Select
                    label="Filter by Region"
                    value={selectedRegion}
                    onChange={handleSelectChange}
                    disabled={
                        isCountriesQueryLoading ||
                        isCountriesQueryError ||
                        isSearchingCountries ||
                        isSearchError
                    }
                    options={[
                        { value: "africa", label: "Africa" },
                        { value: "americas", label: "Americas" },
                        { value: "asia", label: "Asia" },
                        { value: "europe", label: "Europe" },
                        { value: "oceania", label: "Oceania" },
                    ]}
                />
            </form>

            <div className="mt-10 sm:mt-20">
                {!isCountriesQueryError ? (
                    <CountriesList
                        data={countryIds}
                        loading={isCountriesQueryLoading}
                        currentPage={pageId}
                        itemsPerPage={itemsPerPage}
                    />
                ) : (
                    <ErrorMessage message="An error has occurred. Please try again later." />
                )}

                {countryIds?.length === 0 &&
                    !isCountriesQueryLoading &&
                    searchTerm && <ErrorMessage message="No results found." />}
            </div>

            {isCountriesQuerySuccess && !isCountriesQueryError && (
                <>
                    <div
                        aria-hidden={true}
                        className="mt-10 mb-5 h-[0.5px] w-full bg-zinc-200 dark:bg-shark-800"
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
