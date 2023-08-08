import Filter from './Filter.jsx'
import { connect } from "react-redux"


function HomePage(props) {
  const countries = props.allCountries
  return (
    <>
        <Filter/>
        <main>
            <h1>Países y sus banderas</h1>
            {
              countries.map(c=>{
                return(
                  <figure>
                    <image src={c.image}/>
                    <figcaption>{c.name}</figcaption>
                  </figure>
                )
              })
            }
            {/* map de los países */}
            {/* paginación */}
        </main>
    </>
  )
}

const mapStateToProps = () => {
  return {
    allCountries: state.allCountries,
  }
}

export default connect(mapStateToProps,null)(HomePage)