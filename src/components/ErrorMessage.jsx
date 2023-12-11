import { GoAlert } from "react-icons/go";
import classnames from "classnames";

const ErrorMessage = ({ children, message, className }) => {
    const classes = classnames(
        "text-lg font-semibold text-red-600 dark:text-red-100 flex flex-col items-center gap-2",
        className
    );

    return (
        <div className={classes}>
            {children ? (
                children
            ) : (
                <>
                    <GoAlert className="w-8 h-8" strokeWidth="0.5" />
                    <p>{message}</p>
                </>
            )}
        </div>
    );
};

export default ErrorMessage;
