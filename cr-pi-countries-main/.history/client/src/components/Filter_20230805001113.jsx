import React, { useState } from 'react'
import { connect } from "react-redux"
import { filter, order } from '../redux/actions'


function Filter(props) {
    const [reloadAux, setReloadAux] = useState(true)
    const handleOrder = (e) => {
        const [category,filter] = e.target.value.split(",")
        if(typeof filter === "string"){
            props.order([category,filter])
        }
    }
    const handleFilterContinents = (e) => {
        if(e.target.value !== "ignore"){
            props.filter(["continents",e.target.value])
        }
    }
  return (
    <div className='filters__container'>
        <label htmlFor='orden'>Orden:</label>
        <select onChange={handleOrder} name='orden'>
            <option defaultValue={true}>Orden:</option>
            <optgroup label='Alfabético'>
                <option value={["alphabet","A"]}>Ascendente</option>
                <option value={["alphabet","D"]}>Descendente</option>
            </optgroup>
            <optgroup label='Población'>
                <option value={["population","A"]}>Ascendente</option>
                <option value={["population","D"]}>Descendente</option>
            </optgroup>
        </select>
        <label htmlFor='filtroContinente'>Filtro:</label>
        <select onChange={handleFilterContinents} name='filtroContinente'>
            <option defaultValue={true} value="ignore">Continente:</option>
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
const mapDispatchToProps = (dispatch) => {
    return{
      filter: ()=>{dispatch(filter)},
      order: ()=>{dispatch(order)}
    }
  }
  
const mapStateToProps = (state) => {
    return{
        allActivities: state.allActivities
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Filter)