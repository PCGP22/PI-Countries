import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { addCountries } from '../redux/actions'

function LandingPage(props) {
  useEffect(() => {
    props.addCountries()
    console.log("done")
    
  }, [])
  
  return (
    <>     
        <main className='landingPage__main'>
            <h1 className='landingPage__title'>Países</h1>
            <p className='landingPage__text'>Aplicación donde puedes explorar el mundo y sus países a partir de sus banderas además de poder asignar las actividades turísticas de los mismos.</p>
            <Link to="/countries/countries/">
                <p className='landingPage__button'>Comenzar</p>
            </Link>
        </main>
        <aside className='landingPage__aside'>
            <img className='landingPage__image' src='../../public/countries.png'/>
        </aside>
    </>
  )
}
const mapDispatchToProps = (dispatch) => {
  return{
    addCountries: ()=>{dispatch(addCountries())}
  }
}

export default LandingPage