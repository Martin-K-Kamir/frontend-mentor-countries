import { selectCountryIds, useGetCountriesQuery } from "./countriesSlice.js";
import { useSelector } from "react-redux";
import CountriesListItem from "./CountriesListItem.jsx";

const CountriesList = ({currentPage, itemsPerPage}) => {
    const {isSuccess, isLoading, isError, error} = useGetCountriesQuery()

    const countryIds = useSelector(selectCountryIds);

    const currentCountryIds = currentPage && itemsPerPage ? countryIds.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : countryIds;


    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    } else if (isSuccess) {
        return (
            <ul className="grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-14 mt-20">
                {currentCountryIds.map(countryId => (
                    <CountriesListItem key={countryId} countryId={countryId}/>
                ))}
            </ul>
        )
    } else if (isError) {
        return (
            <div>{error}</div>
        )
    }

    return null
}

export default CountriesList