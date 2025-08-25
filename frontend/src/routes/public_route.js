import { useAuth } from "../store/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  const location = useLocation();

  if (user) {
    return <Navigate to='/' state={{ from: location }} relpace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
