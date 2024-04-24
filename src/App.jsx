import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import AdminDashboard from './Pages/AdminDashboard';
import InstructorRegistration from './Pages/InstructorRegistration';
import AddLicensePkg from './Pages/AddLicensePkg';
import AddReview from './Components/AddReview';
import AdminEditProfile from './Pages/AdminEditProfilePage';
import PrivateRoute from './Components/PrivateRoute';
import OnlyAdminPrivateRoute from './Components/OnlyAdminPrivateRoute';
import UpdateLicensePkg from './Pages/UpdatePackage';
import ScrollToTop from './Components/ScrollToTop';

import Chat from './Pages/Chat'

export default function App() {
  
  return (
    // <div className="dashboard">
    //   <Sidebar/>
    //   {/* <ContentP/> */}
    //   <Chat />
    // </div>

    <BrowserRouter>
        <ScrollToTop />
        <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp/>} />
            <Route element={<PrivateRoute />} >
              <Route path='/admin-dashboard' element={<AdminDashboard />} />
            </Route>
            <Route element={<OnlyAdminPrivateRoute />} >
              <Route path='/add-licensepkg' element={<AddLicensePkg />} />
              <Route path='/update-licensepkg/:packageId' element={<UpdateLicensePkg />} />
              <Route path='/instructor-registration' element={<InstructorRegistration />} />
              <Route path='/admin-edit-profile' element={<AdminEditProfile />} />
            </Route>
            <Route path='/add-review' element={<AddReview />} />
            
          </Routes>
    </BrowserRouter>
  )

}
