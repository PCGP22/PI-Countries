import React, { useEffect } from 'react'
import { idSearch } from '../redux/actions'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import logo from "../../public/countries.png"

function Detail(props) {

  async function fetch(id){
    await props.idSearch(id)
  }
  
  const {idCountry} = useParams()
  
  useEffect(() => {
    fetch(idCountry)
  }, [])

  // const { name, offName, image, continent, capitalCity, subregion, Activities } = props.currentCountry
  
  return (
    <div>
        <main>
          {props.currentCountry &&
            <>
            <img src={props.currentCountry.image? props.currentCountry.image: logo} alt={`bandera de ${name}`}/>
            <h3>{props.currentCountry.name? props.currentCountry.name: "N/A"}</h3>
            <p>{props.currentCountry.offName? props.currentCountry.offName: "N/A"}</p>
            <p>Capital: {props.currentCountry.capitalCity? props.currentCountry.capitalCity: "N/A"}</p>
            <p>Continente: {props.currentCountry.continent? props.currentCountry.continent: "N/A"}</p>
            <p>Subregión: {props.currentCountry.subregion? props.currentCountry.subregion: "N/A"}</p>
          </>
          }
        </main>
        <aside>
            {(props.currentCountry && props.currentCountry.Activities) && props.currentCountry.Activities.map(a => {
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
    currentCountry: state.currentCountry,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    idSearch: (id)=>{dispatch(idSearch(id))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Detail)