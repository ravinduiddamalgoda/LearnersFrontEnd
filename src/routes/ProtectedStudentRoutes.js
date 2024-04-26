import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedStudentRoutes = ({ children }) => {
  const { isLoading, isStudent, user } = useSelector((state) => auth.auth);

  if (isLoading === false) {
    if (!user) {
      return <Navigate to="/login" replace />;
    } else if(!isStudent){
      return <Navigate to="/" replace />;
    } else if(isStudent){
      return children;
    }
    
  }
};

export default ProtectedStudentRoutes;
