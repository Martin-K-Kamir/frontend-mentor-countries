import Button from "./Button.jsx";
import React, { useEffect } from "react";
import { useLocalStorage, useMediaQuery } from "@uidotdev/usehooks";
import { GoMoon } from "react-icons/go";
import { FiSun } from "react-icons/fi";
import { ABOVE_SM } from "../app/config.js";

const Header = () => {
    const isDarkThemePreferred = useMediaQuery("(prefers-color-scheme: dark)");
    const isAboveSm = useMediaQuery(ABOVE_SM);
    const [mode, saveMode] = useLocalStorage("mode", null);

    useEffect(() => {
        if (mode) return;
        if (isDarkThemePreferred) {
            saveMode("dark");
        } else {
            saveMode("light");
        }
    }, []);

    useEffect(() => {
        document.documentElement.dataset.mode = mode;
        document.documentElement.style.colorScheme = mode;

        return () => {
            delete document.documentElement.dataset.mode;
            delete document.documentElement.style.colorScheme;
        };
    }, [mode]);

    const handleThemeClick = () => {
        if (mode === "light") {
            saveMode("dark");
        } else {
            saveMode("light");
        }
    };

    return (
        <header className="bg-white dark:bg-shark-900 shadow">
            <div className="wrapper h-20 flex items-center justify-between">
                <h1 className="text-base sm:text-2xl font-bold">
                    Where in the world?
                </h1>

                <Button
                    bold
                    size={isAboveSm ? "md" : "sm"}
                    variant="text"
                    startIcon={
                        mode === "light" ? (
                            <GoMoon
                                strokeWidth="0.5px"
                                className="w-[1.15em] h-[1.15em]"
                            />
                        ) : (
                            <FiSun className="w-[1.15em] h-[1.15em]" />
                        )
                    }
                    onClick={handleThemeClick}
                >
                    {mode === "light" ? "Dark" : "Light"} Mode
                </Button>
            </div>
        </header>
    );
};

export default Header;
