import { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { updateActivity, idActivitySearch, removeActivity} from '../redux/actions';
import "../styles/ActivityPage.modules.css"
import { useNavigate, useParams } from 'react-router-dom';



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


function ActivityDetail(props) {

    const {idActivity} = useParams()
   
    
    let initialState = {
        name: props.currentActivity.name,
        difficulty: props.currentActivity.difficulty,
        duration: props.currentActivity.duration,
        season: props.currentActivity.season,
        countryId: props.currentActivity.countryId,
        imageURL: props.currentActivity.imageURL ? props.currentActivity.imageURL : "",
        description: props.currentActivity.description? props.currentActivity.description: "",
    }
    let countryList = initialState.countryId
    
    const navigate = useNavigate()
    const [countryBox, setCountryBox] = useState([])
    const [form, setForm] = useState(initialState)
    const [errores, setErrores] = useState({})
    
    const ratings = [1,2,3,4,5]
    const [rating, setRating] = useState(initialState.difficulty);
    const [hover, setHover] = useState(initialState.difficulty);
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
    const fetch = async () => {
        const data = await props.idActivitySearch(idActivity)
        console.log(data)
        if(data=== undefined){
            fetch()
        }
        console.log(props.currentActivity)
        parseCountryList()
    }
    useEffect(() => {
        fetch()
        setTimeout(handleReset(),500)
        // handleReset()
        handleReset()
    }, [idActivity])

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
        console.log("reset")
        setForm(initialState)
        parseCountryList()
        setCountryBox(countryList)
        setRating(initialState.difficulty)
        setHover(initialState.difficulty)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let erroresLength = Object.keys(errores).length;
        if(!erroresLength){
            props.updateActivity(idActivity,form)
            handleReset()
            e.target.reset()
            navigate("/countries/activities")
        } else {
            let errorLog = []
            for(let error in errores){
                errorLog.push(errores[error])
            }
            alert(errorLog.join("\n"))
        }
    }

    const handleClose = (e) => {
        console.log(e.target.value)
        let [name, id] = e.target.value.toString().split(",")
        setCountryBox(countryBox.filter(c=> c.name !== name))
        countryList = countryList.filter(c => c !== id)
        setErrores(validar({...form, countryId: countryList}))
    }

    const handleImgError = () => {
        setForm({...form, imageURL: "error"})
        setErrores(validar({...form, imageURL: "error"}))
    }
 

    const parseCountryList = () => {
        if(form.countryId && form.countryId[0].length == 3){
            countryList = []
            form.countryId.map(c=> {
                let key = c
                let countryToAdd = props.allCountries.filter(c=> c.id === key)[0]
                countryList.push({id: key, name: countryToAdd.name})
            })
        }
    }
    
    
  return (
    <div className='activityPage__container'>
        <aside className='activityPage__aside'>
            <h1>Edit activity</h1>
            <form onSubmit={handleSubmit} className='activityPage__form'>
                <fieldset className='activityPage__formSection'> 
                <p>* Indicates a required field</p>
                    <label htmlFor="name">*Name of the activity:</label>
                    <br/>
                    <input type='text' name="name" onChange={handleChange} placeholder='Name of the activity' value={form.name}/>
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
                    <input type='number' onChange={handleChange} name="duration" placeholder='0' className='activityPage__numInput' value={form.duration} min="1" max="10" step="1"/>
                    <span>Hours</span>
                    {errores.duration?<p className="form--error no-space">{errores.duration}</p>:""}
                </fieldset>
                <fieldset className='activityPage__formSection'> 
                    <label htmlFor='season'>*Season:</label>
                    <br/>
                    <select onChange={handleChange} name="season" value={form.season}>
                        <option value="ignore" >Season:</option>
                        <option value="Primavera" >Spring</option>
                        <option value="Verano" >Summer</option>
                        <option value="Otoño" >Fall</option>
                        <option value="Invierno" >Winter</option>
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
                        {(countryBox && countryBox.length>0) ? countryBox.map(c =>
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
                    <input type="text" name="imageURL" onChange={handleChange} value={form.imageURL} placeholder='Image URL'/>
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
                    <textarea name='description' onChange={handleChange} placeholder='Max 200 characters' value={form.description} className='activityPage__textArea'/>
                    {errores.description?<p className="form--error no-space">{errores.description}</p>:""}
                </fieldset>
                <div className='activityPage__formButtons'>
                    <button onClick={handleReset} type="reset" className='activityPage__button'>Reset</button>
                    <button type='submit' className='activityPage__button submitButton'>Submit changes</button>
                </div>
            </form>
        </aside>
    </div>
  )
}


const mapStateToProps =(state) => {
    return{
        allActivities: state.allActivities,
        allCountries: state.allCountries,
        currentActivity: state.currentActivity
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateActivity: (idActivity,activity) => {dispatch(updateActivity(idActivity,activity))},
        idActivitySearch: (idActivity) => {dispatch(idActivitySearch(idActivity))},
        removeActivity: (id) => {dispatch(removeActivity(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ActivityDetail)