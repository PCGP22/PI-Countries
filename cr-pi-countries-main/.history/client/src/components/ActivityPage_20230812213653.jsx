import { connect } from "react-redux"
import "../styles/ActivityPage.modules.css"
import Form from "./Form";
import ActivityContainer from './ActivityContainer';


function ActivityPage(props) {
    
    const activities = props.allActivities
    
    const initialState = {
        name: "",
        difficulty: 0,
        duration: 0,
        season: "",
        countryId: [],
        imageURL: "",
        description: "",
    }
    
  return (
    <div className='activityPage__container'>
        <aside className='activityPage__aside'>
            <h1>Create activity</h1>
            <Form initialState={initialState} />
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
        allActivities: state.allActivities
    }
}


export default connect(mapStateToProps,null)(ActivityPage)