import { MdOutlineDarkMode } from "react-icons/md";
import Button from "./Button.jsx";
import React from "react";
import { GoMoon } from "react-icons/go";
import { LuMoon } from "react-icons/lu";

const Header = () => {
    return (
        <header className="bg-white dark:bg-shark-900 shadow">
            <div className="wrapper h-20 flex items-center justify-between">
                <h1 className="text-base sm:text-2xl font-bold">Where in the world?</h1>

                <Button
                    bold
                    variant="text"
                    color="secondary"
                    startIcon={<LuMoon className="text-lg"/>}
                >
                    Dark Mode
                </Button>
            </div>
        </header>
    );
}

export default Header;