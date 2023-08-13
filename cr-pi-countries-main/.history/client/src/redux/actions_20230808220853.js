export const ADD_COUNTRIES = "ADD_COUNTRIES"
export const ID_SEARCH = "ID_SEARCH"
export const NAME_SEARCH = "NAME_SEARCH"
export const FILTER = "FILTER"
export const ORDER = "ORDER"
export const ACTIVITY_CREATE = "ACTIVITY_CREATE"
export const ADD_ACTIVITIES = "ADD_ACTIVITIES"
import axios from "axios"
    
export const addCountries = () => {
    const endpoint = 'http://localhost:5000/countries/'
    return async (dispatch) => {
        try{
            const {data} = await axios.get(endpoint);
            return dispatch({
                type: ADD_COUNTRIES,
                payload: data
            })
        }
        catch(error){
            return dispatch({
                type: ADD_COUNTRIES,
                payload: error
            })
        }
}}

export const addActivities = () => {
    const endpoint = 'http://localhost:5000/countries/activities'
    return async (dispatch) =>{
        try{
            const {data} = await axios.get(endpoint);
            return dispatch({
                type: ADD_ACTIVITIES,
                payload: data
            })
        }
        catch(error){
            return dispatch({
                type: ADD_ACTIVITIES,
                payload: error
            })
        }
    }
}

export const idSearch = (idCountry) => {
    const endpoint = `http://localhost:5000/countries/countries/${idCountry}`
    return async (dispatch) => {
    try{
        const {data} = await axios(endpoint)
        if(typeof data === "error"){console.log("error")}
        return dispatch({
            type: ID_SEARCH,
            payload: data[0]
        })
    }
    catch(error){
        return dispatch({
            type: ID_SEARCH,
            payload: error
        })
    }
}
}

export const nameSearch = (name) => {
    const endpoint = `http://localhost:5000/countries/countries/search?name=${name}`
    return async (dispatch) => {
        try{
            const {data} = await axios(endpoint)
            return dispatch({
                type: NAME_SEARCH,
                payload: data
            })
        }
        catch(error){
            return dispatch({
                type: NAME_SEARCH,
                payload: error
            })
        }
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
            return dispatch({
                type: ACTIVITY_CREATE,
                payload: error
            })
        }
    } 
}

