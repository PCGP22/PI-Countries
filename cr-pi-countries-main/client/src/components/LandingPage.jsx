import { Link } from 'react-router-dom'
import "../styles/LandingPage.modules.css"
import image from "../countries.png"

function LandingPage(props) {
  
  return (
    <>
      <div className='landingPage__container'>
        <main className={'landingPage__main dark-purple white-text'}>
            <h1 className='landingPage__title title-text no-space'>Countries</h1>
            <p className='landingPage__text big-text no-space'>Application where you can create touristic activities for any country while learning some info about them.</p>
            <Link to="/countries/countries/" className='landingPage__button button big-text'>
                Begin
            </Link>
        </main>
        <aside className='landingPage__aside'>
            <img className='landingPage__image' src={image}/>
        </aside>
      </div>     
    </>
  )
}


export default LandingPage