import { useEffect, useState } from 'react'
import "./ActividadesPage.css"
import { connect } from "react-redux"
import { activityCreate, addActivities } from '../redux/actions';

const regexNombre = /[\w]{5,30}/i;
let countryList = []

const validar = (inputs) =>{

    let errores = {}

    if(!regexNombre.test(inputs.name)){
        errores.name = "El nombre debe ser de entre 5 y 30 caracteres"
    } else if(regexNombre.test(inputs.name)){delete errores.name}
    if(inputs.difficulty === 0){ errores.difficulty = "Debes elegir una dificultad"}
    else if(inputs.difficulty !== 0){delete errores.difficulty}
    if(inputs.duration%0.5 !== 0 || inputs.duration < 0.5 || inputs.duration > 10){
        errores.duration = "La duración debe ser de entre 0.5 y 10 horas y ser múltiplo de 0.5"
    } else if (inputs.duration%0.5 === 0 && inputs.duration > 0.5 && inputs.duration < 10){
        delete errores.duration
    }
    if(inputs.season === ""){
        errores.season = "Debes elegir una temporada"
    } else if( inputs.season !== ""){delete errores.season}
    if(inputs.countryId === []){
        errores.countryId = "Debes seleccionar al menos un país"
    } else if( inputs.countryId !== []){delete errores.countryId}
    
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
        }
    }

    useEffect(() => {
      props.addActivities()
    }, [form])
    
  return (
    <>
        <aside>
            <h1>Crea una actividad</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre de la actividad:</label>
                <input type='text' name="name" onChange={handleChange} placeholder='Escribe el nombre de la actividad'/>
                {errores.name?<p className="form--error">{errores.name}</p>:""}
                <label htmlFor='difficulty'>Dificultad:</label>
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
                {errores.difficulty?<p className="form--error">{errores.difficulty}</p>:""}
                <label htmlFor="duration">Duración aproximada de la actividad:</label>
                <input type='number' onChange={handleChange} name="duration" placeholder='2.5' min="0.5" max="10" step="0.5"/>
                <span>Horas</span>
                {errores.duration?<p className="form--error">{errores.duration}</p>:""}
                <label htmlFor='season'>Temporada del año:</label>
                <select onChange={handleChange} name="season">
                    <option value="ignore" defaultValue={true}>Temporada:</option>
                    <option value="Primavera">Primavera</option>
                    <option value="Verano">Verano</option>
                    <option value="Otoño">Otoño</option>
                    <option value="Invierno">Invierno</option>
                </select>
                {errores.season?<p className="form--error">{errores.season}</p>:""}
                <label htmlFor='countryId'>País(es) donde se realiza:</label>
                <select onChange={handleCountryChange} name="countryId">
                    <option defaultValue={true}>---País:---</option>
                    {countries.map(c=>{
                        return(
                            <option key={c.name} value={[c.id,c.name]}>{c.name}</option>
                        )
                    })}
                </select>
                {countryBox.length>0 && countryBox.map(c=>
                    <div key={c}>
                        <span>{c}</span>
                        <button type='button'>x</button>
                    </div>
                )}
                {errores.countryId?<p className="form--error">{errores.countryId}</p>:""}
                <button onClick={handleReset} type="reset">Vaciar formulario</button>
                <button type='submit'>Crear tarea</button>
            </form>
        </aside>
        <main>
            <h2>Tus actividades:</h2>
            {activities.length > 0 && activities.map(a=>{
                let ratingActivity = "★".repeat(a.difficulty).split("")
                return(
                    <div className='activityBox' key={a.id}>
                        <h3>{a.id} Nombre: {a.name? a.name: "N/A"}</h3>
                        {ratingActivity.map((r)=>
                            <span key={Math.random()} className='on star_mini'>{r}</span>
                        )}
                        <p>Duración: {a.duration? a.duration : "N/A"} Hrs.</p>
                        <p>Temporada: {a.season? a.season : "N/A"}</p>
                        <p>Países: {a.countryId? a.countryId.join(", ") : "N/A"}</p>
                    </div>
                )
            })}
        </main>
    </>
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
        addActivities: () => {dispatch(addActivities())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ActivityPage)