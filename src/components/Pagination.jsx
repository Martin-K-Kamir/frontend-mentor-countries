import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";

const Pagination = ({ currentPage, itemsTotal, itemsPerPage }) => {
    const navigate = useNavigate();

    const handlePrevClick = () => {
        navigate(`/${+currentPage - 1}`);
    };

    const handleNextClick = () => {
        navigate(`/${+currentPage + 1}`);
    };

    const isPrevDisabled = +currentPage === 1;
    const isNextDisabled =
        +currentPage === Math.ceil(itemsTotal / itemsPerPage);

    return (
        <div className="flex items-center justify-between gap-3 flex-col lg:flex-row">
            <p className="text-sm">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, itemsTotal)} of{" "}
                {itemsTotal} results
            </p>
            <div className="flex gap-3">
                <Button
                    bold
                    size="sm"
                    onClick={handlePrevClick}
                    disabled={isPrevDisabled}
                    // startIcon={<GoArrowLeft className="text-base" />}
                >
                    Previous
                </Button>
                <Button
                    bold
                    size="sm"
                    onClick={handleNextClick}
                    disabled={isNextDisabled}
                    // endIcon={<GoArrowRight className="text-base" />}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default Pagination;
