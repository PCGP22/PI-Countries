import { useState } from 'react'
import { addCountries, addActivities, nameSearch } from '../redux/actions'
import { connect } from "react-redux"
import Filter from './Filter.jsx'
import "../styles/HomePage.modules.css"
import Container from './Container';


function HomePage(props) {

  const [reloadAux, setReloadAux] = useState(true)

  let countries = props.countriesFiltered

  const aux = () => {
    setReloadAux(!reloadAux)
    countries = props.countriesFiltered
  }

  
  return (
    <>
      <Filter aux={aux}/>
      {/* {reloadAux? "":""} */}
        
      <main className='homePage__container'>
        <Container source={countries} aux={aux}/>
      </main>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    countriesFiltered: state.countriesFiltered,
    errorMessage: state.errorMessage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addCountries: ()=>{dispatch(addCountries())},
    addActivities: ()=>{dispatch(addActivities())},
    nameSearch: (name) => {dispatch(nameSearch(name))}
  
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomePage)