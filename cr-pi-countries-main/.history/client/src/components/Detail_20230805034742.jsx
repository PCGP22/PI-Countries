import React, { useEffect } from 'react'
import { idSearch } from '../redux/actions'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import logo from "../../public/countries.png"

function Detail(props) {

  const idCountry = useParams()

  useEffect(() => {
    props.dispatch(idCountry)
  }, [])

  const { name, offName, image, continent, capitalCity, subregion } = props.currentCountry
  
  return (
    <div>Detail
        <main>
            <img src={image? image: logo} alt={`bandera de ${name}`}/>
            <h3>{name? name: "N/A"}</h3>
            <p>{offName? offName: "N/A"}</p>
            <p>Capital: {capitalCity? capitalCity: "N/A"}</p>
            <p>Continente: {continent? continent: "N/A"}</p>
            <p>Subregión: {subregion? subregion: "N/A"}</p>
            {/* bandera y datos */}
        </main>
        <aside>
            {/* map actividades del país */}
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