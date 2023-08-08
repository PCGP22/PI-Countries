import { ADD_COUNTRIES, ID_SEARCH, NAME_SEARCH, FILTER, ACTIVITY_CREATE, ORDER } from "./actions.js"

const initialState = {
    allCountries: [], 
    countriesFiltered: [], 
    allActivities: [{id:0,name:"actividad de ejemplo", difficulty: 3, duration: 3.5, season: "Primavera"}],
    currentCountry: [],
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
                currentCountry: action.payload
            }
        case NAME_SEARCH:
            return{
                ...state,
                countriesFiltered: state.allCountries.filter(c=> c.name === action.payload.[0].name)
            }
        case FILTER:
            if(action.payload[1] === "all"){
                return{
                    ...state,
                    countriesFiltered: state.allCountries
                }
            }
            if(action.payload[0] === "continents"){
                return{
                    ...state,
                    countriesFiltered: state.allCountries.filter(c=>c.continent === action.payload[1]),
                }
            }
            else if( action.payload[0] === "activities"){
                return{
                    ...state,
                    countriesFiltered: state.allCountries.filter(c => c.hasOwnProperty("Activities") && c.Activities.find(a=>a.name=== action.payload)),
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