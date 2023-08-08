import { useEffect, useState } from 'react'
import "./ActividadesPage.css"
import { connect } from "react-redux"
import { activityCreate, addActivities, addCountries } from '../redux/actions';
import "../styles/ActivityPage.modules.css"

const regexNombre = /[\w]{5,}/i;
let countryList = []

const validar = (inputs) =>{

    let errores = {}

    if(!regexNombre.test(inputs.name) || inputs.name.length>30){
        errores.name = "Name must be 5 to 30 characters long"
    } else if(regexNombre.test(inputs.name) && inputs.name.length<30){delete errores.name}
    if(inputs.difficulty === 0){ errores.difficulty = "Please select difficulty"}
    else if(inputs.difficulty !== 0){delete errores.difficulty}
    if(inputs.duration%0.5 !== 0 || inputs.duration < 0.5 || inputs.duration > 10){
        errores.duration = "Duration must be between 0.5 and 10 hours and must be divisible by 0.5"
    } else if (inputs.duration%0.5 === 0 && inputs.duration > 0.5 && inputs.duration < 10){
        delete errores.duration
    }
    if(inputs.season === ""){
        errores.season = "Please select season"
    } else if( inputs.season !== ""){delete errores.season}
    if(inputs.countryId.join("") === "" ){
        errores.countryId = "Please select at least one country"
    } else if( inputs.countryId.length !== 0){delete errores.countryId}
    
    return errores
}

function ActivityPage(props) {
    const [rating, setRating] = useState(0);
    const initialState = {
        name: "",
        difficulty: 0,
        duration: 0,
        season: "",
        countryId: [],
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
        setErrores(validar({...form, countryId: countryList}))
        console.log(form.countryId)
      }, [countryBox])

    const handleChange = (e) => {
        if(e.target.value !== "ignore"){
            setForm({...form, [e.target.name]: e.target.value})
            setErrores(validar({...form, [e.target.name]: e.target.value}))
        }

    }
    const handleCountryChange = (e) => {
        let [id, name] = e.target.value.split(",")
        setCountryBox([...countryBox, name])
        countryList.push(id)
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
        setCountryBox(countryBox.filter(c=> c!== e.target.value))
    }

    useEffect(() => {
        props.addActivities()
        props.addCountries()
    }, [form])
    
  return (
    <div className='activityPage__container'>
        <aside className='activityPage__aside'>
            <h1>Create activity</h1>
            <form onSubmit={handleSubmit} className='activityPage__form'>
                <fieldset className='activityPage__formSection'> 
                    <label htmlFor="name">Name of the new activity:</label>
                    <br/>
                    <input type='text' name="name" onChange={handleChange} placeholder='Name of the activity/>
                    {errores.name?<p className="form--error no-space">{errores.name}</p>:""}
                </fieldset>
                <fieldset className='activityPage__formSection'> 
                    <label htmlFor='difficulty'>Difficulty:</label>
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
                    <label htmlFor="duration">Approximate duration:</label>
                    <br/>
                    <input type='number' onChange={handleChange} name="duration" placeholder='2.5 = 2 and a half hours' min="0.5" max="10" step="0.5"/>
                    <span>Hours</span>
                    {errores.duration?<p className="form--error no-space">{errores.duration}</p>:""}
                </fieldset>
                <fieldset className='activityPage__formSection'> 
                    <label htmlFor='season'>Season of main activity:</label>
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
                    <label htmlFor='countryId'>Country/Countries where it take place:</label>
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
                        {countryBox.length>0 ? countryBox.map(c=>
                            <div key={c} className='activityPage__countryList'>
                                <span>{c}</span>
                                <button type='button' onClick={handleClose} className='activityPage__closeButton' value={c}>x</button>
                            </div>
                        ): 
                            <div className='activityPage__countryList'> Add a country</div>
                        }
                    </div>
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
                {activities.length > 0 && activities.map(a=>{
                    let ratingActivity = "★".repeat(a.difficulty).split("")
                    return(
                        <div className='activityBox' key={a.id}>
                            <h3>Name: {a.name? a.name: "N/A"}</h3>
                            {ratingActivity.map((r)=>
                                <span key={Math.random()} className='on star_mini'>{r}</span>
                                )}
                            <p>Duration: {a.duration? a.duration : "N/A"} Hrs.</p>
                            <p>Season: {a.season? a.season : "N/A"}</p>
                            <p>Countries: {a.countryId? a.countryId.join(", ") : "N/A"}</p>
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
        addCountries: ()=>{dispatch(addCountries())},

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ActivityPage)