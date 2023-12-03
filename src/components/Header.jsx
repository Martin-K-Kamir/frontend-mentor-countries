import { MdOutlineDarkMode } from "react-icons/md";

const Header = () => {
    return (
        <header className="bg-white dark:bg-shark-900 shadow">
            <div className="wrapper h-20 flex items-center justify-between">
                <h1 className="text-base sm:text-2xl font-bold">Where in the world?</h1>
                <p className="flex items-center">
                    <MdOutlineDarkMode/>
                    Dark Mode
                </p>
            </div>
        </header>
    );
}

export default Header;