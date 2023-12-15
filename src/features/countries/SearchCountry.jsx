import classnames from "classnames";
import Spinner from "../../components/Spinner.jsx";
import { TbSearch } from "react-icons/tb";
import { CgClose } from "react-icons/cg";
import IconButton from "../../components/IconButton.jsx";
import { useEffect, useRef, useState } from "react";

const SearchCountry = ({
    searchTerm,
    onSearch,
    onClear,
    loading,
    placeholder,
    disabled,
    ...rest
}) => {
    const ref = useRef();
    const [isFocused, setIsFocused] = useState(false);
    const [isTabPressed, setIsTabPressed] = useState(false);

    const classes = classnames(
        "flex items-center relative sm:max-w-md w-full bg-white dark:bg-shark-900 py-3 px-5 sm:py-4 sm:px-6 gap-4 rounded-lg shadow-md cursor-text transition-opacity",
        {
            "opacity-50 pointer-events-none !outline-none": disabled,
            "outline outline-2": isFocused,
        },
        rest.className
    );

    const clearClasses = classnames("absolute right-6", {
        "opacity-0 invisible": !searchTerm,
    });

    const spinnerClasses = classnames(
        "absolute right-6 w-5 h-5 flex-shrink-0",
        {
            "opacity-0 invisible": !loading,
        }
    );

    useEffect(() => {
        const handleKeyDown = e => {
            if (e.key === "Tab") {
                setIsTabPressed(true);
            }
        };

        const handleKeyUp = e => {
            if (e.key === "Tab") {
                setIsTabPressed(false);
            }
        };

        document.addEventListener("keyup", handleKeyUp);
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keyup", handleKeyUp);
            document.removeEventListener("keydown", handleKeyDown);
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

    const handleFocus = e => {
        if (isTabPressed) {
            setIsFocused(true);
        }
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div
            className={classes}
            ref={ref}
            onClick={handleFocusClick}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            <TbSearch className="w-4 h-4 flex-shrink-0" />

            <input
                {...rest}
                type="text"
                value={searchTerm}
                onChange={onSearch}
                placeholder={placeholder ?? "Search for a country"}
                className="bg-transparent w-full outline-none"
                autoCorrect="false"
                tabIndex={disabled ? -1 : 0}
            />

            {loading ? (
                <Spinner className={spinnerClasses} />
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
