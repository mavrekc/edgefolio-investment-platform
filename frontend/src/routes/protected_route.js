import { useAuth } from "../store/AuthContext";
import { useTheme } from "next-themes";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const { theme } = useTheme();

  if (loading) {
    return (
      <div className='container-fluid p-0'>
        <div
          className='row w-100 mx-auto flex-column justify-content-center align-items-center gap-sm-2 flex-nowrap'
          style={{
            minHeight: "100dvh",
            overflow: "hidden",
            padding: "8px",
            background: "linear-gradient(90deg, var(--theme-primary) 0%, var(--theme-secondary) 100%)"
          }}
        >
          <div
            dir="ltr"
            className='col-auto p-0 p-4 rounded-4 d-flex flex-column row-gap-3 align-items-center justify-content-center'
            style={{
              backgroundColor: theme === "dark" ? "rgba(0,0,0,.4)" : "rgba(255,255,255,.68)",
              boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
              color: theme === "dark" ? "rgba(255,255,255,.7)" : "rgba(0, 0, 0, 0.8)",
              minHeight: "200px",
              minWidth: "240px",
            }}
          >
            <div dir="ltr" className='loader'></div>
            <div dir="ltr" className='loader-text ps-2'></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    // return <Navigate to='/auth' state={{ from: location }} replace />
  }

  return <>{children}</>;
};

export default ProtectedRoute;
