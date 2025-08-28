import { useTheme } from "next-themes";
import { Link } from "react-router-dom";

function NotFoundPage() {

  const { theme } = useTheme();

  return (
    <div className='container-fluid p-0'>
      <div
        className='row w-100 mx-auto min-vh-100 align-items-center justify-content-center'
        style={{
          background: "linear-gradient(90deg, var(--theme-primary) 0%, var(--theme-secondary) 100%)",
        }}
      >
        <div className='col-auto p-0'>
          <div
            className='rounded-2 d-flex flex-column align-items-center justify-content-center flex-nowrap'
            style={{
              backgroundColor: "rgb(35, 34, 61)",
              padding: "2rem 5rem",
              border: "2px solid rgba(255,255,255, .7)",
            }}
          >
            <div
              className='text-center'
              style={{
                fontSize: "5rem",
                color: "rgba(255,255,255, .7)",
              }}
            >
              Page Not Found
            </div>
            <div
              className='text-center'
              style={{
                fontSize: ".9rem",
                color: "rgba(255,255,255, .5)",
              }}
            >
              The page you are looking for doesn't exist or has been moved.
            </div>

            <Link
              className='btn text-center rounded-pill mt-4 px-3'
              to='/'
              style={{
                backgroundColor: theme === 'dark' ? "rgba(74, 76, 129, 1)" : "rgba(255,255,255)",
                color: theme === 'dark' ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
              }}
            >
              Go to HomePage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
