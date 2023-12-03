import { api } from "../api/api";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";


export const countriesAdapter = createEntityAdapter({
    selectId: country => country.name.official,
    sortComparer: (a, b) => a.name.official.localeCompare(b.name.official),
});

const initialState = countriesAdapter.getInitialState();

const extendedApi = api.injectEndpoints({
    endpoints: builder => ({
        getCountries: builder.query({
            // query: () => '/all',
            query: () => '/all?fields=name,flags,population,capital,region',
            transformResponse: response => {
                return countriesAdapter.setAll(initialState, response);
            },
        }),
    }),
});

export const {
    useGetCountriesQuery,
} = extendedApi;

export const selectCountriesResult = extendedApi.endpoints.getCountries.select();

const selectCountriesData = createSelector(
    selectCountriesResult,
    countriesResult => countriesResult.data
);

export const {
    selectAll: selectAllCountries,
    selectById: selectCountryById,
    selectIds: selectCountriesIds,
} = countriesAdapter.getSelectors(state => selectCountriesData(state) ?? initialState);