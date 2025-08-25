import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./protected_route";
import HomeLayout from "../layout/home_layout";
import Dashboard from "../pages/dashboard";
import PublicRoute from "./public_route";
import Login from "../pages/login";
import NotFoundPage from "../pages/404";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomeLayout  />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to='dashboard' replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      }
	]
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "*",
    element: (<NotFoundPage />)
  }
]);

export default router;