import classnames from "classnames";
import { CgSpinner } from "react-icons/cg";
import { useState } from "react";

const Spinner = ({ className, delay = 0 }) => {
    const [show, setShow] = useState(false);

    const classes = classnames(
        "animate-spin",
        {
            "w-11 h-11": !className,
        },
        className
    );

    setTimeout(() => setShow(true), delay);

    return show ? <CgSpinner className={classes} /> : null;
};

export default Spinner;
