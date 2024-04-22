import './App.css'

import Chat from './Pages/Chat'

function App() {
  
  return (
    <div className="dashboard">
      <Sidebar/>
      {/* <ContentP/> */}
      <Chat />
    </div>
  )

}

export default App