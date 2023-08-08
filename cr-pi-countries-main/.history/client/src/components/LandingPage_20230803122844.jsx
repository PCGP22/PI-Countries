import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <>     
        <main className='landingPage__main'>
            <h1 className='landingPage__title'>Países</h1>
            <p className='landingPage__text'>Aplicación donde puedes explorar el mundo y sus países a partir de sus banderas además de poder asignar las actividades turísticas de los mismos.</p>
            <Link to="/countries">
                <p className='landingPage__button'>Comenzar</p>
            </Link>
        </main>
        <aside className='landingPage__aside'>
            <img className='landingPage__image' src='../../public/countries.png'/>
        </aside>
    </>
  )
}

export default LandingPage