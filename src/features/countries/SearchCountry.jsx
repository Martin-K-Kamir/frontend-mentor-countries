import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useSearchCountryQuery } from "./countriesSlice.js";

const SearchCountry = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const {data, error, isLoading, isFetching } = useSearchCountryQuery(
        debouncedSearchTerm,
        {
            skip: !debouncedSearchTerm,
        }
    );

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        e.target.reset();
        e.target.focus();
    };


    return (
        <div>
            <form>
                <input
                    type="text"
                    onChange={handleChange}
                    placeholder="Search..."
                />
                <button type="submit">
                    {isFetching ? "Loading..." : "Search"}
                </button>
            </form>
        </div>
    )
}

export default SearchCountry;