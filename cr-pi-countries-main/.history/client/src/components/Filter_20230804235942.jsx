import React from 'react'
import { connect } from "react-redux"
import { filter, order } from '../redux/actions'


function Filter(props) {
    const handleOrder = (e) => {
        props.order(e.target.value)
    }
    const handleFilterContinents = (e) => {
        props.filter(["continents",e.target.value])
    }
  return (
    <div className='filters__container'>
        <label htmlFor='orden'>Orden:</label>
        <select onChange={handleOrder} name='orden'>
            <option defaultValue={true}>Orden:</option>
            <optgroup label='Alfabético'>
                <option value={["alphabet","A"]}>Ascendente</option>
                <option value="descendente">Descendente</option>
            </optgroup>
            <optgroup label='Población'>
                <option value="ascendente">Ascendente</option>
                <option value="descendente">Descendente</option>
            </optgroup>
        </select>
        <label htmlFor='filtroContinente'>Orden:</label>
        <select onChange={handleFilterContinents} name='filtroContinente'>
            <option defaultValue={true}>Continente:</option>
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