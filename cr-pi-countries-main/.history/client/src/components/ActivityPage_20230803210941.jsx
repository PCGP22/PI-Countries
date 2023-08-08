import { useState } from 'react'
import "./ActividadesPage.css"

function ActivityPage() {
    const ratings = [1,2,3,4,5]
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
  return (
    <>
        <aside>
            <h1>Crea una actividad</h1>
            <form>
                <label htmlFor="nombreActividad">Nombre de la actividad:</label>
                <input type='text' placeholder='Escribe el nombre de la actividad'/>
                <label htmlFor='dificultadActividad'>Dificultad:</label>
                <div className='filter__starContainer'>
                    {
                        ratings.map(i => {
                            return(
                                <button type="button" className={i <= (hover || rating)? "on star" : "off star"} key={i} index={i} 
                                onClick={() => setRating(i)}
                                onMouseEnter={() => setHover(i)}
                                onMouseLeave={() => setHover(rating)}>★</button>
                            )
                            
                        })
                    }
                </div>
                <label htmlFor="duracionActividad">Duración aproximada de la actividad:</label>
                <input  name="duracionActividad" placeholder='2.5' min={0.5} max={10} step={0.5}/>
                <span>Horas</span>
                <label htmlFor='temporadaActividad'>Temporada del año:</label>
                <select>
                    <option value="Primavera">Primavera</option>
                    <option value="Verano">Verano</option>
                    <option value="Otoño">Otoño</option>
                    <option value="Invierno">Invierno</option>
                </select>
                <label htmlFor='paisActividad'>País(es) donde se realiza:</label>
                {/* select de los países */}
                {/* Caja map países seleccionados */}
                <button>Vaciar formulario</button>
                <button type='submit'>Crear tarea</button>
            </form>
        </aside>
        <main>
            {/* map actividades */}
        </main>
    </>
  )
}

export default ActivityPage