import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function ActivityContainer(props) {
    
    const { pathname } = useLocation();

    const Activities = props.source;

    const handleDeleteActivity =(e) => {
        props.removeActivity(e.target.value)
    }

  return (
    <section className='activityContainer'>
        {pathname.startsWith("/countries/countries/") && 
            <Link to={"/countries/activities/"} className='activityLink'>Add activities</Link>
        }
        {(Activities && Activities.length !== 0) && Activities.map(a => {
            let ratingActivity = "★".repeat(a.difficulty).split("")
            return(
                <div className='activityBox' key={a.id}>
                    {pathname === "/countries/activities/" && 
                        <>
                            <Link className="activityBox__editButton" to={`/countries/activities/${a.id}`}>Edit</Link>
                            <button type='button' onClick={handleDeleteActivity} className='activityBox__closeButton' value={a.id}>X</button>
                        </>
                    }
                    {(pathname !== "/countries/activities/" && pathname.startsWith("/countries/activities/")) &&
                      props.currentActivity.id === a.id ? "": 
                        <>
                            <Link className="activityBox__editButton" to={`/countries/activities/${a.id}`}>Edit</Link>
                            <button type='button' onClick={handleDeleteActivity} className='activityBox__closeButton' value={a.id}>X</button>
                        </>
                    }
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

const mapStateToProps =(state) => {
    return{
        currentActivity: state.currentActivity,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        removeActivity: (id) => {dispatch(removeActivity(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ActivityContainer)
