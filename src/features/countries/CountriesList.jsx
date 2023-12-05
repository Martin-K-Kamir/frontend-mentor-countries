import CountriesListItem from "./CountriesListItem.jsx";

const CountriesList = ({ list, currentPage, itemsPerPage }) => {
    const currentCountryIds =
        currentPage && itemsPerPage
            ? list.slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
              )
            : list;

    return (
        <ul className="grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-14">
            {currentCountryIds.map(countryId => (
                <CountriesListItem key={countryId} countryId={countryId} />
            ))}
        </ul>
    );
};

export default CountriesList;
