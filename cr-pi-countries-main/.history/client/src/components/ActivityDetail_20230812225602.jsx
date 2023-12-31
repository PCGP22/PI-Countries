import { useState } from 'react'
import { connect } from "react-redux"
import { useParams } from 'react-router-dom';
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

    return (
        <div className='activityPage__container' >
            <aside className='activityPage__aside'>
                <h1>Edit activity</h1>
                <Form initialState={initialState} idActivity={idActivity} aux={aux}/>

            </aside>
            <main className='activityPage__main' onMouseOver={()=>setAux(!aux)}>
            <h2>All activities:</h2>
            <ActivityContainer source={activities} />
        </main>
        </div>
      )
    }

const mapStateToProps =(state) => {
    return{
        allActivities: state.allActivities,
    }
}


export default connect(mapStateToProps,null)(ActivityDetail)