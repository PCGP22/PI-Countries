import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { activityCreate, addActivities, removeActivity, idActivitySearch, updateActivity} from '../redux/actions';
import { useParams } from 'react-router-dom';
import { validar } from "../common/Functions.js"
import Form from './Form';
import "../styles/ActivityPage.modules.css"
import ActivityContainer from './ActivityContainer';



function ActivityDetail(props) {
    
    const {idActivity} = useParams()

    const activities = props.allActivities

    let initialState = {
        name: props.currentActivity.name && props.currentActivity.name,
        difficulty: props.currentActivity.difficulty && props.currentActivity.difficulty,
        duration: props.currentActivity.duration && props.currentActivity.duration,
        season: props.currentActivity.season && props.currentActivity.season,
        countryId: props.currentActivity.countryId && props.currentActivity.countryId,
        imageURL: props.currentActivity.imageURL ? props.currentActivity.imageURL : "",
        description: props.currentActivity.description? props.currentActivity.description: "",
    }
    
    const [aux,setAux] = useState(true)
    
    
    useEffect(() => {
        
        console.log("act")  
    }, [aux])
    

    return (
        <div className='activityPage__container' onMouseOver={()=>setAux(!aux)}>
            <aside className='activityPage__aside'>
                <h1>Edit activity</h1>
                <Form initialState={initialState} idActivity={idActivity}/>

            </aside>
            <main className='activityPage__main'>
            <h2>All activities:</h2>
            <ActivityContainer source={activities} />
        </main>
        </div>
      )
    }


const mapStateToProps =(state) => {
    return{
        allActivities: state.allActivities,
        allCountries: state.allCountries,
        currentActivity: state.currentActivity,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        activityCreate: (activity) => {dispatch(activityCreate(activity))},
        addActivities: () => {dispatch(addActivities())},
        removeActivity: (id) => {dispatch(removeActivity(id))},
        idActivitySearch: (idActivity) => {dispatch(idActivitySearch(idActivity))},
        updateActivity: (idActivity,activity) => {dispatch(updateActivity(idActivity,activity))},

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ActivityDetail)