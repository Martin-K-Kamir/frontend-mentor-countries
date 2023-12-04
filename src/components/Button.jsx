import { Link } from "react-router-dom";
import classnames from "classnames";

const Button = ({
    children,
    to,
    href,
    variant,
    color = "primary",
    size = "md",
    bold,
    className,
    startIcon,
    endIcon,
    ...rest
}) => {
    const Component = to ? Link : href ? "a" : "button";

    const classes = classnames(
        "inline-flex items-center justify-center leading-none rounded-lg",
        {
            "font-bold": bold,
            "text-sm pt-2 pb-2.5 px-4 gap-1.5": size === "sm",
            "text-base pt-2 pb-2.5 px-6 gap-1": size === "md",
            "text-lg": size === "lg",
            "text-zinc-900 bg-zinc-100 border border-zinc-200 dark:text-white dark:bg-shark-900 dark:border-shark-800":
                color === "primary" && variant === "contained",
        }
    );

    const iconClasses = classnames("flex-shrink-0");

    return (
        <Component className={classes} to={to} href={href} {...rest}>
            {startIcon && <span className={iconClasses}>{startIcon}</span>}
            {children}
            {endIcon && <span className={iconClasses}>{endIcon}</span>}
        </Component>
    );
};

export default Button;
