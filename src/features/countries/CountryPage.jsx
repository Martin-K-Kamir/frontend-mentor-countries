import { useParams } from "react-router-dom";
import { useGetCountryQuery } from "./countriesSlice.js";

const CountryPage = () => {
    const {countryId} = useParams()

    const {data, isLoading, isSuccess, isError, error} = useGetCountryQuery(countryId)

    console.log(data)

    if (isLoading) {
        return <div>Loading...</div>
    } else if (isSuccess) {
        return <div className="wrapper">
            <div className="flex flex-col mt-20">
                <img className="" src={data.flags.svg} alt={data.flags.alt}/>
            </div>
        </div>
    } else if (isError) {
        return <div>{error.status} {error.statusText}</div>
    }

}

export default CountryPage