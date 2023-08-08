import { Link } from 'react-router-dom'
import "../styles/LandingPage.modules.css"

function LandingPage(props) {
  
  return (
    <>
      <div className='landingPage__container'>
        <main className={'landingPage__main dark-purple white-text'}>
            <h1 className='landingPage__title title-text no-space'>Países</h1>
            <p className='landingPage__text big-text no-space'>Aplicación donde puedes explorar el mundo y sus países a partir de sus banderas además de poder asignar las actividades turísticas de los mismos.</p>
            <Link to="/countries/countries/" className='landingPage__button button big-text'>
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


export default LandingPage