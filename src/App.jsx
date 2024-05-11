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
import Reviews from './Components/Review';
import AdminEditProfile from './Pages/AdminEditProfilePage';
import PrivateRoute from './Components/PrivateRoute';
import OnlyAdminPrivateRoute from './Components/OnlyAdminPrivateRoute';
import UpdateLicensePkg from './Pages/UpdatePackage';
import ScrollToTop from './Components/ScrollToTop';

import Chat from './Pages/Chat'
import PhysicalTrainingHome from './Pages/PhysicalTrainingHome';
import ChatSection from './Components/ChatSection';
import QuizMain from './Pages/QuizMain';
import ViewQuiz from './Components/ViewQuiz';
// import Home from './pages/VehicleManagement/Home';
import CreateVehicle from './Pages/VehicleManagement/CreateVehicles';
import ShowVehicle from './Pages/VehicleManagement/ShowVehicle';
import EditVehicle from './Pages/VehicleManagement/EditVehicle';
import DeleteVehicle from './Pages/VehicleManagement/DeleteVehicle';
import HomeRevenue from './Pages/Revenue/RevenuePage';
import RevenuePage from './Pages/Revenue/RevenuePage';
import VehicleHome from './Pages/VehicleManagement/VehicleHome';
import UpdateQuiz from './Components/UpdateQuiz';
import AddQuizPackages from './Pages/AddQuizPackages';
import UpdatePTS from './Pages/UpdatePTS';
import StudentEnrollments from './Pages/StudentEnrollments';
import ViewStudentEnrollment from './Pages/ViewStudentEnrollments';
import UserLogin from './Pages/UserLogin';
import UserRegister from './Pages/UserRegister';
import UserprofileInterface from './Components/UserprofileInterface';
import EditUserDetail from './Components/EditUserDetail';
import SelectQuizPackage from './Pages/SelectQuizPackage';
import QuizPlay from './Pages/QuizPlay';
import Payment from './Pages/Payment';
import ViewQuizMarks from './Pages/ViewQuizMarks';

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
            <Route path='/user/sign-in' element={<UserLogin />} />
            <Route path='/user/sign-up' element={<UserRegister />} />
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
            <Route path='/reviews' element={<Reviews />} />
            <Route path= '/trainingSesssion' element ={<PhysicalTrainingHome/>}/>  
            <Route path="/updateTraining" element={<UpdatePTS/>}/>
            <Route path='/ptsEnroll' element={<StudentEnrollments />} />
            <Route path ='/viewptsStudent' element = {<ViewStudentEnrollment/>}/>
            <Route path= '/chat' element ={<ChatSection />}/>  
            
            <Route path='/quizmain' element={<QuizMain/>}/>
            {/* <Route path='/viewQuizes' element={<ViewQuiz/>}/> */}
            <Route path='/updateQuiz/:quizId' element={<UpdateQuiz/>}/>
            <Route path='/addQuizPackage' element={<AddQuizPackages/>}/>
            <Route path='/selectQuizPackage' element={<SelectQuizPackage/>}/>
            <Route path='/playQuiz/:quizPackageID' element={<QuizPlay/>}/>
            <Route path='/viewQuizMarks' element={<ViewQuizMarks/>}/>

            <Route path='/vehicles/home' element = {<VehicleHome/>} />
            <Route path='/vehicles/details/:id' element={<ShowVehicle/>} />
            <Route path='/vehicles/create' element={<CreateVehicle/>} />
            <Route path='/vehicles/edit/:id' element={<EditVehicle/>} />
            <Route path='/vehicles/delete/:id' element={<DeleteVehicle/>} />
            <Route path='/revenue' element={<HomeRevenue/>} />
            <Route path='/user/payment' element={<Payment/>}/>
            <Route path='/user/interface' element={<UserprofileInterface/>}/>
            <Route path='/user/edit' element={<EditUserDetail/>}/>
          </Routes>

    </BrowserRouter>

  )

}
