import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'

function ActivityContainer(props) {
    
    const { pathname } = useLocation();

    const Activities = props.currentCountry;
//     className={location.pathname.toString() === "/countries/activities/"?
//     'navBar__link link_active big-text'
//     : 'navBar__link--unactive big-text'
//   }
  return (
    <section className='activityContainer'>
        {pathname === "/countries/countries/"}
        {(Activities && Activities.length !== 0) && Activities.map(a => {
            let ratingActivity = "★".repeat(a.difficulty).split("")
            return(
                <div className='activityBox' key={a.id}>
                <p><strong>Name:</strong> {a.name}</p>
                {ratingActivity.map((r)=>
                    <span key={Math.random()} className='on star_mini'>{r}</span>
                    )}
                <p>Duration: {a.duration} Hrs.</p>
                <p>Season: {a.season}</p>
                <p>Countries: {a.countryId?a.countryId:"N/A"}</p>
            </div>
            )
        })}
    </section>
  )
}

const mapStateToProps = (state) => {
    return{
      currentCountry: state.currentCountry,
    }
  }

export default connect(mapStateToProps,null)(ActivityContainer)
