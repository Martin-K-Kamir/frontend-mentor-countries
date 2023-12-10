import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { selectAlertIds } from "./alertSlice.js";
import AlertItem from "./AlertItem.jsx";

const AlertList = () => {
    const alertIds = useSelector(selectAlertIds);

    const renderedAlerts = alertIds.map(alertId => (
        <AlertItem key={alertId} alertId={alertId} />
    ));

    return createPortal(
        <div className="fixed px-8 z-50 top-4 w-full pointer-events-none">
            <div className="grid">{renderedAlerts}</div>
        </div>,
        document.getElementById("alert")
    );
};

export default AlertList;
