
const SearchCountry = ({searchTerm, onSearch, onSubmit, loading}) => {

    return (
        <div>
            <form>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={onSearch}
                    placeholder="Search..."
                />
                <button type="submit">
                    {loading ? "Loading..." : "Search"}
                </button>
            </form>
        </div>
    )
}

export default SearchCountry;