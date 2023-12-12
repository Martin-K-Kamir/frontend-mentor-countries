import { useEffect, useRef, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

const Select = ({ options, value, label, onChange }) => {
    const ref = useRef();
    const idRef = useRef(nanoid());

    const [currentValue, setCurrentValue] = useState(value);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick, true);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const toggleIsOpen = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    };

    const handleLabelClick = () => {
        toggleIsOpen();
    };

    const handleOutsideClick = e => {
        if (!ref.current?.contains(e.target)) {
            setIsOpen(false);
        }
    };

    const handleOptionClick = option => {
        if (option.value === currentValue?.value) {
            onChange({ value: "default" });
            setCurrentValue({ value: "default" });
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
                className="cursor-pointer :hover:bg-gray-100 dark:hover:bg-shark-800 py-1.5 px-5 sm:px-6 select-none"
                tabIndex={0}
                onClick={() => handleOptionClick({ value, label })}
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
        <div ref={ref} className="relative inline-flex w-max flex-shrink-0">
            <div
                onClick={handleLabelClick}
                className="flex items-center gap-5 bg-white dark:bg-shark-900 py-3 px-5 sm:py-4 sm:px-6 rounded-lg shadow-md cursor-pointer select-none"
            >
                <div>
                    {value?.label ?? label ?? "Select an option"}
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
                <ul className="bg-white w-full dark:bg-shark-900 py-1.5 rounded-lg shadow-md absolute z-10 -bottom-2 translate-y-full">
                    {renderedOptions}
                </ul>
            )}
        </div>
    );
};

export default Select;
