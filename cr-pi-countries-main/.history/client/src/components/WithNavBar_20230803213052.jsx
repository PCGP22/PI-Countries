import { Outlet   } from 'react-router-dom'
import NavBar from '../NavBar/NavBar.jsx'

function WithNavBar({logout, search}) {

  return (
    <>
      <NavBar logout={logout} search={search}/>
      <Outlet/>
    </>
  )
}

export default WithNavBar