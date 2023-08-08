import React from 'react'

function Detail() {
  return (
    <>
        <aside>
            <h1>Crea una actividad</h1>
            <form>
                <label htmlFor="nombreActividad">Nombre de la actividad:</label>
                <input type='text' placeholder='Escribe el nombre de la actividad'/>
                <label htmlFor='dificultadActividad'>Dificultad:</label>
                {/* input estrellas */}
                <label htmlFor="duracionActividad">Duración aproximada de la actividad:</label>
                <input type='number' min={0.5} max={10} step={0.5}/>
                <label htmlFor='temporadaActividad'>Temporada del año:</label>
                <select>
                    <option value="Primavera">Primavera</option>
                    <option value="Verano">Verano</option>
                    <option value="Otoño">Otoño</option>
                    <option value="Invierno">Invierno</option>
                </select>
                <span>Horas</span>
            </form>
        </aside>
        <main>
        </main>
    </>
  )
}

export default Detail