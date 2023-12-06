import { api } from "../api/api";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

export const countriesAdapter = createEntityAdapter({
    selectId: country => country.name.common,
    sortComparer: (a, b) => a.name.common.localeCompare(b.name.common),
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
        getCountry: builder.query({
            query: id => `/name/${id}?fields=name,flags,population,capital,region,subregion,tld,currencies,languages,borders`,
            transformResponse: response => {
                return response[0];
            },
        }),
    }),
});

export const {
    useGetCountriesQuery,
    useGetCountryQuery,
} = extendedApi;

export const selectCountriesResult = extendedApi.endpoints.getCountries.select();

const selectCountriesData = createSelector(
    selectCountriesResult,
    countriesResult => countriesResult.data
);

export const {
    selectAll: selectAllCountries,
    selectById: selectCountryById,
    selectIds: selectCountryIds,
    selectTotal: selectCountriesTotal,
} = countriesAdapter.getSelectors(state => selectCountriesData(state) ?? initialState);