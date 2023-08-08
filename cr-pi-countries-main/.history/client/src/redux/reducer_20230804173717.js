import { ADD_COUNTRIES, ID_SEARCH, NAME_SEARCH, FILTER, ACTIVITY_CREATE, } from "./actions.js"

const initialState = {
    allCountries: [], //recibe todos los países y los guarda desde el landing page
    countriesFiltered: [], //auxiliar para guardar los continentes después del filtro
    allActivities: [], //va guardando las actividades en el estado y las manda al back-end
}

export const reducer = (state=initialState,action) =>{  
    switch(action.type){
        case ADD_COUNTRIES:
            return{
                ...state,
                allCountries:[...action.payload],
                countriesFiltered: allCountries
            }
        case ID_SEARCH:
            return{
                ...state,
                countriesFiltered: [...action.payload]
            }
        case NAME_SEARCH:
            return{
                ...state,
                countriesFiltered: [...action.payload]
            }
        default: return state;
    }
}