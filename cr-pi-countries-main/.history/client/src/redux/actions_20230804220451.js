export const ADD_COUNTRIES = "ADD_COUNTRIES"
export const ID_SEARCH = "ID_SEARCH"
export const NAME_SEARCH = "NAME_SEARCH"
export const FILTER = "FILTER"
export const ORDER = "ORDER"
export const ACTIVITY_CREATE = "ACTIVITY_CREATE"
import axios from "axios"
    
export const addCountries = () => {
    const endpoint = 'http://localhost:5000/countries/landing'
    return async (dispatch) => {
        try{
            const {data} = await axios.get(endpoint);
            return dispatch({
                type: ADD_COUNTRIES,
                payload: data
            })
        }
        catch(error){
            console.log(error.message)
        }
}}

export const idSearch = (id) => {
    const endpoint = `http://localhost:5000/countries/countries/${id}`
    try{
        const {data} = axios(endpoint)
        return{
            type: ID_SEARCH,
            payload: data
        }
    }
    catch(error){
        console.log(error.message)
    }
}

export const nameSearch = (name) => {
    const endpoint = `http://localhost:5000/countries/countries/search?name=${name}`
    try{
        const {data} = axios(endpoint)
        return{
            type: NAME_SEARCH,
            payload: data
        }
    }
    catch(error){
        console.log(error.message)
    }
}

export const filter = (filterdata) => {return {
    type: FILTER,
    payload: filterdata
}}

export const order = (orderdata) => {return{
    type: ORDER,
    payload: orderdata
}}

export const activityCreate = (activity) => {
    const endpoint = 'http://localhost:5000/countries/activities/'
    return async (dispatch) => {
        try{
            const {data} = await axios.post(endpoint,activity);
            return dispatch({
                type: ACTIVITY_CREATE,
                payload: data
            })
        }
        catch(error){
            console.log(error.message)
        }
    } 
}

