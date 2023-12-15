import { useEffect, useRef, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import classnames from "classnames";

const Select = ({ options, value, label, onChange, disabled }) => {
    const ref = useRef();
    const idRef = useRef(nanoid());

    const [currentValue, setCurrentValue] = useState(value);
    const [isOpen, setIsOpen] = useState(false);

    const classes = classnames(
        "relative inline-flex w-max flex-shrink-0 transition-opacity rounded-lg focus-visible:outline outline-inherit outline-2",
        {
            "opacity-50 pointer-events-none !outline-none": disabled,
        }
    );

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick, true);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const getOptionElements = () => {
        const focusableElements =
            'li[role="option"]:not([aria-disabled="true"])';
        const elements = Array.from(
            ref.current.querySelectorAll(focusableElements)
        );
        const currentIndex = elements.indexOf(document.activeElement);
        return { elements, currentIndex };
    };

    const toggleIsOpen = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    };

    const handleLabelClick = () => {
        if (disabled) return;
        toggleIsOpen();
    };

    const handleOutsideClick = e => {
        if (!ref.current?.contains(e.target)) {
            setIsOpen(false);
        }
    };

    const handleEnterKey = e => {
        if (e.target !== ref.current) return;

        toggleIsOpen();
    };

    const handleArrowDownKey = e => {
        e.preventDefault();
        const { elements, currentIndex } = getOptionElements();

        if (!isOpen) {
            setIsOpen(true);
        } else if (currentIndex < elements.length - 1) {
            elements[currentIndex + 1].focus();
        }
    };

    const handleArrowUpKey = e => {
        e.preventDefault();
        const { elements, currentIndex } = getOptionElements();

        if (currentIndex > 0) {
            elements[currentIndex - 1].focus();
        } else if (isOpen) {
            setIsOpen(false);
            ref.current.focus();
        }
    };

    const handleTabKey = () => {
        const { elements, currentIndex } = getOptionElements();

        if (currentIndex !== elements.length - 1) return;

        setIsOpen(false);
    };

    const handleKeyDown = e => {
        if (disabled) return;

        switch (e.key) {
            case "Enter":
                handleEnterKey(e);
                break;
            case "ArrowDown":
                handleArrowDownKey(e);
                break;
            case "ArrowUp":
                handleArrowUpKey(e);
                break;
            case "Tab":
                handleTabKey(e);
            default:
                break;
        }
    };

    const handleOptionClick = option => {
        if (option.value === currentValue?.value) {
            onChange(null);
            setCurrentValue(null);
        } else {
            onChange(option);
            setCurrentValue(option);
        }
        setIsOpen(false);
    };

    const renderedOptions = options.map(({ value, label }, i, arr) => {
        return (
            <li
                key={value}
                role="option"
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-shark-800 focus:bg-gray-100 focus:dark:bg-shark-800 py-1.5 px-5 sm:px-6 select-none outline-none"
                tabIndex={0}
                onClick={() => handleOptionClick({ value, label })}
                onKeyDown={e =>
                    e.key === "Enter" && handleOptionClick({ value, label })
                }
                aria-disabled={value === "default"}
                aria-hidden={value === "default"}
                aria-setsize={arr.length}
                aria-posinset={i + 1}
                aria-controls={`select-${idRef.current}`}
                aria-selected={value === value?.value}
                aria-labelledby={`label-${idRef.current}`}
            >
                {label}
            </li>
        );
    });

    return (
        <div
            ref={ref}
            className={classes}
            tabIndex={disabled ? undefined : 0}
            role="combobox"
            id={`select-${idRef.current}`}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-owns={`listbox-${idRef.current}`}
            aria-labelledby={`label-${idRef.current}`}
            onKeyDown={handleKeyDown}
        >
            <div
                onClick={handleLabelClick}
                className="flex items-center gap-5 bg-white dark:bg-shark-900 py-3 px-5 sm:py-4 sm:px-6 rounded-lg shadow cursor-pointer select-none"
            >
                <div>
                    <div id={`label-${idRef.current}`}>
                        {value?.label ?? label ?? "Select an option"}
                    </div>
                    {/* This div is used to pre-render all possible select options offscreen.
                    This ensures that the width of the select component is set to the width of the widest option,
                    preventing any width changes when different options are selected.*/}
                    <div
                        aria-hidden="true"
                        className="opacity-0 invisible pointer-events-none h-0"
                    >
                        {label ?? "Select an option"}
                        {options.map(option => (
                            <div key={option.label}>{option.label}</div>
                        ))}
                    </div>
                </div>

                {isOpen ? (
                    <GoChevronUp
                        className="w-4 h-4 flex-shrink-0"
                        strokeWidth="0.5px"
                    />
                ) : (
                    <GoChevronDown
                        className="w-4 h-4 flex-shrink-0"
                        strokeWidth="0.5px"
                    />
                )}
            </div>

            {isOpen && (
                <ul
                    className="bg-white w-full dark:bg-shark-900 py-1.5 rounded-lg shadow-md absolute z-10 -bottom-2 translate-y-full outline-none"
                    role="listbox"
                    id={`listbox-${idRef.current}`}
                    aria-live="polite"
                >
                    {renderedOptions}
                </ul>
            )}
        </div>
    );
};

export default Select;
