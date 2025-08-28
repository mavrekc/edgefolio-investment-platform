import { useEffect, useState } from "react";
import DonutChart from "../components/donutChart";
import { useTheme } from "next-themes";
import ArticleSlider from "../components/articleSlider";
import { addCommas, separateNumberParts } from "../utils/numbers";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { useTranslation } from "react-i18next";
import { getAllStocks } from "../services/stocks.service";
import useWindowSize from "../hooks/useWindowSize";

function importAll(r) {
  const map = {};
  r.keys().forEach((key) => {
    const symbol = key.replace("./", "").replace(".png", "");
    map[symbol] = r(key);
  });
  return map;
}

const stockLogos = importAll(require.context("../assets/company_logos", false, /\.png$/));

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [goals, setGoals] = useState([
    { goal_name: "test 1", target_amount: "12000" },
    { goal_name: "test 2", target_amount: "35000" },
    { goal_name: "test 3", target_amount: "6900" },
    { goal_name: "test 4", target_amount: "450000" },
    { goal_name: "test 5", target_amount: "76500" },
    { goal_name: "test 6", target_amount: "125000" },
  ]);

  const screenSize = useWindowSize();
  const { theme } = useTheme();
  const { user } = useAuth();
  const { setActiveMenuItem } = useOutletContext();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const setInitialData = async () => {
    try {
      const data = await getAllStocks({ page: 1, limit: 15 });

      setStocks(data.data.results);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    setInitialData();
  }, []);

  const navigateToGoals = () => {
    setActiveMenuItem("goals");
    navigate("/goals", { replace: true });
  };

  const donutOption = {
    title: {
      text: "Investor Stats",
      show: false,
      top: 0,
      padding: 0,
      left: "center",
    },
    tooltip: {
      trigger: "item",
      textStyle: {
        fontSize: 11,
        lineHeight: 11,
      },
    },
    color: ["#219ebc", "#ee9b00", theme === "light" ? "#a7c957" : "#8caa49", "#c9184a", "#9d4edd"],
    legend: {
      orient: "horizontal",
      left: screenSize >= 1200 ? "center" : "center",
      top: screenSize >= 1200 ? "bottom" : "bottom",
      // bottom: 0,
      padding: screenSize >= 576 ? 10 : 6,
      x: "center",
      textStyle: {
        align: "center",
        fontSize: screenSize >= 992 ? 11 : 10,
        color: theme === "light" ? "rgb(0,0,0)" : "#ffffff",
      },
      align: "auto",
      itemGap: screenSize >= 576 ? 8 : 6,
      itemWidth: screenSize >= 992 ? 22 : 18,
      itemHeight: screenSize >= 992 ? 13 : 12,
    },
    series: [
      {
        name: "Fund Info",
        type: "pie",
        radius: ["45%", "70%"],
        center: ["50%", "45%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderWidth: 4,
          // borderColor: theme === "light" ? "rgb(240, 245, 255)" : "rgb(100, 100, 100)",
          borderColor: "transparent",
        },
        label: {
          show: false,
          width: 140,
          backgroundColor: "transparent",
          overflow: "truncate",
          ellipsis: "...",
          // fontSize: 12
          // position: 'center'
        },
        emphasis: {
          label: {
            show: screenSize >= 1200 ? true : false,
            fontSize: "12",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Worldcall Telecom Limited" },
          { value: 735, name: "Fauji Foods Limited" },
          { value: 580, name: "TPL Properties Limited" },
          { value: 484, name: "Cnergyico PK Limited" },
          { value: 300, name: "Hum Network Limited" },
        ],
      },
    ],
  };

  return (
    <div
      className='row w-100 mx-auto justify-content-start p-1 py-2 px-2 px-sm-3 py-sm-3 row-gap-3 row-cols-md-2 align-items-stretch'
      style={{
        maxHeight: screenSize <= 575 ? "calc(100dvh - 127px)" : screenSize <= 991 && screenSize >= 576 ? "calc(100dvh - 176px)" : "calc(100dvh - 126px)",
        minHeight: screenSize <= 575 ? "calc(100dvh - 127px)" : screenSize <= 991 && screenSize >= 576 ? "calc(100dvh - 176px)" : "calc(100dvh - 126px)",
        overflowY: "auto",
        scrollbarWidth: "none",
        borderRadius: "20px",
        backgroundColor: "var(--theme-card-main-bg)",
        // borderBottomLeftRadius: "20px",
        // borderBottomRightRadius: "20px",
      }}
    >
      {user ? (
        <>
          <div className='col-12 col-md p-0 pe-md-2 animate-card' style={{}}>
            <div
              className='h-100 p-3 px-2 pb-2 px-sm-3 pb-sm-3 d-flex flex-column justify-content-start'
              style={{
                backgroundColor: "var(--theme-card-bg)",
                border: "1px solid",
                borderColor: "var(--theme-card-border)",
                borderRadius: "20px",
                minHeight: "400px",
                boxShadow: "var(--theme-card-box-color) 0px 2px 6px 2px",
              }}
            >
              <div
                className='text-center'
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "500",
                  color: theme === "light" ? "rgb(0,0,0)" : "rgb(255,255,255)",
                }}
              >
                {t("app.cards.invest")}
              </div>
              <hr
                className='m-0 mt-3'
                style={{
                  color: theme === "light" ? "rgb(0,0,0)" : "rgb(255,255,255)",
                }}
              />

              <div className='flex-grow-1 d-flex flex-column justify-content-center'>
                <DonutChart
                  options={donutOption}
                  style={{
                    minHeight: screenSize >= 576 ? "320px" : "350px",
                  }}
                  theme='light'
                />
              </div>
            </div>
          </div>
          <div className='col-12 col-md p-0 ps-md-2 animate-card' style={{}}>
            <div
              className='h-100 p-3 px-2 pb-2 px-sm-3 pb-sm-3 d-flex flex-column justify-content-start'
              style={{
                backgroundColor: "var(--theme-card-bg)",
                border: "1px solid",
                borderColor: "var(--theme-card-border)",
                borderRadius: "20px",
                minHeight: "400px",
                boxShadow: "var(--theme-card-box-color) 0px 2px 6px 2px",
              }}
            >
              <div
                className='text-center px-3'
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "500",
                  color: theme === "light" ? "rgb(0,0,0)" : "rgb(240,240,240)",
                }}
              >
                {t("app.cards.goals")}
              </div>
              <hr
                className='m-0 mt-3 mx-3'
                style={{
                  color: theme === "light" ? "rgb(0,0,0)" : "rgb(255,255,255)",
                }}
              />
              <div
                className={`flex-grow-1 d-flex flex-column justify-content-start column-gap-2 flex-nowrap px-1 add-custom-scroll-dashboard${theme === "dark" ? "-dark" : ""}`}
                style={{
                  height: "300px",
                  paddingTop: ".75rem",
                  rowGap: ".75rem",
                  overflowY: "auto",
                }}
              >
                {goals.map((item, index) => {
                  const progress = [24, 57, 46, 89, 33, 50, 67, 54, 20];

                  return (
                    <div
                      className='row w-100 mx-auto align-items-center p-3'
                      key={index}
                      style={{
                        lineHeight: "1",
                        backgroundColor: "var(--theme-card-item-bg)",
                        borderRadius: "10px",
                        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                        rowGap: screenSize > 450 ? ".8rem" : "1.2rem",
                        columnGap: screenSize <= 450 && ".5rem",
                        color: theme === "light" ? "rgb(0,0,0)" : "rgb(240,240,240)",
                      }}
                      onClick={navigateToGoals}
                    >
                      <div className='col p-0'>
                        <div
                          className=''
                          style={{
                            fontSize: screenSize > 450 ? "0.8rem" : "0.75rem",
                            color: theme === "light" ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.65)",
                          }}
                        >
                          {t("app.goal.title")}
                        </div>
                        <div
                          className='mt-1'
                          style={{
                            fontSize: screenSize > 450 ? "1.1rem" : "1rem",
                          }}
                        >
                          {item.goal_name}
                        </div>
                      </div>
                      <div className={`col p-0 ${screenSize > 450 ? "text-center" : "text-end"}`}>
                        <div
                          className=''
                          style={{
                            fontSize: screenSize > 450 ? "0.8rem" : "0.75rem",
                            color: theme === "light" ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.65)",
                          }}
                        >
                          {t("app.goal.amount")}
                        </div>
                        <div
                          className='mt-1'
                          style={{
                            fontSize: screenSize > 450 ? "1.2rem" : "1.1rem",
                          }}
                        >
                          <span className='me-1' style={{ fontSize: ".8rem", color: theme === "light" ? "var(--theme-light-primary)" : "rgb(229, 124, 236)" }}>
                            Rs
                          </span>
                          {addCommas(item.target_amount)}
                        </div>
                      </div>
                      {screenSize > 450 ? (
                        <div className='col p-0 text-end'>
                          <div
                            className=''
                            style={{
                              fontSize: "0.8rem",
                              color: theme === "light" ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.65)",
                            }}
                          >
                            {t("app.goal.progress")}
                          </div>
                          <div
                            className='mt-1'
                            style={{
                              fontSize: "1.1rem",
                            }}
                          >
                            {progress[index]}
                            <span className='ms-1' style={{ fontSize: ".8rem", color: theme === "light" ? "var(--theme-light-primary)" : "rgb(229, 124, 236)" }}>
                              %
                            </span>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className='col-12 p-0'>
                        <div
                          className='progress'
                          role='progressbar'
                          aria-label='Basic example'
                          aria-valuenow='75'
                          aria-valuemin='0'
                          aria-valuemax='100'
                          style={{
                            height: "0.3rem",
                            backgroundColor: theme === "light" ? "rgb(220, 223, 226)" : "rgb(121, 135, 149)",
                          }}
                        >
                          <div
                            className='progress-bar'
                            style={{
                              backgroundColor: theme === "light" ? "var(--theme-light-primary)" : "rgb(229, 124, 236)",
                              width: `${progress[index]}%`,
                              // width: '57%'
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {!goals.length ? <></> : ""}
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <div className='col-12 col-md p-0 pe-md-2 animate-card' style={{}}>
        <div
          className='h-100 p-3 px-2 pb-2 px-sm-3 pb-sm-3 d-flex flex-column justify-content-start'
          style={{
            backgroundColor: "var(--theme-card-bg)",
            border: "1px solid",
            borderColor: "var(--theme-card-border)",
            borderRadius: "20px",
            minHeight: "400px",
            boxShadow: "var(--theme-card-box-color) 0px 2px 6px 2px",
          }}
        >
          <div
            className='text-center px-3'
            style={{
              fontSize: "1.4rem",
              fontWeight: "500",
              color: theme === "light" ? "rgb(0,0,0)" : "rgb(240,240,240)",
            }}
          >
            {t("app.cards.stocks")}
          </div>
          <hr
            className='m-0 mt-3 mx-3'
            style={{
              color: theme === "light" ? "rgb(0,0,0)" : "rgb(255,255,255)",
            }}
          />

          <div
            className={`flex-grow-1 d-flex flex-column justify-content-start column-gap-2 flex-nowrap pb-1 px-1 px-sm-1 add-custom-scroll-dashboard${theme === "dark" ? "-dark" : ""}`}
            style={{
              height: "300px",
              paddingTop: ".75rem",
              rowGap: ".75rem",
              overflowY: "auto",
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
          >
            {stocks.length ? (
              stocks.map((item, index) => {
                const currentPrice = separateNumberParts(parseFloat(item.current));
                const highPrice = separateNumberParts(parseFloat(item.high));
                const ldcp = separateNumberParts(parseFloat(item.ldcp));

                return (
                  <div
                    className='row w-100 mx-auto align-items-center flex-nowrap'
                    key={index}
                    style={{
                      lineHeight: "1.1",
                      backgroundColor: "var(--theme-card-item-bg)",
                      borderRadius: "10px",
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                      color: theme === "light" ? "rgb(0,0,0)" : "rgb(245,245,245)",
                      rowGap: ".8rem",
                      padding: screenSize >= 576 ? "1rem" : "1rem .75rem",
                    }}
                  >
                    <div className='col-auto p-0'>
                      <div
                        className='d-flex align-items-center justify-content-center flex-nowrap'
                        style={{
                          color: "rgb(185, 185, 185)",
                          border: `1px solid ${theme === "dark" ? "rgb(64, 103, 160)" : "rgb(149, 190, 255)"}`,
                          background: `linear-gradient(to right bottom, ${theme === "dark" ? "rgb(62, 89, 136)" : "rgb(194 205 226)"}, ${theme === "dark" ? "rgb(27, 63, 107)" : "rgb(157, 173, 211)"})`,
                          borderRadius: "12px",
                          width: "52px",
                          height: "52px",
                        }}
                      >
                        <img
                          src={stockLogos[item.symbol] || stockLogos["0"]}
                          style={{
                            width: "36px",
                          }}
                        />
                      </div>
                    </div>
                    <div className='col col-sm-3 p-0 ms-3'>
                      <div
                        className='text-truncate'
                        style={{
                          fontSize: screenSize >= 576 ? "1.35rem" : "1.05rem",
                          lineHeight: "1.1",
                          fontWeight: "500",
                          overflow: "hidden",
                          color: theme === "dark" ? "var(--theme-light-secondary)" : "var(--theme-light-primary)",
                        }}
                      >
                        {item.symbol}
                      </div>
                      <div
                        className=''
                        style={{
                          fontSize: screenSize >= 576 ? ".82rem" : ".78rem",
                          fontWeight: "400",
                          lineHeight: "1.1",
                          color: theme === "dark" ? "rgba(255,255,255,.53)" : "var(--theme-light-secondary)",
                          marginTop: screenSize >= 576 ? "4px" : "3px",
                          display: "-webkit-box", // establish a WebKit flexbox container
                          WebkitBoxOrient: "vertical", // stack children vertically
                          WebkitLineClamp: 2, // limit to 2 lines
                          overflow: "hidden", // hide overflowing text
                          // width: `${width}px`,                // optional width control
                        }}
                      >
                        {item.name}
                      </div>
                    </div>
                    <div className='col col-sm p-0 text-start'>
                      <div
                        className=''
                        style={{
                          fontSize: screenSize >= 576 ? "0.8rem" : ".78rem",
                          color: theme === "light" ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.6)",
                        }}
                      >
                        {t("app.fund.price")}
                      </div>
                      <div
                        className='mt-1'
                        style={{
                          fontSize: screenSize >= 576 ? "1.2rem" : "1.05rem",
                        }}
                      >
                        <span
                          className='me-1'
                          style={{ fontSize: screenSize >= 576 ? ".8rem" : ".7rem", color: theme === "light" ? "var(--theme-light-primary)" : "rgb(229, 124, 236)" }}
                        >
                          Rs
                        </span>
                        {currentPrice.whole == "0" ? "0" : currentPrice.whole + "."}
                        <span style={{ fontSize: screenSize >= 576 ? "0.9rem" : ".72rem" }}>{currentPrice.whole == "0" ? "" : currentPrice.decimal}</span>
                      </div>
                    </div>
                    <div className='col col-sm p-0 text-start'>
                      <div
                        className=''
                        style={{
                          fontSize: screenSize >= 576 ? "0.8rem" : ".78rem",
                          color: theme === "light" ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.6)",
                        }}
                      >
                        LDCP
                      </div>
                      <div
                        className='mt-1'
                        style={{
                          fontSize: screenSize >= 576 ? "1.2rem" : "1.05rem",
                        }}
                      >
                        <span
                          className='me-1'
                          style={{ fontSize: screenSize >= 576 ? ".8rem" : ".7rem", color: theme === "light" ? "var(--theme-light-primary)" : "rgb(229, 124, 236)" }}
                        >
                          Rs
                        </span>
                        {ldcp.whole == "0" ? "0" : ldcp.whole + "."}
                        <span style={{ fontSize: screenSize >= 576 ? "0.9rem" : ".72rem" }}>{ldcp.whole == "0" ? "" : ldcp.decimal}</span>
                      </div>
                    </div>
                    <div className='col col-sm p-0 text-start'>
                      <div
                        className=''
                        style={{
                          fontSize: screenSize >= 576 ? "0.8rem" : ".78rem",
                          color: theme === "light" ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.6)",
                        }}
                      >
                        High
                      </div>
                      <div
                        className='mt-1'
                        style={{
                          fontSize: screenSize >= 576 ? "1.2rem" : "1.05rem",
                        }}
                      >
                        <span
                          className='me-1'
                          style={{ fontSize: screenSize >= 576 ? ".8rem" : ".7rem", color: theme === "light" ? "var(--theme-light-primary)" : "rgb(229, 124, 236)" }}
                        >
                          Rs
                        </span>
                        {highPrice.whole == "0" ? "0" : highPrice.whole + "."}
                        <span style={{ fontSize: screenSize >= 576 ? "0.9rem" : ".72rem" }}>{highPrice.whole == "0" ? "" : highPrice.decimal}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className='h-100'>
                <div
                  className='w-100 h-100 d-flex align-items-center justify-content-center pb-3'
                  style={{
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  <div
                    className='spinner-border'
                    style={{
                      fontSize: "0.8rem",
                      height: "40px",
                      width: "40px",
                    }}
                  >
                    <span className='visually-hidden'>Loading...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='col-12 col-md p-0 ps-md-2 animate-card' style={{}}>
        <div
          className='h-100 p-3 px-2 pb-2 px-sm-3 pb-sm-3'
          style={{
            backgroundColor: "var(--theme-card-bg)",
            border: "1px solid",
            borderColor: "var(--theme-card-border)",
            borderRadius: "20px",
            minHeight: "400px",
            boxShadow: "var(--theme-card-box-color) 0px 2px 6px 2px",
          }}
        >
          <div
            className='text-center'
            style={{
              fontSize: "1.4rem",
              fontWeight: "500",
              color: theme === "light" ? "rgb(0,0,0)" : "rgb(240,240,240)",
            }}
          >
            {t("app.cards.articles")}
          </div>
          <hr
            className='m-0 mt-3'
            style={{
              color: theme === "light" ? "rgb(0,0,0)" : "rgb(255,255,255)",
            }}
          />
          <div
            className=''
            style={{
              minHeight: "300px",
              height: "calc(100% - 50px)",
            }}
          >
            <ArticleSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
