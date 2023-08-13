import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { activityCreate, addActivities, removeActivity} from '../redux/actions';
import "../styles/ActivityPage.modules.css"



const validar = (inputs) =>{
    const regexNombre = /[\w]{5,}/i;
    let errores = {}

    if(!regexNombre.test(inputs.name) || inputs.name.length>30){
        errores.name = "Name must be 5 to 30 characters long"
    } else if(regexNombre.test(inputs.name) && inputs.name.length<30){delete errores.name}
    if(inputs.difficulty === 0){ errores.difficulty = "Please select difficulty"}
    else if(inputs.difficulty !== 0){delete errores.difficulty}
    if(inputs.duration === 0  || inputs.duration > 10){
        errores.duration = "Duration must be between 1 and 10 hours"
    } else if (inputs.duration !== 0 && inputs.duration <= 10){
        delete errores.duration
    }
    if(inputs.season === ""){
        errores.season = "Please select season"
    } else if( inputs.season !== ""){delete errores.season}
    if(inputs.countryId.join("") === "" ){
        errores.countryId = "Please select at least one country"
    } else if( inputs.countryId.length !== 0){delete errores.countryId}
    if(inputs.imageURL === "error"){
        errores.imageURL = "Please enter a valid image URL"
    }
    if(inputs.description.length > 200){
        errores.description = "Description text must be less than 200 characters"
    } else if(!inputs.description || inputs.description.length <= 200){
        delete errores.description
    }
    
    return errores
}

