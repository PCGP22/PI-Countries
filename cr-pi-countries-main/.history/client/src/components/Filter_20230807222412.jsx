import React, { useState } from 'react'
import { connect } from "react-redux"
import { filter, order } from '../redux/actions'
import "../styles/Filter.modules.css"

function Filter(props) {
    const activities = props.allActivities
    const handleOrder = (e) => {
        const [category,filter] = e.target.value.split(",")
        if(typeof filter === "string"){
            props.aux()
            props.order([category,filter])
        }
    }
    const handleFilterContinents = (e) => {
        if(e.target.value !== "ignore"){
            props.aux()
            props.filter(["continents",e.target.value])
        }
    }

    const handleFilterActivities = (e) => {
        if(e.target.value !== "ignore"){
            props.aux()
            props.filter(["activities",e.target.value])
        }
    }
  return (
    <section className='filters__container purple white-text'>
        <div className="filters__group">
            <label htmlFor='orden' className='label'>Orden:</label>
            <select onChange={handleOrder} name='orden'>
                <option defaultValue={true}>Orden:</option>
                <optgroup label='Alfabético'>
                    <option value={["alphabet","A"]}>{"A - Z"}</option>
                    <option value={["alphabet","D"]}>{"Z - A"}</option>
                </optgroup>
                <optgroup label='Población'>
                    <option value={["population","D"]}>Mayor a Menor</option>
                    <option value={["population","A"]}>Menor a Mayor</option>
                </optgroup>
            </select>
        </div>
        <div className="filters__group">
            <label htmlFor='filterContinent' className='label'>Filtro:</label>
            <select onChange={handleFilterContinents} name='filterContinent'>
                <option defaultValue={true} value="ignore">Continente:</option>
                <option value={"all"}>All</option>
                <option value="Africa">Africa</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
        </div>
        <div className="filters__group">
            <label htmlFor='filterActivity' className='label'>Filtro:</label>
            <select onChange={handleFilterActivities} name='filterActivity'>
                <option defaultValue={true} value= "ignore">Actividad:</option>
                <option value={"all"}>All</option>
                {activities && activities.map(a => {
                    return(
                        <option key={a.id} value={a.name}>
                            {a.name}
                        </option>
                    ) 
                })}
            </select>
        </div>
    </section>
  )
}
const mapDispatchToProps = (dispatch) => {
    return{
      filter: (filterCategory)=>{dispatch(filter(filterCategory))},
      order: (orderCategorry)=>{dispatch(order(orderCategorry))}
    }
  }
  
const mapStateToProps = (state) => {
    return{
        allActivities: state.allActivities
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Filter)