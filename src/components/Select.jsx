import { createRef, useEffect, useRef, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import classnames from "classnames";

const Select = ({ options, value, label, onChange, disabled }) => {
    const ref = useRef();
    const refs = useRef([]);
    refs.current = options.map((_, i) => refs.current[i] ?? createRef());
    const idRef = useRef(nanoid());

    const [currentValue, setCurrentValue] = useState(value);
    const [isOpen, setIsOpen] = useState(false);

    const classes = classnames(
        "relative inline-flex w-max flex-shrink-0 transition-opacity rounded-lg focus:outline outline-inherit outline-2",
        {
            "opacity-50 pointer-events-none": disabled,
        }
    );

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

    const handleEnterKey = e => {
        if (e.target !== ref.current) return;

        toggleIsOpen();
    };

    const handleArrowDownKey = e => {
        if (e.target !== ref.current) return;

        e.preventDefault();

        if (!isOpen) {
            setIsOpen(true);
        } else {
            const index = options.findIndex(
                option => option.value === currentValue?.value
            );

            if (index === options.length - 1) {
                setCurrentValue(options[0]);
                refs.current[0].current.focus();
            } else {
                setCurrentValue(options[index + 1]);
                refs.current[index + 1].current.focus();
            }
        }
    };

    const handleArrowUpKey = e => {
        if (e.target !== ref.current) return;

        e.preventDefault();

        if (!isOpen) {
            setIsOpen(true);
        } else {
            const index = options.findIndex(
                option => option.value === currentValue?.value
            );

            if (index === 0) {
                setCurrentValue(options[options.length - 1]);
                refs.current[options.length - 1].current.focus();
            } else {
                setCurrentValue(options[index - 1]);
                refs.current[index - 1].current.focus();
            }
        }
    };

    const handleKeyDown = e => {
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
                ref={refs.current[i]}
                role="option"
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-shark-800 focus:bg-gray-100 focus:hover:bg-shark-800 py-1.5 px-5 sm:px-6 select-none  "
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
        <div
            ref={ref}
            className={classes}
            tabIndex="0"
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
