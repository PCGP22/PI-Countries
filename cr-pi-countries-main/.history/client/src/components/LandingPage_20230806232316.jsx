import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { addCountries, addActivities } from '../redux/actions'
import { connect } from "react-redux"
import "../styles/LandingPage.modules.css"

function LandingPage(props) {
  useEffect(() => {
    props.addCountries()
    props.addActivities()
  }, [])
  
  return (
    <>
      <div className='landingPage__container'>
        <main className={'landingPage__main dark-purple white-text'}>
            <h1 className='landingPage__title title-text'>Países</h1>
            <p className='landingPage__text big-text'>Aplicación donde puedes explorar el mundo y sus países a partir de sus banderas además de poder asignar las actividades turísticas de los mismos.</p>
            <Link to="/countries/countries/" className='landingPage__button'>
                Comenzar
            </Link>
        </main>
        <aside className='landingPage__aside'>
            <img className='landingPage__image' src='../../public/countries.png'/>
        </aside>
      </div>     
    </>
  )
}
const mapDispatchToProps = (dispatch) => {
  return{
    addCountries: ()=>{dispatch(addCountries())},
    addActivities: ()=>{dispatch(addActivities())},
  }
}

export default connect(null,mapDispatchToProps)(LandingPage)