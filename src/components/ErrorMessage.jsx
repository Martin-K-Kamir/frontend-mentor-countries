import { GoAlert } from "react-icons/go";

const ErrorMessage = ({children}) => {

    return (
        <div className="text-lg font-semibold text-red-600 dark:text-red-100 flex flex-col items-center">
            <GoAlert className="w-7 h-7" strokeWidth="1px"/>
            <p>{children}</p>
        </div>
    )
}