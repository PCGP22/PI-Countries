import React from 'react'

function Filter() {
  return (
    <div className='filters__container'>
        <label htmlFor='orden'>Orden:</label>
        <select name='orden'>
            <option selected>Orden:</option>
            <optgroup label='Alfabético'>
                <option value="ascendente">Ascendente</option>
                <option value="descendente">Descendente</option>
            </optgroup>
            <optgroup label='Población'>
                <option value="ascendente">Ascendente</option>
                <option value="descendente">Descendente</option>
            </optgroup>
        </select>
        <label htmlFor='filtroContinente'>Orden:</label>
        <select name='filtroContinente'>
            <option selected>Continente:</option>
            <option value="Africa">África</option>
            <option value="North America">América del Norte</option>
            <option value="South America">América del Sur</option>
            <option value="Antarctica">Antártida</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europa</option>
            <option value="Oceania">Oceanía</option>
        </select>
        {/* filtro de actividades dinámico */}
    </div>
  )
}

export default Filter