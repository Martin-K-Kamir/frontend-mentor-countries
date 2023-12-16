import CountriesListItem from "./CountriesListItem.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";

const CountriesList = ({ data, currentPage, itemsPerPage, loading }) => {
    let list;
    if (loading) {
        list = Array.from({ length: itemsPerPage }, (_, i) => i + 1);
    } else if (data && currentPage && itemsPerPage) {
        list = data.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    } else if (data) {
        list = data;
    }

    return (
        <ul className="grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-14">
            {list.map(countryId => (
                <CountriesListItem
                    loading={loading}
                    key={countryId}
                    countryId={countryId}
                />
            ))}
        </ul>
    );
};
export default CountriesList;
