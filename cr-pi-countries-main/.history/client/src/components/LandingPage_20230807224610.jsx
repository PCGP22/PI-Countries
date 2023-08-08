import { Link } from 'react-router-dom'
import "../styles/LandingPage.modules.css"
import { useEffect } from 'react'
import { addCountries, addActivities } from '../redux/actions'
import { connect } from "react-redux"

function LandingPage(props) {

  useEffect(() => {
      props.addCountries()
      props.addActivities()
    }, [])
  
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

// export default LandingPage