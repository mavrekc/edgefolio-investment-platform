import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import { ICONS } from "./homeIcons";
import { useTranslation } from "react-i18next";


export default function MenuItem({ active, current, setActive }) {
	const { theme } = useTheme();

  const Icon = ICONS[current];

  const { t } = useTranslation();

  return (
    <Link
      className='col-auto p-0'
      onClick={() => setActive(current)}
      to={current}
      style={{
        textDecoration: "none",
      }}
    >
      <div className='d-flex flex-column align-items-center justify-content-start'>
        {active === current ? (
          <>
            <div
              className='position-relative d-flex align-items-center justify-content-center'
              style={{
                width: "36px",
                height: "36px",
              }}
            >
              <div
                className='w-100 h-100 d-flex align-items-center justify-content-center'
                style={{
                  backgroundColor: theme === "dark" ? "rgb(136 77 59)" : "rgb(40, 168, 57)",
                  borderRadius: "50%",
                  margin: "0 auto",
                  paddingBottom: "1px",
                }}
              >
                <Icon width={30} height={30} stroke={1} color='white' />
              </div>
            </div>
            <div
              className=''
              style={{
                fontSize: "0.75rem",
                fontWeight: "400",
                color: "rgba(255,255,255,0.96)",
                textAlign: "center",
                lineHeight: "1.15",
                letterSpacing: "0.05em",
                marginTop: "6px",
              }}
            >
              {t(`app.menu.${current}`)}
            </div>
          </>
        ) : (
          <>
            <Icon width={36} height={36} stroke={1} color='white' />
            <div
              className=''
              style={{
                fontSize: "0.75rem",
                fontWeight: "400",
                color: "rgba(255,255,255,0.96)",
                textAlign: "center",
                lineHeight: "1.15",
                letterSpacing: "0.05em",
                marginTop: "6px",
              }}
            >
              {t(`app.menu.${current}`)}
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
