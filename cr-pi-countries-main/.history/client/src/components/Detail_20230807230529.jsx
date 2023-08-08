import React, { useEffect } from 'react'
import { idSearch } from '../redux/actions'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import logo from "../../public/countries.png"
import "../styles/Detail.modules.css"

function Detail(props) {

  async function fetch(id){
    await props.idSearch(id)
  }
  
  const {idCountry} = useParams()
  
  useEffect(() => {
    fetch(idCountry)
  }, [idCountry])

  const { name, offName, image, continent, capitalCity, subregion, Activities } = props.currentCountry
  
  return (
    <div className='detail__container'>
        <main className='detail__main'>
          <h1>Country info</h1>
          <section className='detail__info'>
            {props.currentCountry &&
              <>
                <h3>{name? name: "N/A"}</h3>
                <img src={image? image: logo} alt={`bandera de ${name}`} className='detail__img'/>
                <p><strong>Official name:</strong> {offName? offName: "N/A"}</p>
                <p><strong>Capital city:</strong> {capitalCity? capitalCity: "N/A"}</p>
                <p><strong>Continent:</strong> {continent? continent: "N/A"}</p>
                <p><strong>Subregion:</strong> {subregion? subregion: "N/A"}</p>
              </>
            }
          </section>
        </main>
        <aside className='detail__aside'>
          <h2>Activities of the country:</h2>
          <section className='activityContainer'>
            {Activities && Activities.map(a => {
              let ratingActivity = "★".repeat(a.difficulty).split("")
              return(
                <div className='activityBox' key={a.id}>
                  <p><strong>Name:</strong> {a.name}</p>
                  {ratingActivity.map((r)=>
                      <span key={Math.random()} className='on star_mini'>{r}</span>
                      )}
                  <p>Duration: {a.duration} Hrs.</p>
                  <p>Season: {a.season}</p>
                  <p>Countries: {a.countryId?a.countryId:"N/A"}</p>
                </div>
              )
            })}
          </section>
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