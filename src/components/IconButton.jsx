import Button from "./Button.jsx";

const IconButton = ({ children, ...rest }) => {
    return (
        <Button {...rest} isIconButton>
            {children}
        </Button>
    );
};

export default IconButton;
