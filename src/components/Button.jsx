import { Link } from "react-router-dom";
import classnames from "classnames";

const Button = ({
    children,
    to,
    href,
    variant = "contained",
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
        "inline-flex items-center justify-center leading-none rounded-lg gap-1.5 pt-2 pb-2.5 px-4 focus-visible:outline-1 disabled:opacity-50 disabled:cursor-not-allowed select-none whitespace-nowrap",
        {
            "font-medium": bold,
            "text-sm": size === "sm",
            "text-base": size === "md",
            "text-lg": size === "lg",
            "text-zinc-900 bg-zinc-100 border border-zinc-200 dark:text-white dark:bg-shark-900 dark:border-shark-800 disabled:hover:bg-zinc-100 hover:bg-zinc-200 disabled:dark:hover:bg-shark-900 dark:hover:bg-shark-800 outline-current":
                color === "primary" && variant === "contained",
            "[&:not(:hover)]:bg-transparent border [&:not(:hover)]:border-transparent":
                variant === "text",
            "text-zinc-900 hover:bg-zinc-100 hover:border-zinc-100 dark:text-white dark:hover:bg-shark-800 dark:hover:border-shark-800":
                variant === "text" && color === "secondary",
        },
        className
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
