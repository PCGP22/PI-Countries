import { useEffect, useState } from 'react'
import Filter from './Filter.jsx'
import { connect } from "react-redux"


function HomePage(props) {
  const [currentPage, setCurrentPage] = useState()

  const countries = props.allCountries
  const sliceCountries = (page,maxPageData)=>{
      return countries.slice((page-1)*maxPageData,page*maxPageData)
  }
  useEffect(() => {
    setCurrentPage(sliceCountries(1,10))
  }, [])
  
  
  //max 25 pags 250/10 = 25
  return (
    <>
        <Filter/>
        <main>
            <h1>Países y sus banderas</h1>
            {
              page.map(c=>{
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