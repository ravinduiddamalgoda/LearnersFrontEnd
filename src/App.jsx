import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Home from './pages/VehicleManagement/Home';
import CreateVehicle from './pages/VehicleManagement/CreateVehicles';
import ShowVehicle from './pages/VehicleManagement/ShowVehicle';
import EditVehicle from './pages/VehicleManagement/EditVehicle';
import DeleteVehicle from './pages/VehicleManagement/DeleteVehicle';
import HomeRevenue from './pages/Revenue/Home';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/vehicles/details/:id' element={<ShowVehicle/>} />
      <Route path='/vehicles/create' element={<CreateVehicle/>} />
      <Route path='/vehicles/edit/:id' element={<EditVehicle/>} />
      <Route path='/vehicles/delete/:id' element={<DeleteVehicle/>} />
      <Route path='/revenue' element={<HomeRevenue/>} />
    </Routes>
  )
}

export default App