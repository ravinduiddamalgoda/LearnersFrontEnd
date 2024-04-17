
import React from 'react';
// import { FaHeart } from 'react-icons/fa';
import Sidebar from './components/Sidebar';
import ProfileP from './components/ProfileP';
import ContentP from './components/ContentP';
import './App.css';


import Chat from './Pages/Chat'


function App() {
  
  return (

    <div className="dashboard">
      <Sidebar/>
     <>
      <Chat />
    </>
      {/* <ContentP/> */}
    </div>
    
  );

   
  )

}

export default App;
