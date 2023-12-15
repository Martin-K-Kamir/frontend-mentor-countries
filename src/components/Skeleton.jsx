import classnames from "classnames";

const Skeleton = ({ children, loading, bgClassName, ...rest }) => {
    const classes = classnames(
        "animate-pulse rounded",
        {
            "bg-gray-200 dark:bg-shark-800": !bgClassName,
        },
        rest.className
    );

    return (
        <>
            {loading && <div {...rest} className={classes} />}
            {!loading && children}
        </>
    );
};

export default Skeleton;