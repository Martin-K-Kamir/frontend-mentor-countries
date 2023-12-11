import { configureStore } from "@reduxjs/toolkit";
import { api } from "../features/api/api";
import alertReducer, { addAlert } from "../features/alert/alertSlice";

export const store = configureStore({
    reducer: {
        alert: alertReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(api.middleware),
});

// store.dispatch(
//     addAlert({
//         message: "Success!",
//         timeout: 5000000,
//         variant: "success",
//     })
// );
