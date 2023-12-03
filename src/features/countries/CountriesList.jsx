import { selectCountriesIds, useGetCountriesQuery } from "./countriesSlice.js";
import { useSelector } from "react-redux";
import CountriesListItem from "./CountriesListItem.jsx";

const CountriesList = () => {
    const {isSuccess, isLoading, isError, error} = useGetCountriesQuery()

    const countriesIds = useSelector(selectCountriesIds);

    let content;
    if (isLoading) {
        content = <div>Loading...</div>;
    } else if (isSuccess) {
        content = <div className="grid grid-cols-list gap-14">
            {countriesIds.map(countryId => (
                <CountriesListItem key={countryId} countryId={countryId}/>
            ))}
        </div>
    } else if (isError) {
        content = <div>{error}</div>;
    }

    return (
        <div className="mt-20">
            {content}
        </div>
    )
}

export default CountriesList