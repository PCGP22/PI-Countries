import { ADD_COUNTRIES, ID_SEARCH, NAME_SEARCH, FILTER, ACTIVITY_CREATE, ORDER } from "./actions.js"

const initialState = {
    allCountries: [], //recibe todos los países y los guarda desde el landing page
    countriesFiltered: [], //auxiliar para guardar los continentes después del filtro
    allActivities: [], //va guardando las actividades en el estado y las manda al back-end
}

export const reducer = (state=initialState,action) =>{  
    switch(action.type){
        case ADD_COUNTRIES:
            console.log(action.payload)
            return{
                ...state,
                allCountries: action.payload,
                countriesFiltered: state.allCountries
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
        case FILTER:
            if(action.payload[0] === "continents"){
                return{
                    ...state,
                    countriesFiltered: state.allCountries.filter(c=>c.continents === action.payload[1])
                }
            }
            else if( action.payload[0] === "activities"){
                return{
                    ...state,
                    countriesFiltered: state.allCountries.filter(c => c.Activities.find(a=>a.id=== action.payload))
                }
            }
        case ORDER:
            if(action.payload[0]==="alphabet"){
                if(action.payload[1]==="A"){
                    return{
                        ...state,
                        allCountries: state.allCountries.sort((a,b)=> a.name - b.name) 
                    }
                }
                else if(action.payload[1]==="D"){
                    return{
                        ...state,
                        allCountries: state.allCountries.sort((a,b)=> b.name - a.name) 
                    }
                }
            }
            else if(action.payload[0]==="population"){
                if(action.payload[1]==="A"){
                    return{
                        ...state,
                        allCountries: state.allCountries.sort((a,b)=> a.population - b.population) 
                    }
                }
                else if(action.payload[1]==="D"){
                    return{
                        ...state,
                        allCountries: state.allCountries.sort((a,b)=> b.population - a.population) 
                    }
                }
            }
        case ACTIVITY_CREATE:
            return{
                ...state,
                allActivities: action.payload
            }
           
        default: return state;
    }
}