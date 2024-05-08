import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminSidebar from '../Components/AdminSidebar';
import EditPofile from '../Pages/AdminEditProfilePage';
import InstructorRegistration from '../Pages/InstructorRegistration';
import AddLicensePkg from '../Pages/AddLicensePkg';
import StudentManagement from '../Pages/StudentManagement';
import AdminDashReviews from '../Components/AdminDashReviews';
import AdminDashboardComponent from '../Components/AdminDashboardComponent';

export default function AdminDashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className='md:w-56'>
        {/* Sidebar */}
        <AdminSidebar />
      </div>
      <div className="flex-1">
        {tab === 'dashboard' && <AdminDashboardComponent />}
        {tab === 'admin-edit-profile' && <EditPofile />}
        {tab === 'student-management' && <StudentManagement />}
        {tab === 'instructor-registration' && <InstructorRegistration />}
        {tab === 'add-licensepkg' && <AddLicensePkg />}
        {tab === 'reviews' && <AdminDashReviews />}
      </div>
    </div>
  );
}
