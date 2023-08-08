import React, { useEffect } from 'react'
import { idSearch } from '../redux/actions'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import logo from "../../public/countries.png"

function Detail(props) {

  const {idPais} = useParams()

  useEffect(() => {
    console.log(idPais)
    props.idSearch(idPais)
  }, [])

  const { name, offName, image, continent, capitalCity, subregion, Activities } = props.currentCountry
  
  return (
    <div>
        <main>
            <img src={image? image: logo} alt={`bandera de ${name}`}/>
            <h3>{name? name: "N/A"}</h3>
            <p>{offName? offName: "N/A"}</p>
            <p>Capital: {capitalCity? capitalCity: "N/A"}</p>
            <p>Continente: {continent? continent: "N/A"}</p>
            <p>Subregión: {subregion? subregion: "N/A"}</p>
        </main>
        <aside>
            {Activities && Activities.map(a => {
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
            }

            )}
        </aside>
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    currentCountry: state.currentCountry
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    idSearch: ()=>{dispatch(idSearch)}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Detail)