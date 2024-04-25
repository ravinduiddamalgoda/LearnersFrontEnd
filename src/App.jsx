
import React from 'react';
// import { FaHeart } from 'react-icons/fa';
import { Route, Routes } from 'react-router-dom';

import Chat from './Pages/Chat'
import UserprofileInterface from './Components/UserprofileInterface'
import MakePayment from './Components/MakePayment'
import EditUserDetail from './Components/EditUserDetail'
import RegisterUser from './Components/RegisterUser'
import LoginUser from './Components/LoginUser'

function App() {
  
  return (

    <div>
     <Routes>
      <Route path="/profile" element={<UserprofileInterface/>}></Route>
      <Route path="/payment" element={<MakePayment/>}></Route>
      <Route path="/editUser" element={<EditUserDetail/>}></Route>
      <Route path="/register" element={<RegisterUser/>}></Route>
      <Route path="/login" element={<LoginUser/>}></Route>
     </Routes>
    </div>
    
  );

}

export default App;
