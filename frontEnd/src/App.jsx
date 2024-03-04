import {Route, Routes} from 'react-router-dom'
import Page404 from './pages/404/Page404'
import Page401 from './pages/404/Page401'
//test

//user
import Dashboard from './pages/User/Dashboard/Dashboard'
import LandingPage from './pages/LandingPage/LandingPage'
import Profile from './pages/User/UserProfile/Profile'
import ItemDetails from './pages/User/itemDetails/ItemDetails'
//admin & mod
import DashView from './pages/admin/Mod/Home/DashView'
import LostView from './pages/admin/Mod/LostItems/LostView'
import RequestsView from './pages/admin/Mod/Requests/RequestsView'
import HlpDocumentation from './pages/admin/Mod/HlpDocumentation/HlpDocumentation'
import AdminProfile from './pages/admin/Mod/Home/Widgets/AdminProfile'

import Privilege from './pages/admin/Privilege/Privilege'



const App = () => {
  //nababaliw ka na san mo lalagay yung accessToken kasi wala kayong rtk
  
  //kunin nyo to if may gusto kayo comment
  {/* */}
  
  return (
    <>

      {/* eto yung red pang debug to*/}
      
      

      <div>
        <Routes>
          {/*default view */}
          <Route exact path='/' element={<LandingPage/>}/>
          {/*pag gusto mo mag-add pa ng ibang path declare mo muna dito*/}

            <Route path='/Dashboard' element={<Dashboard/>}/>
            <Route path='/Profile' element={<Profile/>}/>
            <Route path='/Item/:itemId' element={<ItemDetails/>}/>
            
          {/*admin/mod side */}
            <Route path='/Admin/Dashboard' element={<DashView/>}/>
            <Route path='/Admin/LostItems' element={<LostView/>}/>
            <Route path='/Admin/Requests' element={<RequestsView/>}/>
            <Route path='/Admin/HlpDocs' element={<HlpDocumentation/>}/>
            <Route path='/Admin/AdminProfile' element={<AdminProfile/>}/>

            <Route path='/Admin/Privilege' element={<Privilege/>}/>

          {/* 404 page  catch all  palitan to in the future hopefully ng 404 page tlga */}
          <Route path='/401' element={<Page401/>}/>
          <Route path='*' element={<Page404/>}/>
        </Routes>
      </div>
   </>
  )
}

export default App