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
            query: () => "/all?fields=name,flags,population,capital,region",
            transformResponse: response => {
                return countriesAdapter.setAll(initialState, response);
            },
        }),
        getCountry: builder.query({
            query: id =>
                `/name/${id}?fields=name,flags,population,capital,region,subregion,tld,currencies,languages,borders`,
            transformResponse: response => {
                const [data] = response;

                return {
                    name: data.name.official,
                    flags: data.flags,
                    borders: data.borders,
                    info: [
                        {
                            label: "Native Name",
                            value:
                                Object.values(data.name.nativeName)[0]
                                    ?.official ?? "N/A",
                        },
                        {
                            label: "Population",
                            value: data.population
                                ? new Intl.NumberFormat().format(
                                      data.population
                                  )
                                : "N/A",
                        },
                        {
                            label: "Region",
                            value: data.region || "N/A",
                        },
                        {
                            label: "Sub Region",
                            value: data.subregion || "N/A",
                        },
                        {
                            label: "Capital",
                            value: data.capital.join(", ") || "N/A",
                        },
                        {
                            label: "Top Level Domain",
                            value: data.tld.join(", ") || "N/A",
                        },
                        {
                            label: "Currencies",
                            value:
                                Object.values(data.currencies)
                                    .map(({ name }) => name)
                                    .join(", ") || "N/A",
                        },
                        {
                            label: "Languages",
                            value:
                                Object.values(data.languages).join(", ") ||
                                "N/A",
                        },
                    ],
                };
            },
        }),
        getBorderCountries: builder.query({
            query: borders => `/alpha?codes=${borders}&fields=name`,
            transformResponse: response => {
                return response.map(({ name }) => name.common);
            },
        }),
    }),
});

export const {
    useGetCountriesQuery,
    useGetCountryQuery,
    useGetBorderCountriesQuery,
} = extendedApi;

export const selectCountriesResult =
    extendedApi.endpoints.getCountries.select();

const selectCountriesData = createSelector(
    selectCountriesResult,
    countriesResult => countriesResult.data
);

export const {
    selectAll: selectAllCountries,
    selectById: selectCountryById,
    selectIds: selectCountryIds,
    selectTotal: selectCountriesTotal,
} = countriesAdapter.getSelectors(
    state => selectCountriesData(state) ?? initialState
);
