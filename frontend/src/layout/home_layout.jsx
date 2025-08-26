import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Select, { components } from "react-select";
import { DonutIcon, HomeIcon, LearnIcon, MoonIcon, PlusCircle, SunIcon } from "../components/icons";

import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { customToast } from "../components/toasts";
import { SUPPORTED_LANGUAGES } from "../config/languages";
import { useI18n } from "../hooks/useI18n";
import { useAuth } from "../store/AuthContext";
import { slugify } from "../utils/strings";

import Logo from './../assets/favicon-96.png';

import MenuItem from "../components/menuItem";
import useWindowSize from "../hooks/useWindowSize";
import { getAllStocks } from "../services/stocks.service";
import "./../App.css";

function CustomOption(props) {
  const { data, innerProps } = props;

  const { theme } = useTheme();

  let content;
  switch (data.search_type) {
    case "stocks":
      content = (
        <div className='d-flex align-items-center'>
          <div>
            <div
              className=''
              style={{
                color: theme === "dark" ? "var(--theme-light-secondary)" : "rgb(48, 116, 199)",
                fontWeight: "500",
                fontSize: "1.15rem",
                lineHeight: "1.1",
                letterSpacing: ".02em",
              }}
            >
              {data.fund_name}
            </div>
            <div
              style={{
                color: theme === "dark" ? "rgb(150, 150, 150)" : "rgb(100, 100, 100)",
                fontWeight: "400",
                fontSize: ".94rem",
                lineHeight: "1.1",
                letterSpacing: ".02em",
              }}
            >
              {data.symbol_code}
            </div>
          </div>
        </div>
      );
      break;
    case "glossary":
      content = (
        <div>
          <strong
            style={{
              color: theme === "dark" ? "var(--theme-light-secondary)" : "rgb(48, 116, 199)",
              fontWeight: "500",
              fontSize: "1.15rem",
              lineHeight: "1.1",
              letterSpacing: ".02em",
            }}
          >
            {data.title}
          </strong>
          <div
            style={{
              color: theme === "dark" ? "rgb(150, 150, 150)" : "rgb(100, 100, 100)",
              fontWeight: "400",
              fontSize: ".94rem",
              lineHeight: "1.1",
              letterSpacing: ".02em",
            }}
          >
            {"Glossary"}
          </div>
        </div>
      );
      break;
    case "faq":
      content = (
        <div>
          <div
            style={{
              display: "-webkit-box",
              boxOrient: "vertical",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: "2",
              overflow: "hidden",
              color: theme === "dark" ? "var(--theme-light-secondary)" : "rgb(48, 116, 199)",
              fontWeight: "500",
              fontSize: "1.15rem",
              lineHeight: "1.1",
              letterSpacing: ".02em",
            }}
          >
            {data.question}
          </div>
          <div
            style={{
              color: theme === "dark" ? "rgb(150, 150, 150)" : "rgb(100, 100, 100)",
              fontWeight: "400",
              fontSize: ".94rem",
              lineHeight: "1.1",
              letterSpacing: ".02em",
            }}
          >
            {"FAQ"}
          </div>
        </div>
      );
      break;
    default:
      content = <span>{"default case"}</span>;
  }
  return (
    <components.Option
      {...props}
      innerProps={innerProps}
      style={
        {
          // backgroundColor: isFocused ? 'rgba(0,123,255,0.1)' : 'transparent',
          // padding: '8px 12px',
        }
      }
    >
      {content}
    </components.Option>
  );
}

