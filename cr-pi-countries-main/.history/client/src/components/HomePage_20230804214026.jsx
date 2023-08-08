import Filter from './Filter.jsx'
import { connect } from "react-redux"


function HomePage(props) {
  return (
    <>
        <Filter/>
        <main>
            <h1>Países y sus banderas</h1>
            {
              props.allCountries.map(c=>{
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