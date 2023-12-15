import { removeAlert, selectAlertById } from "./alertSlice.js";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import IconButton from "../../components/IconButton.jsx";
import { ALERT_TIMEOUT_DEFAULT } from "../../app/config.js";
import { CgClose } from "react-icons/cg";
import { GoAlert, GoCheckCircle, GoInfo, GoXCircle } from "react-icons/go";

const AlertItem = ({ alertId }) => {
    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const [maxHeight, setMaxHeight] = useState(0);
    const ref = useRef(null);

    const alert = useSelector(state => selectAlertById(state, alertId));
    const { variant, message, timeout } = alert;

    useEffect(() => {
        setMaxHeight(ref.current.scrollHeight);

        setTimeout(() => {
            setIsVisible(true);
        }, 100);

        setTimeout(hideAlert, timeout || ALERT_TIMEOUT_DEFAULT);
    }, []);

    const hideAlert = () => {
        setIsVisible(false);
        setIsExpanded(false);
        setMaxHeight(0);

        setTimeout(() => {
            dispatch(removeAlert(alertId));
        }, 500);
    };

    const itemClasses = classnames(
        "mb-4 transition-zoom transition-expand !duration-300 ease-in-out transition-[opacity,transform]",
        {
            "opacity-0 scale-75": !isVisible,
            "!mb-0 !transition-[margin,max-height,visibility,opacity,transform]":
                !isExpanded,
        }
    );

    const contentClasses = classnames(
        "flex items-center font-medium rounded-lg pt-3 pb-3.5 px-5 gap-2.5 max-w-md mx-auto pointer-events-auto shadow-md",
        {
            "text-green-900 bg-green-200": variant === "success",
            "text-red-900 bg-red-200": variant === "danger",
            "text-yellow-900 bg-yellow-200": variant === "warning",
            "text-blue-900 bg-blue-200": !variant?.includes(
                "success",
                "danger",
                "warning"
            ),
        }
    );

    let IconComponent;
    switch (variant) {
        case "success":
            IconComponent = GoCheckCircle;
            break;
        case "danger":
            IconComponent = GoXCircle;
            break;
        case "warning":
            IconComponent = GoAlert;
            break;
        default:
            IconComponent = GoInfo;
    }

    return (
        <div className={itemClasses} ref={ref} style={{ maxHeight }}>
            <div className={contentClasses} ref={ref}>
                <IconComponent
                    className="w-5 h-5 flex-shrink-0"
                    strokeWidth="0.5px"
                />
                {message}
                <IconButton
                    variant="text"
                    color={
                        ["success", "danger", "warning"].includes(variant)
                            ? variant
                            : "info"
                    }
                    className="ml-auto"
                    onClick={hideAlert}
                    aria-label="Close alert"
                    title="Close alert"
                >
                    <CgClose
                        className="w-4 h-4 flex-shrink-0"
                        strokeWidth="0.3px"
                    />
                </IconButton>
            </div>
        </div>
    );
};

export default AlertItem;
