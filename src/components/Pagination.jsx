import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const Pagination = ({ currentPage, itemsTotal, itemsPerPage }) => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);
    const handlePrevClick = () => {
        navigate(`/page/${+currentPage - 1}`);
    };

    const handleNextClick = () => {
        navigate(`/page/${+currentPage + 1}`);
    };

    const isPrevDisabled = +currentPage === 1 || itemsTotal === 0;
    const isNextDisabled =
        +currentPage === Math.ceil(itemsTotal / itemsPerPage) || itemsTotal === 0;

    return (
        <div className="flex items-center lg:items-start justify-between gap-4 flex-col-reverse lg:flex-row">
            {itemsTotal > 0 && (
                <p className="text-sm">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, itemsTotal)} of{" "}
                    {itemsTotal} results
                </p>
            )}
            <div className="flex gap-3">
                <Button
                    bold
                    size="sm"
                    onClick={handlePrevClick}
                    disabled={isPrevDisabled}
                    startIcon={
                        <GoArrowLeft
                            className="translate-y-[1px]"
                            strokeWidth="1px"
                        />
                    }
                >
                    Previous
                </Button>
                <Button
                    bold
                    size="sm"
                    onClick={handleNextClick}
                    disabled={isNextDisabled}
                    endIcon={
                        <GoArrowRight
                            className="translate-y-[1px]"
                            strokeWidth="1px"
                        />
                    }
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default Pagination;
