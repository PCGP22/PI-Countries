export const ADD_COUNTRIES = "ADD_COUNTRIES"
export const ID_SEARCH = "ID_SEARCH"
export const NAME_SEARCH = "NAME_SEARCH"
export const FILTER = "FILTER"
export const ORDER = "ORDER"
export const ACTIVITY_CREATE = "ACTIVITY_CREATE"
    
export const addCountries = (countries) => {return {
    type: ADD_COUNTRIES,
    payload: countries
}}
export const idSearch = (countryFound) => {return{
    type: ID_SEARCH,
    payload: countryFound
}}
export const nameSearch = (countryFound) => {return {
    type: NAME_SEARCH,
    payload: countryFound
}}
export const filter = (filterdata) => {return {
    type: FILTER,
    payload: filterdata
}}
export const order = (orderdata) => {return{
    type: ORDER,
    payload: orderdata
}}
export const activityCreate = (activity) => {return{
    type: ACTIVITY_CREATE,
    payload: activity
}}

