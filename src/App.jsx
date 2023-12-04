import CountriesPage from "./features/countries/CountriesPage.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";

function App() {

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Navigate to="/1" replace/>}/>
                <Route path="/:pageNum" index element={<CountriesPage/>}/>
            </Route>

            <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
    )
}

export default App
