export const ADD_COUNTRIES = "ADD_COUNTRIES"
export const ID_SEARCH = "ID_SEARCH"
export const NAME_SEARCH = "NAME_SEARCH"
export const FILTER = "FILTER"
export const ORDER = "ORDER"
export const ACTIVITY_CREATE = "ACTIVITY_CREATE"
import axios from "axios"
    
export const addCountries = () => {
    const endpoint = 'http://localhost:5000/countries/'
    return async (dispatch) => {
        try{
            const {data} = await axios(endpoint);
            return dispatch({
                type: ADD_COUNTRIES,
                payload: data
            })
        }
        catch(error){
            console.log(error.message)
        }
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

export const activityCreate = (activity) => {
    const endpoint = 'http://localhost:5000/activities/'
    return async (dispatch) => {
        try{
            const {data} = await axios(endpoint,activity);
            return dispatch({
                type: ACTIVITY_CREATE,
                payload: data
            })
        }
        catch(error){
            console.log(error.message)
        }
    }
    return
    
    
}

