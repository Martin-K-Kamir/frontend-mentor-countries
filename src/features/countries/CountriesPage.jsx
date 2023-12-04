import CountriesList from "./CountriesList.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { ABOVE_LG, ABOVE_MD, BELOW_LG, BELOW_MD, BELOW_SM, BELOW_XS } from "../../app/config.js";
import { useSelector } from "react-redux";
import { selectCountriesTotal } from "./countriesSlice.js";


const CountriesPage = () => {
    const isAboveLg = useMediaQuery(ABOVE_LG);
    const isBelowLg = useMediaQuery(BELOW_LG);
    const isBelowSm = useMediaQuery(BELOW_SM);
    const isBelowXs = useMediaQuery(BELOW_XS);

    const { pageNum } = useParams();
    const navigate = useNavigate();
    const countriesTotal = useSelector(selectCountriesTotal);

    let itemsPerPage = 0;
    if (isBelowXs) {
        itemsPerPage = 3;
    } else if (isBelowSm) {
        itemsPerPage = 4;
    } else if (isBelowLg) {
        itemsPerPage = 6;
    } else if (isAboveLg) {
        itemsPerPage = 8;
    }

    const handlePrevClick = () => {
        navigate(`/${+pageNum - 1}`);
    }

    const handleNextClick = () => {
        navigate(`/${+pageNum + 1}`);
    }

    const isPrevDisabled = +pageNum === 1;
    const isNextDisabled = +pageNum === Math.ceil(countriesTotal / itemsPerPage);

    return (
        <div className="wrapper">
            <CountriesList currentPage={pageNum} itemsPerPage={itemsPerPage} />

            <div>
                <button onClick={handlePrevClick} disabled={isPrevDisabled}>Prev</button>
                <button onClick={handleNextClick} disabled={isNextDisabled}>Next</button>
            </div>
        </div>
    )
}

export default CountriesPage