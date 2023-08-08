import React from 'react'
import { ImSearch } from "react-icons/im";

function SearchBar() {
  return (
    <div className='searchBar__container'>
        <input type='text' placeholder='Búsqueda'/>
        <span><ImSearch/></span>
    </div>
  )
}

export default SearchBar