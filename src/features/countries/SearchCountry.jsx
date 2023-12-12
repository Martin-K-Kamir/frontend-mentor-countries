import classnames from "classnames";
import Spinner from "../../components/Spinner.jsx";
import { TbSearch } from "react-icons/tb";
import { CgClose } from "react-icons/cg";
import IconButton from "../../components/IconButton.jsx";
import { useEffect, useRef } from "react";

const SearchCountry = ({
                           searchTerm,
                           onSearch,
                           onClear,
                           loading,
                           placeholder,
                           ...rest
                       }) => {
    const ref = useRef();

    const classes = classnames(
        "flex items-center relative max-w-md w-full bg-white dark:bg-shark-900 p-4 px-6 gap-4 rounded-lg shadow-md cursor-text",
        rest.className
    );

    const clearClasses = classnames("absolute right-6", {
        "opacity-0 invisible": !searchTerm,
    });

    const spinnerClasses = classnames("absolute right-6 w-5 h-5 flex-shrink-0", {
        "opacity-0 invisible": !loading,
    });

    useEffect(() => {
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const handleEscape = e => {
        if (e.key === "Escape") {
            onClear();
        }
    };

    const handleFocusClick = () => {
        ref.current.querySelector("input").focus();
    };

    return (
        <div className={classes} ref={ref} onClick={handleFocusClick}>
            <TbSearch className="w-4 h-4 flex-shrink-0"/>

            <input
                {...rest}
                type="text"
                value={searchTerm}
                onChange={onSearch}
                placeholder={placeholder ?? "Search for a country..."}
                className="bg-transparent w-full outline-none leading-none"
                autoCorrect="false"
            />

            {loading ? (
                <Spinner className={spinnerClasses}/>
            ) : (
                <IconButton
                    variant="text"
                    className={clearClasses}
                    onClick={onClear}
                    type="button"
                    aria-label="Clear search"
                    title="Clear search"
                >
                    <CgClose
                        className="w-4 h-4 flex-shrink-0"
                        strokeWidth="0.3px"
                    />
                </IconButton>
            )}
        </div>
    );
};

export default SearchCountry;
