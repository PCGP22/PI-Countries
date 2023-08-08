import { useEffect, useState } from 'react'
import Filter from './Filter.jsx'
import { connect } from "react-redux"

const sliceCountries = (page,maxPageData) => {
    return countries.slice((page-1)*maxPageData,page*maxPageData)
}

function HomePage(props) {
  const countries = props.allCountries
  const [currentPage, setCurrentPage] = useState(1)

  let data = setCurrentPage(sliceCountries(currentPage,10))
 
  
  
  //max 25 pags 250/10 = 25
  return (
    <>
        <Filter/>
        <main>
            <h1>Países y sus banderas</h1>
            {
              data.map(c=>{
                return(
                  <figure key={c.id}>
                    <img src={c.image}/>
                    <figcaption>{c.name}</figcaption>
                  </figure>
                )
              })
            }
            
            {/* paginación */}
        </main>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    allCountries: state.allCountries,
  }
}

export default connect(mapStateToProps,null)(HomePage)