let countryList = []
function ActivityPage(props) {
    const [rating, setRating] = useState(0);

    const initialState = {
        name: "",
        difficulty: 0,
        duration: 0,
        season: "",
        countryId: [],
        imageURL: "",
        description: "",
    }

    const [countryBox, setCountryBox] = useState([])
    const [form, setForm] = useState(initialState)
    const [errores, setErrores] = useState({})

    const ratings = [1,2,3,4,5]
    const [hover, setHover] = useState(0);
    const activities = props.allActivities
    const countries = props.allCountries.sort((a,b)=>{
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })

    useEffect(() => {
        setForm({...form, countryId: countryList})
    }, [countryBox])

    const handleChange = (e) => {
        
        if(e.target.value !== "ignore"){
            if(e.target.name === "imageURL"){
                setForm({...form, imageURL: e.target.value})
                setErrores(validar({...form, imageURL: e.target.value})) 
                return
            }
            setForm({...form, [e.target.name]: e.target.value})
            setErrores(validar({...form, [e.target.name]: e.target.value}))
        }
    }

    const handleCountryChange = (e) => {
        let [id, name] = e.target.value.split(",")
        if(!countryList.find((c) => c === id)){
            setCountryBox([...countryBox, {id,name}])
            countryList.push(id)
            setErrores(validar({...form, countryId: countryList}))
        }
    }

    const handleReset = () => {
        setForm(initialState)
        setCountryBox([])
        setRating(0)
        setHover(0)
        countryList = []
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let erroresLength = Object.keys(errores).length;
        if(!erroresLength){
            props.activityCreate(form)
            handleReset()
            e.target.reset()
        } else {
            let errorLog = []
            for(let error in errores){
                errorLog.push(errores[error])
            }
            alert(errorLog.join("\n"))
        }
    }

    const handleClose = (e) => {
        let [name, id] = e.target.value.toString().split(",")
        setCountryBox(countryBox.filter(c=> c.name !== name))
        countryList = countryList.filter(c => c !== id)
        setErrores(validar({...form, countryId: countryList}))
    }

    const handleImgError = () => {
        setForm({...form, imageURL: "error"})
        setErrores(validar({...form, imageURL: "error"}))
    }

    const handleDeleteActivity =(e) => {
        props.removeActivity(e.target.value)
    }

    const handleURLErase = () => {
        setForm({...form, imageURL: ""})
    }

    useEffect(() => {
        props.addActivities()
    }, [form])
    
  return (
    <div className='activityPage__container'>
        <aside className='activityPage__aside'>
            <h1>Create activity</h1>
            <form onSubmit={handleSubmit} className='activityPage__form'>
                <fieldset className='activityPage__formSection'> 
                <p>*<small> Indicates a required field</small></p>
                    <label htmlFor="name">*Name of the new activity:</label>
                    <br/>
                    <input type='text' name="name" onChange={handleChange} placeholder='Name of the activity'/>
                    {errores.name?<p className="form--error no-space">{errores.name}</p>:""}
                </fieldset>
                <fieldset className='activityPage__formSection'> 
                    <label htmlFor='difficulty'>*Difficulty:</label>
                    <div className='filter__starContainer'>
                        {
                            ratings.map(i => {
                                return(
                                    <button type="button" name="difficulty" className={i <= (hover || rating)? "on star" : "off star"} key={i} index={i} 
                                    onClick={() => {setRating(i); setForm({...form, difficulty: i})}}
                                    onMouseEnter={() => setHover(i)}
                                    onMouseLeave={() => setHover(rating)}>★</button>
                                    )
                                    
                                })
                            }
                    </div>
                </fieldset>
                <fieldset className='activityPage__formSection'> 
                    <label htmlFor="duration">*Approximate duration:</label>
                    <br/>
                    <input type='number' onChange={handleChange} name="duration" placeholder='0' className='activityPage__numInput' min="1" max="10" step="1"/>
                    <span>Hours</span>
                    {errores.duration?<p className="form--error no-space">{errores.duration}</p>:""}
                </fieldset>
                <fieldset className='activityPage__formSection'> 
                    <label htmlFor='season'>*Season of main activity:</label>
                    <br/>
                    <select onChange={handleChange} name="season">
                        <option value="ignore" defaultValue={true}>Season:</option>
                        <option value="Primavera">Spring</option>
                        <option value="Verano">Summer</option>
                        <option value="Otoño">Fall</option>
                        <option value="Invierno">Winter</option>
                    </select>
                    {errores.season?<p className="form--error no-space">{errores.season}</p>:""}
                </fieldset>
                <fieldset className='activityPage__formSection'> 
                    <label htmlFor='countryId'>*Country/Countries where it take place:</label>
                    <br/>
                    <select onChange={handleCountryChange} name="countryId">
                        <option defaultValue={true}>---Country:---</option>
                        {countries.map(c=>{
                            return(
                                <option key={c.name} value={[c.id,c.name]}>{c.name}</option>
                            )
                        })}
                    </select>
                    <div className='activityPage__countryBox'>
                        {countryBox.length>0 ? countryBox.map(c =>
                            <div key={c.name} className='activityPage__countryList'>
                                <span>{c.name}</span>
                                <button type='button' onClick={handleClose} className='activityPage__closeButton' value={[c.name,c.id]}>X</button>
                            </div>
                        ): 
                            <div className='activityPage__countryList'> Add a country</div>
                        }
                    </div>
                </fieldset>
                <fieldset className='activityPage__formSection'>
                    <label htmlFor="imageURL">Add an image URL:</label>
                    <br/>
                    <input type="text" name="imageURL" onChange={handleChange} placeholder='Image URL' value={form.imageURL}/>
                    <button type="button" onClick={handleURLErase}>Delete</button>
                    {form.imageURL &&
                        <>
                            <br/>
                            <img src={`${form.imageURL}`} onError={handleImgError} width={200}/>
                            <br/>
                        </>
                    }
                    {errores.imageURL?<p className="form--error no-space">{errores.imageURL}</p>:""}
                </fieldset>
                <fieldset className='activityPage__formSection'>
                    <label htmlFor="description">Activity description:</label>
                    <br/>
                    <textarea name='description' onChange={handleChange} placeholder='Max 200 characters' className='activityPage__textArea'/>
                    {errores.description?<p className="form--error no-space">{errores.description}</p>:""}
                </fieldset>
                <div className='activityPage__formButtons'>
                    <button onClick={handleReset} type="reset" className='activityPage__button'>Clear form</button>
                    <button type='submit' className='activityPage__button submitButton'>Create</button>
                </div>
            </form>
        </aside>
        <main className='activityPage__main'>
            <h2>All activities:</h2>
            <section className='activityContainer'>
                {activities && activities.map(a=>{
                    let ratingActivity = "★".repeat(a.difficulty).split("")
                    return(
                        <div className='activityBox' key={a.id}>
                            <Link className="activityBox__editButton" to={`/countries/activities/${a.id}`}>Edit</Link>
                            <button type='button' onClick={handleDeleteActivity} className='activityBox__closeButton' value={a.id}>X</button>
                            <h3>Name: {a.name? a.name: "N/A"}</h3>
                            {a.imageURL && <img src={a.imageURL} width={150}/>}    
                            <p> Difficulty: 
                                {ratingActivity.map((r)=>
                                    <span key={Math.random()} className='on star_mini'>{r}</span>
                                    )}
                            </p>   
                            <p>Duration: {a.duration? a.duration : "N/A"} Hrs.</p>
                            <p>Season: {a.season? a.season : "N/A"}</p>
                            <p>Countries: {a.countryId? a.countryId.join(", ") : "N/A"}</p>
                            {a.description && <p>Description: {a.description.charAt(0).toUpperCase() + a.description.slice(1)}</p>}
                        </div>
                        
                    )
                })}
            </section>
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