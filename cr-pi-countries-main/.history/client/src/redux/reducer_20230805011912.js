import { ADD_COUNTRIES, ID_SEARCH, NAME_SEARCH, FILTER, ACTIVITY_CREATE, ORDER } from "./actions.js"

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
                allCountries: action.payload,
                countriesFiltered: action.payload,
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
                    countriesFiltered: state.allCountries.filter(c=>c.continent === action.payload[1]),
                }
            }
            else if( action.payload[0] === "activities"){
                return{
                    ...state,
                    countriesFiltered: state.allCountries.filter(c => c.Activities.find(a=>a.name=== action.payload)),
                }
            }
        case ORDER:
            console.log(action.payload)
            if(action.payload[0]==="alphabet"){
                if(action.payload[1]==="A"){
                    console.log(state.countriesFiltered)
                    return{
                        ...state,
                        countriesFiltered: state.countriesFiltered.sort((a, b) => {
                            if (a.name < b.name) {
                              return -1;
                            }
                            if (a.name > b.name) {
                              return 1;
                            }
                            return 0;
                          })
                     
                    }
                }
                else if(action.payload[1]==="D"){
                    return{
                        ...state,
                        countriesFiltered: state.countriesFiltered.sort((a, b) => {
                            if (a.name > b.name) {
                              return -1;
                            }
                            if (a.name < b.name) {
                              return 1;
                            }
                            return 0;
                          })
                    }
                }
            }
            else if(action.payload[0]==="population"){
                if(action.payload[1]==="A"){
                    return{
                        ...state,
                        countriesFiltered: state.countriesFiltered.sort((a,b)=> {
                            if (a.population < b.population) {
                              return -1;
                            }
                            if (a.population > b.population) {
                              return 1;
                            }
                            return 0;
                          }) 
                    }
                }
                else if(action.payload[1]==="D"){
                    return{
                        ...state,
                        countriesFiltered: state.countriesFiltered.sort((a, b) => {
                            if (a.population > b.population) {
                              return -1;
                            }
                            if (a.population < b.population) {
                              return 1;
                            }
                            return 0;
                          }) 
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