import { useState } from 'react'
import "./ActividadesPage.css"
import { connect } from "react-redux"


function ActivityPage(props) {
    const [rating, setRating] = useState(0);
    const initialState = {
        name: "",
        difficulty: 0,
        duration: 0,
        season: "",
        countryId: [],
    }
    const [countryList, setCountryList] = useState([])
    const [countryBox, setCountryBox] = useState([])
    const [form, setForm] = useState(initialState)

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

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
       
    }
    const handleReset = () => {
        console.log(form)
        setForm(initialState)
        setCountryList([])
        setCountryBox([])
    }

    const handleCountryBox = (e) => {
        let key = e.target.value.split(",")[0]
        let name = e.target.value.split(",")[1]

        setCountryList([...countryList, key])
        setCountryBox([...countryBox, name])
        setForm({...form, countryId: countryList})
    }
  return (
    <>
        <aside>
            <h1>Crea una actividad</h1>
            <form>
                <label htmlFor="name">Nombre de la actividad:</label>
                <input type='text' name="name" onChange={handleChange} placeholder='Escribe el nombre de la actividad'/>
                <label htmlFor='dificultadActividad'>Dificultad:</label>
                <div className='filter__starContainer'>
                    {
                        ratings.map(i => {
                            return(
                                <button type="button" name="difficulty" className={i <= (hover || rating)? "on star" : "off star"} key={i} index={i} 
                                onClick={(e) => {setRating(i); setForm({...form, difficulty: i})}}
                                onMouseEnter={() => setHover(i)}
                                onMouseLeave={() => setHover(rating)}>★</button>
                            )
                            
                        })
                    }
                </div>
                <label htmlFor="duration">Duración aproximada de la actividad:</label>
                <input type='number' onChange={handleChange} name="duration" placeholder='2.5' min="0.5" max="10" step="0.5"/>
                <span>Horas</span>
                <label htmlFor='season'>Temporada del año:</label>
                <select onChange={handleChange} name="season">
                    <option value="Primavera">Primavera</option>
                    <option value="Verano">Verano</option>
                    <option value="Otoño">Otoño</option>
                    <option value="Invierno">Invierno</option>
                </select>
                <label htmlFor='countryId'>País(es) donde se realiza:</label>
                <select onChange={handleCountryBox} name="countryId">
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
                        <button>x</button>
                    </div>
                )}
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
                        <h3>Nombre: {a.name}</h3>
                        {ratingActivity.map((r)=>
                            <span key={Math.random()} className='on star_mini'>{r}</span>
                        )}
                        <p>Duración: {a.duration} Hrs.</p>
                        <p>Temporada: {a.season}</p>
                        <p>Países: {a.countries?a.countries:"N/A"}</p>
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

export default connect(mapStateToProps,null)(ActivityPage)