const HomeLayout = () => {
  const { pathname } = useLocation();

  const [searchFocus, setSearchFocus] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(() => getMenuItemFromPath(pathname));
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);

  const screenSize = useWindowSize();

  const { currentLanguageConfig, changeLanguage } = useI18n();
  const { t } = useTranslation();

  const searchInputRef = useRef(null);

  const { theme, setTheme } = useTheme();

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  function getMenuItemFromPath(path) {
    const firstIndex = path.indexOf("/");
    const secondIndex = path.indexOf("/", firstIndex + 1);

    if (path === "/") return "dashboard";
    if (firstIndex === -1) return "dashboard";
    if (secondIndex === -1) return path.substring(firstIndex + 1);
    return path.substring(firstIndex + 1, secondIndex);
  }

  const handleLogout = async () => {
    logout();

    toast((t) => customToast("Logout Successfull", "success", t), {
      duration: 3000,
      removeDelay: 1000,
      style: {
        padding: "0.75rem",
        margin: "0",
        minWidth: "240px",
        backgroundColor: "rgb(255,255,255)",
      },
    });
  };

  const updateSearchData = async () => {
    try {
      const tasks = [
        { fn: getAllStocks, meta: { search_type: "stocks", redirection: "/invest" } },
        // { fn: getGlossary, meta: { search_type: "glossary", redirection: "/learn/glossary" } },
        // { fn: getFAQs, meta: { search_type: "faq", redirection: "/learn/faqs" } },
      ];

      const settled = await Promise.allSettled(tasks.map((task) => (task.meta.search_type === "stock" ? task.fn() : task.fn())));

      const merged = settled.flatMap((outcome, i) => {
        const { meta } = tasks[i];

        if (outcome.status !== "fulfilled") {
          console.error(`Task ${i} rejected outright:`, outcome.reason);
          return [];
        }

        const result = outcome.value;

        if (result.error) {
          console.warn(`API error on ${meta.route}:`, result.message);
          return [];
        }

        return result.data.map((item) => ({
          value: meta.search_type === "stock" ? item.symbol : meta.search_type === "glossary" ? item.title : item.question,
          label: meta.search_type === "fund" ? item.fund_name : item._id,
          ...item,
          ...meta,
        }));
      });

      setSearchData(merged);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    updateSearchData();
  }, []);

  return (
    <div className='container-fluid p-0'>
      <div
        className='row w-100 mx-auto flex-column gap-sm-2 flex-nowrap'
        style={{
          minHeight: "100dvh",
          overflow: "hidden",
          padding: "8px",
          background: "linear-gradient(90deg, var(--theme-primary) 0%, var(--theme-secondary) 100%)",
        }}
      >
        {/* HEADER */}
        <div
          className='col-12 flex-grow-0 flex-shrink-0'
          style={{
            paddingTop: "4px",
            paddingBottom: "6px",
            paddingInline: screenSize >= 576 ? "10px" : "7px",
          }}
        >
          <div
            className='row w-100 mx-auto align-items-center gap-sm-4 gap-lg-0 flex-nowrap'
          >
            <div className='col-auto col-lg p-0'>
              <div className="d-inline-flex align-items-center justify-content-start flex-nowrap">
                <img className="" src={Logo} style={{
                  width: '35px',
                  maxWidth: '100%',
                  marginRight: '.75rem'
                }}/>
                <div className="" style={{
                  fontSize: '1.5rem',
                  color: 'rgb(229, 221, 223)',
                  fontWeight: '500'
                }}>
                  EdgeFolio
                </div>
              </div>
            </div>

            {/* MENU BAR -- DESKTOP */}
            <div className='d-none d-lg-block col-auto p-0'>
              <div
                className='row w-100 mx-auto justify-content-between justify-content-sm-center flex-nowrap'
                style={{
                  paddingBottom: "4px",
                  paddingTop: "4px",
                  paddingInline: screenSize >= 1200 ? "3rem" : screenSize <= 575 ? ".5rem" : "1.5rem",
                  gap: screenSize <= 575 ? "" : "2.5rem",
                }}
              >
                {["dashboard", "invest", "portfolio", "learn"].map((item, idx) => (
                  <MenuItem
                    key={idx}
                    current={item}
                    active={activeMenuItem}
                    setActive={setActiveMenuItem}
                  />
                ))}
              </div>
            </div>

            <div className='col col-lg p-0'>
              <div
                className='d-flex align-items-center justify-content-end'
                style={{
                  gap: screenSize <= 575 ? "8px" : "12px",
                }}
              >
                {/* SEARCH - DESKTOP */}
                <div
                  className='d-none d-sm-block position-relative w-100'
                  style={{
                    maxWidth: "calc(100% - 115px)",
                  }}
                >
                  <div
                    className='d-sm-flex input-group search-input-desktop position-relative'
                    style={{
                      borderRadius: "99px",
                    }}
                  >
                    <Select
                      ref={searchInputRef}
                      className='basic-single flex-fill'
                      classNamePrefix='search-input'
                      name='search-input'
                      defaultValue={null}
                      value={null}
                      inputValue={searchInput}
                      getOptionValue={(opt) => opt.value}
                      getOptionLabel={(opt) => opt.label}
                      onInputChange={(value, { action }) => {
                        if (action === "input-change") setSearchInput(value);
                      }}
                      components={{
                        Option: CustomOption,
                        DropdownIndicator: false,
                        IndicatorSeparator: false,
                      }}
                      // getOptionLabel={option }
                      isDisabled={false}
                      isLoading={false}
                      isClearable={false}
                      isRtl={false}
                      menuIsOpen={searchInput.length > 0 && searchFocus}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          setSearchFocus(false);
                          searchInputRef.current?.blur();
                        }
                      }}
                      onChange={(option, actionMeta) => {
                        if (actionMeta.action === "select-option" && option?.redirection) {
                          console.log(option);
                          // const searchQuery = `${option.redirection}?search=${}&query=term`
                          if (option.search_type === "stock") {
                            navigate(`${option.redirection}?search=${option.value}&query=term`);
                          } else if (option.search_type === "glossary") {
                            navigate(`${option.redirection}?search=${slugify(option.value)}&query=term`);
                          } else {
                            navigate(option.redirection);
                          }
                          setSearchInput("");
                          setActiveMenuItem(option.search_type === "stock" ? "invest" : "learn");
                          // setSearchFocus(false);
                        }
                      }}
                      isSearchable={true}
                      options={searchData.length ? searchData : []}
                      onFocus={() => setSearchFocus(true)}
                      onBlur={() => setSearchFocus(false)}
                      openMenuOnClick={false}
                      openMenuOnFocus={false}
                      placeholder={t("app.menu.search")}
                      styles={{
                        container: (base) => ({
                          ...base,
                          width: "100%",
                          maxWidth: "100%",
                        }),
                        valueContainer: (base) => ({
                          ...base,
                          padding: "0",
                          flex: 1,
                          minWidth: 0,
                        }),
                        multiValue: (provided) => ({
                          ...provided,
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          width: "100%",
                          maxWidth: "100%",
                        }),
                        menu: (provided) => ({
                          ...provided,
                          zIndex: "200",
                          fontSize: screenSize >= 576 ? "1rem" : ".95rem",
                          background:
                            theme === "light"
                              ? "linear-gradient(135deg,rgb(230, 230, 240) 0%, rgb(223, 223, 235) 33%, rgb(218, 218, 232) 66%, rgb(215, 215, 227) 100%)"
                              : "linear-gradient(135deg,rgb(44, 44, 48) 0%, rgb(48, 48, 53) 33%, rgb(52, 52, 57) 66%, rgb(55, 55, 60) 100%)",
                        }),
                        control: (provided, state) => ({
                          ...provided,
                          flex: 1,
                          minWidth: 0,
                          width: "100%",
                          padding: "0 38px 0 12px",
                          minHeight: screenSize >= 576 ? "38px" : "38px",
                          fontSize: screenSize >= 576 ? "1rem" : ".95rem",
                          backgroundColor: state.isFocused ? (theme === "dark" ? "rgb(51, 51, 55)" : "rgba(255,255,255,.8)") : "none",
                          borderRadius: "99px",
                          border: `1px solid ${state.isFocused ? "rgb(57, 136, 233)" : "rgba(255,255,255,.3)"}`,
                          boxShadow: state.isFocused ? (theme === "dark" ? "0 0 2px 2px rgba(255,255,255,.15)" : "0 0 2px 2px rgba(50, 50, 50, 0.15)") : "",
                          fontFamily: "inherit",
                          "&:hover": {
                            borderColor: state.isFocused ? "" : theme === "dark" ? "rgba(255, 255, 255, .8)" : "rgb(174, 172, 175)",
                          },
                        }),
                        input: (provided) => ({
                          ...provided,
                          flex: 1,
                          minWidth: 0,
                          color: searchFocus ? (theme === "dark" ? "rgb(203, 110, 209)" : "") : "rgba(240, 240, 240, .95)",
                        }),
                        placeholder: (provided, state) => ({
                          ...provided,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          color:
                            theme === "light"
                              ? state.isFocused
                                ? "rgba(0, 0, 0, 0.4)"
                                : "rgba(240, 240, 240, .65)"
                              : state.isFocused
                                ? "rgba(240, 240, 240, .5)"
                                : "rgba(240, 240, 240, .65)",
                        }),
                        menuList: (provided) => ({
                          ...provided,
                          borderRadius: 4,
                          padding: 0,
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          padding: "12px",
                          color: state.isSelected ? (theme === "dark" ? "rgb(250,250,250)" : "rgb(240,240,240)") : theme === "dark" ? "rgba(240, 240, 240, .95)" : "rgb(33,37,41)",
                          backgroundColor: state.isFocused ? (theme === "dark" ? "rgb(68, 68, 74)" : "rgb(205, 202, 220)") : "none",
                          fontWeight: "400",
                          "&:hover": {
                            cursor: "pointer",
                            backgroundColor: state.isSelected ? "" : theme === "dark" ? "rgb(68, 68, 74)" : "rgb(205, 202, 220)",
                            color: state.isSelected ? "" : theme === "dark" ? "rgb(33,37,41)" : "",
                          },
                        }),
                      }}
                    />
                    <button
                      className='btn ps-0 pt-0 pe-0 m-0 d-flex align-items-center justify-content-center position-absolute top-50 translate-middle-y'
                      type='button'
                      id='button-addon2'
                      style={{
                        border: "none",
                        borderTopRightRadius: "99px",
                        borderBottomRightRadius: "99px",
                        right: "2px",
                        width: "38px",
                        height: "38px",
                        color: searchFocus ? (theme === "dark" ? "var(--theme-light-secondary)" : "var(--theme-light-primary)") : "rgb(255,255,255)",
                        paddingBottom: "1px",
                        transition: "none",
                      }}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={20}
                        height={20}
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='icon icon-tabler icons-tabler-outline icon-tabler-search'
                      >
                        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                        <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
                        <path d='M21 21l-6 -6' />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* SEARCH - MOBILE */}
                <div id='search-mobile-wrapper' className='d-sm-none'>
                  <form action='' autoComplete='on'>
                    <input
                      id='search'
                      name='search'
                      type='text'
                      placeholder='Search Company ...'
                      autoComplete='off'
                      onFocus={() => setSearchFocus(true)}
                      onBlur={() => setSearchFocus(false)}
                      style={{
                        background: searchFocus ? (theme === "dark" ? "var(--theme-dark-two)" : "rgba(240,240,240)") : "none",
                        color: theme === "dark" ? "rgb(238,238,238)" : "rgb(88, 88, 88)",
                      }}
                    />

                    <div className='search_submit' type='submit'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={searchFocus ? 32 : 36}
                        height={searchFocus ? 32 : 36}
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={searchFocus ? 1.5 : 1.25}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='icon icon-tabler icons-tabler-outline icon-tabler-search'
                        style={{
                          transition: "all 0.2s ease-in-out",
                        }}
                      >
                        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                        <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
                        <path d='M21 21l-6 -6' />
                      </svg>
                    </div>
                  </form>
                </div>

                {/* LANGUAGE - DROPDOWN */}
                <div className='dropdown'>
                  <button className='btn dropdown-toggle p-0 m-0 border-0' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                    <div
                      className='d-flex align-items-center justify-content-center'
                      style={{
                        width: "36px",
                        height: "36px",
                        border: "1px solid rgba(255,255,255,.8)",
                        borderRadius: "999px",
                        backgroundColor: "rgba(255,255,255,.075)",
                      }}
                    >
                      {currentLanguageConfig.flag(21, 21)}
                    </div>
                  </button>
                  <ul
                    className='dropdown-menu lang-menu'
                    id='notification_menu'
                    aria-labelledby='notification_menu'
                    style={{
                      backgroundColor: theme === "dark" ? "var(--theme-dark-two)" : "var(--theme-light-two)",
                      ["--bs-dropdown-padding-y"]: "4px",
                      ["--bs-dropdown-padding-x"]: "5px",
                      ["--bs-dropdown-min-width"]: "12rem",
                      ["--bs-dropdown-font-size"]: ".94rem",
                      ["--bs-dropdown-link-color"]: theme === "dark" ? "rgb(240,240,240)" : "rgb(33, 37, 41)",
                      ["--bs-dropdown-link-hover-bg"]: theme === "dark" ? "rgb(90, 90, 90)" : "rgb(200,200,200)",
                      ["--bs-dropdown-link-hover-color"]: theme === "dark" ? "rgb(240,240,240)" : "rgb(33, 37, 41)",
                      ["--bs-dropdown-link-active-bg"]: theme === "dark" ? "rgb(90, 90, 90)" : "rgb(200,200,200)",
                      ["--bs-dropdown-link-active-color"]: theme === "dark" ? "rgb(240,240,240)" : "rgb(33, 37, 41)",
                    }}
                  >
                    {SUPPORTED_LANGUAGES.map((item) => {
                      return (
                        <li key={item.code} className=''>
                          <a
                            className='dropdown-item d-flex align-items-center justify-content-start flex-nowrap'
                            style={{
                              backgroundColor: currentLanguageConfig.code === item.code ? (theme === "dark" ? "rgb(90, 90, 90)" : "rgb(200,200,200)") : "",
                              gap: "9px",
                            }}
                            onClick={() => {
                              changeLanguage(item.code);
                            }}
                          >
                            {item.flag(18, 18)}
                            {item.nativeName}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* USER MENU - DROPDOWN */}
                <div className='dropdown'>
                  <button className='btn dropdown-toggle p-0 m-0 border-0' type='button' data-bs-toggle='dropdown' data-bs-target='#user_menu' aria-expanded='false'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width={44}
                      height={44}
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth={0.6}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='icon icon-tabler icons-tabler-outline icon-tabler-user-circle'
                      style={{
                        color: "white",
                        marginLeft: "-4px",
                      }}
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0' />
                      <path d='M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' />
                      <path d='M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855' />
                    </svg>
                  </button>
                  <ul
                    className='dropdown-menu user-menu'
                    id='user_menu'
                    style={{
                      backgroundColor: theme === "dark" ? "var(--theme-dark-two)" : "var(--theme-light-two)",
                      ["--bs-dropdown-link-color"]: theme === "dark" ? "rgb(240,240,240)" : "rgb(33, 37, 41)",
                      ["--bs-dropdown-link-hover-bg"]: theme === "dark" ? "rgb(90, 90, 90)" : "rgb(200,200,200)",
                      ["--bs-dropdown-link-hover-color"]: theme === "dark" ? "rgb(240,240,240)" : "rgb(33, 37, 41)",
                      ["--bs-dropdown-link-active-bg"]: theme === "dark" ? "rgb(90, 90, 90)" : "rgb(200,200,200)",
                      ["--bs-dropdown-link-active-color"]: theme === "dark" ? "rgb(240,240,240)" : "rgb(33, 37, 41)",
                    }}
                  >
                    {user ? (
                      <>
                        <li>
                          <a
                            className='dropdown-item dropdown-item-extend'
                            href='#'
                            style={{
                              color: `rgb(${theme === "dark" ? "230, 230, 230" : "75, 75, 75"})`,
                            }}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 24 24'
                              width={18}
                              height={18}
                              fill='none'
                              stroke='currentColor'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='icon icon-tabler icons-tabler-outline icon-tabler-user'
                              style={{
                                color: theme === "dark" ? "var(--theme-light-secondary)" : "var(--theme-light-primary)",
                              }}
                            >
                              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                              <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' />
                              <path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' />
                            </svg>
                            Profile
                          </a>
                        </li>
                        <li>
                          <a
                            className='dropdown-item dropdown-item-extend'
                            href='#'
                            style={{
                              color: `rgb(${theme === "dark" ? "230, 230, 230" : "75, 75, 75"})`,
                            }}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width={18}
                              height={18}
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='icon icon-tabler icons-tabler-outline icon-tabler-bell'
                              style={{
                                color: theme === "dark" ? "var(--theme-light-secondary)" : "var(--theme-light-primary)",
                              }}
                            >
                              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                              <path d='M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6' />
                              <path d='M9 17v1a3 3 0 0 0 6 0v-1' />
                            </svg>
                            Notifications
                          </a>
                        </li>
                        <li>
                          <Link
                            className='dropdown-item dropdown-item-extend'
                            to='/change-password'
                            style={{
                              color: `rgb(${theme === "dark" ? "230, 230, 230" : "75, 75, 75"})`,
                            }}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width={18}
                              height={18}
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='icon icon-tabler icons-tabler-outline icon-tabler-tool'
                              style={{
                                color: theme === "dark" ? "var(--theme-light-secondary)" : "var(--theme-light-primary)",
                              }}
                            >
                              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                              <path d='M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5' />
                            </svg>
                            Change Password
                          </Link>
                        </li>
                        <li className='mt-1'>
                          <a
                            className='dropdown-item dropdown-item-extend'
                            href='#'
                            style={{
                              color: `rgb(${theme === "dark" ? "230, 230, 230" : "75, 75, 75"})`,
                            }}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width={18}
                              height={18}
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='icon icon-tabler icons-tabler-outline icon-tabler-settings'
                              style={{
                                color: theme === "dark" ? "var(--theme-light-secondary)" : "var(--theme-light-primary)",
                              }}
                            >
                              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                              <path d='M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z' />
                              <path d='M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0' />
                            </svg>
                            Settings
                          </a>
                        </li>
                        <li className='mt-1'>
                          <button
                            className='dropdown-item dropdown-item-extend'
                            onClick={handleLogout}
                            style={{
                              color: `rgb(${theme === "dark" ? "230, 230, 230" : "75, 75, 75"})`,
                            }}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width={18}
                              height={18}
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='icon icon-tabler icons-tabler-outline icon-tabler-door-enter'
                              style={{
                                color: theme === "dark" ? "var(--theme-light-secondary)" : "var(--theme-light-primary)",
                              }}
                            >
                              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                              <path d='M13 12v.01' />
                              <path d='M3 21h18' />
                              <path d='M5 21v-16a2 2 0 0 1 2 -2h6m4 10.5v7.5' />
                              <path d='M21 7h-7m3 -3l-3 3l3 3' />
                            </svg>
                            Logout
                          </button>
                        </li>
                        <li>
                          <hr
                            className='dropdown-divider'
                            style={{
                              borderColor: `rgba(var(${theme === "dark" ? "--theme-dark-tertiary" : "--theme-light-tertiary"}), 0.175)`,
                            }}
                          />
                        </li>
                        <li>
                          <div className='d-flex align-items-center justify-content-center gap-1 flex-nowrap'>
                            <a
                              className='dropdown-item dropdown-item-btn'
                              onClick={() => setTheme(theme == "light" ? "dark" : "light")}
                              style={{ backgroundColor: theme === "light" ? "rgb(217, 217, 217)" : "rgb(229, 229, 229)" }}
                            >
                              {theme == "light" ? <MoonIcon width={22} height={22} /> : <SunIcon width={22} height={22} />}
                            </a>
                            {/* <a className="dropdown-item dropdown-item-btn" onClick={() => setTheme('dark')}>
															<svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-moon"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" /></svg>
														</a>
														<a className="dropdown-item dropdown-item-btn" href="#">
															<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-device-laptop"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 19l18 0" /><path d="M5 6m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" /></svg>
														</a> */}
                          </div>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className='mt-1'>
                          <Link className='dropdown-item dropdown-item-extend' to='/login'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width={18}
                              height={18}
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth={1.5}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='icon icon-tabler icons-tabler-outline icon-tabler-user ms-1'
                              style={{
                                color: theme === "dark" ? "var(--theme-light-secondary)" : "var(--theme-light-primary)",
                              }}
                            >
                              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                              <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' />
                              <path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' />
                            </svg>
                            Login/Signup
                          </Link>
                        </li>
                        <li>
                          <hr
                            className='dropdown-divider'
                            style={{
                              borderColor: `rgba(var(${theme === "dark" ? "--theme-dark-tertiary" : "--theme-light-tertiary"}), 0.175)`,
                            }}
                          />
                        </li>
                        <li>
                          <div className='d-flex align-items-center justify-content-center gap-1 flex-nowrap'>
                            <a
                              className='dropdown-item dropdown-item-btn'
                              onClick={() => setTheme(theme == "light" ? "dark" : "light")}
                              style={
                                {
                                  // backgroundColor: theme === "light" ? "rgb(217, 217, 217)" : "rgb(229, 229, 229)"
                                }
                              }
                            >
                              {theme == "light" ? <MoonIcon width={22} height={22} /> : <SunIcon width={22} height={22} />}
                            </a>
                          </div>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div
          className='position-relative col-12 p-0 flex-grow-1 order-1 order-sm-2'
          style={{
            borderRadius: "20px",
          }}
        >
          <Outlet context={{ setActiveMenuItem }} />
        </div>

        {/* NAVIGATION MENU - TAB */}
        <div className='col-12 p-0 flex-grow-0 flex-shrink-0 order-2 order-sm-1 d-lg-none'>
          <div
            className='row w-100 mx-auto justify-content-between justify-content-sm-center px-2 px-md-4'
            style={{
              paddingBottom: screenSize <= 575 ? "0" : "4px",
              paddingTop: "6px",
              maxWidth: screenSize <= 575 ? "280px" : "",
              gap: screenSize <= 575 ? "" : "2.25rem",
            }}
          >
            <Link
              className='col-auto p-0'
              onClick={() => setActiveMenuItem("dashboard")}
              to='dashboard'
              style={{
                textDecoration: "none",
              }}
            >
              <div className='d-flex flex-column align-items-center justify-content-start'>
                {activeMenuItem === "dashboard" ? (
                  <div
                    className='position-relative'
                    style={{
                      width: screenSize >= 576 ? "36px" : "32px",
                      height: screenSize >= 576 ? "36px" : "32px",
                    }}
                  >
                    <div
                      className='position-absolute'
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgb(136 77 59)' : 'rgb(40, 168, 57)',
                        zIndex: 100,
                        borderRadius: "50%",
                        top: "0",
                        margin: "0 auto",
                        transform: screenSize >= 576 ? "translate(-13%, -26%)" : "translate(-21%, -46%)",
                        padding: activeMenuItem === "dashboard" ? "7px" : "5px",
                      }}
                    >
                      <HomeIcon width={screenSize >= 576 ? 38 : 42} height={screenSize >= 576 ? 38 : 42} color='white' />
                    </div>
                  </div>
                ) : (
                  <HomeIcon width={screenSize >= 576 ? 36 : 32} height={screenSize >= 576 ? 36 : 32} color='white' />
                )}
                <div
                  className=''
                  style={{
                    fontSize: screenSize >= 576 ? "0.75rem" : ".7rem",
                    fontWeight: "400",
                    color: "rgba(255,255,255,0.96)",
                    textAlign: "center",
                    lineHeight: "1.15",
                    letterSpacing: "0.05em",
                    marginTop: "6px",
                  }}
                >
                  {t("app.menu.home")}
                </div>
              </div>
            </Link>
            <Link
              className='col-auto p-0'
              onClick={() => setActiveMenuItem("invest")}
              to='invest'
              style={{
                textDecoration: "none",
              }}
            >
              <div className='d-flex flex-column align-items-center justify-content-start'>
                {activeMenuItem === "invest" ? (
                  <div
                    className='position-relative'
                    style={{
                      width: screenSize >= 576 ? "36px" : "32px",
                      height: screenSize >= 576 ? "36px" : "32px",
                    }}
                  >
                    <div
                      className='position-absolute'
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgb(136 77 59)' : 'rgb(40, 168, 57)',
                        borderRadius: "50%",
                        zIndex: 100,
                        top: "0",
                        margin: "0 auto",
                        transform: screenSize >= 576 ? "translate(-13%, -26%)" : "translate(-21%, -46%)",
                        padding: activeMenuItem === "invest" ? "7px" : "5px",
                      }}
                    >
                      <PlusCircle width={screenSize >= 576 ? 38 : 42} height={screenSize >= 576 ? 38 : 42} color='white' />
                    </div>
                  </div>
                ) : (
                  <PlusCircle width={screenSize >= 576 ? 36 : 32} height={screenSize >= 576 ? 36 : 32} color='white' />
                )}
                <div
                  className=''
                  style={{
                    fontSize: screenSize >= 576 ? "0.75rem" : ".7rem",
                    fontWeight: "400",
                    color: "rgba(255,255,255,0.96)",
                    textAlign: "center",
                    lineHeight: "1.15",
                    letterSpacing: "0.05em",
                    marginTop: "6px",
                  }}
                >
                  {t("app.menu.invest")}
                </div>
              </div>
            </Link>
            <Link
              className='col-auto p-0'
              onClick={() => setActiveMenuItem("portfolio")}
              to='portfolio'
              style={{
                textDecoration: "none",
              }}
            >
              <div className='d-flex flex-column align-items-center justify-content-start'>
                {activeMenuItem === "portfolio" ? (
                  <div
                    className='position-relative'
                    style={{
                      width: screenSize >= 576 ? "36px" : "32px",
                      height: screenSize >= 576 ? "36px" : "32px",
                    }}
                  >
                    <div
                      className='position-absolute'
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgb(136 77 59)' : 'rgb(40, 168, 57)',
                        borderRadius: "50%",
                        zIndex: 100,
                        top: "0",
                        margin: "0 auto",
                        transform: screenSize >= 576 ? "translate(-13%, -26%)" : "translate(-21%, -46%)",
                        padding: activeMenuItem === "portfolio" ? "7px" : "5px",
                      }}
                    >
                      <DonutIcon width={screenSize >= 576 ? 38 : 42} height={screenSize >= 576 ? 38 : 42} color='white' />
                    </div>
                  </div>
                ) : (
                  <DonutIcon width={screenSize >= 576 ? 36 : 32} height={screenSize >= 576 ? 36 : 32} color='white' />
                )}
                <div
                  className=''
                  style={{
                    fontSize: screenSize >= 576 ? "0.75rem" : ".7rem",
                    fontWeight: "400",
                    color: "rgba(255,255,255,0.96)",
                    textAlign: "center",
                    lineHeight: "1.15",
                    letterSpacing: "0.05em",
                    marginTop: "6px",
                  }}
                >
                  {t("app.menu.portfolio")}
                </div>
              </div>
            </Link>
            <Link
              className='col-auto p-0'
              onClick={() => setActiveMenuItem("learn")}
              to='learn'
              style={{
                textDecoration: "none",
              }}
            >
              <div className='d-flex flex-column align-items-center justify-content-start'>
                {activeMenuItem === "learn" ? (
                  <div
                    className='position-relative'
                    style={{
                      width: screenSize >= 576 ? "36px" : "32px",
                      height: screenSize >= 576 ? "36px" : "32px",
                    }}
                  >
                    <div
                      className='position-absolute'
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgb(136 77 59)' : 'rgb(40, 168, 57)',
                        borderRadius: "50%",
                        zIndex: 100,
                        top: "0",
                        margin: "0 auto",
                        transform: screenSize >= 576 ? "translate(-13%, -26%)" : "translate(-21%, -46%)",
                        padding: activeMenuItem === "learn" ? "7px" : "5px",
                      }}
                    >
                      <LearnIcon width={screenSize >= 576 ? 38 : 42} height={screenSize >= 576 ? 38 : 42} color='white' />
                    </div>
                  </div>
                ) : (
                  <LearnIcon width={screenSize >= 576 ? 36 : 32} height={screenSize >= 576 ? 36 : 32} color='white' />
                )}
                <div
                  className=''
                  style={{
                    fontSize: screenSize >= 576 ? "0.75rem" : ".7rem",
                    fontWeight: "400",
                    color: "rgba(255,255,255,0.96)",
                    textAlign: "center",
                    lineHeight: "1.15",
                    letterSpacing: "0.05em",
                    marginTop: "6px",
                  }}
                >
                  {t("app.menu.learn")}
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* FOOTER */}
        {screenSize >= 576 ? (
          <div className='col-12 p-0 order-5'>
            <div
              className='w-100 text-center'
              style={{
                color: "rgba(255,255,255,0.9)",
                letterSpacing: "0.05em",
                fontSize: "0.85rem",
                fontWeight: "300",
              }}
            >
              {t("app.footer.a") + " "} <span style={{ fontWeight: "500" }}><a href="https://www.github.com/mavrekc" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>{t("app.footer.b")}</a></span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default HomeLayout;
