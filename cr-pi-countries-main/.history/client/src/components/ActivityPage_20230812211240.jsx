import { connect } from "react-redux"
import { activityCreate, addActivities, removeActivity} from '../redux/actions';
import "../styles/ActivityPage.modules.css"
import Form from "./Form";
import ActivityContainer from './ActivityContainer';


function ActivityPage(props) {
    
    
    const initialState = {
        name: "",
        difficulty: 0,
        duration: 0,
        season: "",
        countryId: [],
        imageURL: "",
        description: "",
    }
  

    const handleReset = () => {
        setForm(initialState)
        setCountryBox([])
        setRating(0)
        setHover(0)
        countryList = []
    }


    const activities = props.allActivities
    
    
  return (
    <div className='activityPage__container'>
        <aside className='activityPage__aside'>
            <h1>Create activity</h1>
            <Form initialState={initialState} handleReset={handleReset}/>
        </aside>
        <main className='activityPage__main'>
            <h2>All activities:</h2>
            <ActivityContainer source={activities}/>
        </main>
    </div>
  )
}


const mapStateToProps =(state) => {
    return{
        allActivities: state.allActivities,
        allCountries: state.allCountries
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        activityCreate: (activity) => {dispatch(activityCreate(activity))},
        addActivities: () => {dispatch(addActivities())},
        removeActivity: (id) => {dispatch(removeActivity(id))}

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ActivityPage)