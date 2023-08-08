import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <>     
        <main>
            <h1>Países</h1>
            <p>Aplicación donde puedes explorar el mundo y sus países a partir de sus banderas además de poder asignar las actividades turísticas de los mismos.</p>
            <link to="/countries">
                <button>Comenzar</button>
            </link>
        </main>
        <aside>
            <img src='../../public/countries.png'/>
        </aside>
    </>
  )
}

export default LandingPage