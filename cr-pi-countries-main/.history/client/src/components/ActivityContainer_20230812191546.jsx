import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { addActivities } from '../redux/actions'
import { useEffect } from 'react';

function ActivityContainer(props) {
    
    const { pathname } = useLocation();

    const Activities = props.currentCountry;

    useEffect(() => {
        props.addActivities()
      }, [])
    

  return (
    <section className='activityContainer'>
        {pathname.startsWith("/countries/countries/") && 
            <Link to={"/countries/activities"} className='activityLink'>Add activities</Link>
        }
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

const mapDispatchToProps = (dispatch) => {
return{
    addActivities: ()=>{dispatch(addActivities())},
}
}

export default connect(mapStateToProps,mapDispatchToProps)(ActivityContainer)
