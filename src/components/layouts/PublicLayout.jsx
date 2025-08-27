import "./PublicLayout.css";
import { Outlet } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axiosInstance from "../../utils/axios.js";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet-async";

const PublicLayout = () => {
  const [config, setConfig] = useState();
  const [content, setContent] = useState();
  const [showLangSelector, setShowLangSelector] = useState(false);
  const [selectedLang, setSelectedLang] = useState(
    Cookies.get("selectedLanguage") || "svenska"
  );
  const langDropdownRef = useRef(null);
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);

  const fetchConfig = async () => {
    try {
      const response = await axiosInstance.get("/config");
      setConfig(response.data);
    } catch (error) {
      console.error("Error fetching config:", error);
    }
  };

  const fetchTermContent = async (langCode) => {
    try {
      const response = await axiosInstance.get(`/locales/${langCode}`);
      setContent(response.data);
      setSelectedLang(langCode);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  useEffect(() => {
    fetchConfig();
    const savedLang = Cookies.get("selectedLanguage") || "svenska";
    setSelectedLang(savedLang);
    fetchTermContent(savedLang);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target)
      ) {
        setShowLangSelector(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (lang) => {
    Cookies.set("selectedLanguage", lang.code, { expires: 365 });
    fetchTermContent(lang.code);
    setShowLangSelector(false);
  };

  const metadata = config?.metadata;

  return (
    <>
      <Helmet>
        <title>{metadata?.title || "Default Title"}</title>
        <meta
          name="description"
          content={metadata?.description || "Default description"}
        />
        {metadata?.favicon && <link rel="icon" href={metadata.favicon} />}
      </Helmet>
      <div className="public-layout">
        <div className="background-image">
          {config && <img src={config.image} alt="Background" />}
        </div>
        {config && content && (
          <>
            <nav className="navigation-out">
              <header className="navigation-header">
                <section className="navigation-section">
                  <div className="logoa">
                    <img
                      src={config.logo}
                      alt="Logo"
                      className="navigation-logo"
                    />
                  </div>
                  <div
                    className="open-menu-dds"
                    onClick={() => setShowDropdownMenu(!showDropdownMenu)}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="navigation-svg"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
                    </svg>
                  </div>
                  <div className="navigation-menu-bar">
                    <div
                      className="menu-drop-down"
                      style={{ height: showDropdownMenu ? "350px" : "0px" }}
                    >
                      <div className="menu-drop-down-container">
                        {config &&
                          content &&
                          Object.keys(config.links).map((key) => {
                            const link = config.links[key];
                            const title = content.navigation?.[key];

                            if (!title) return null;

                            return (
                              <a
                                href={link}
                                className="menu-drop-down-item"
                                key={key}
                              >
                                <span className="collectionSpan">
                                  <p className="menu-item-name">{title}</p>
                                </span>
                              </a>
                            );
                          })}
                      </div>
                    </div>
                    <div className="pc-menu">
                      {config &&
                        content &&
                        Object.keys(config.links).map((key) => {
                          const link = config.links[key];
                          const title = content.navigation?.[key];

                          if (!title) return null;

                          return (
                            <a href={link} className="pc-menu-items" key={key}>
                              <span className="collectionSpan">
                                <p className="collectionitem">{title}</p>
                              </span>
                            </a>
                          );
                        })}
                      <a
                        href="#"
                        className="pc-menu-items language-pc-menu-items"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowLangSelector(!showLangSelector);
                        }}
                      >
                        <div className="language-title-box">
                          <p>
                            {config.languages?.find(
                              (lang) => lang.code === selectedLang
                            )?.name || "Select language"}
                          </p>
                          <img
                            src={
                              config.languages?.find(
                                (lang) => lang.code === selectedLang
                              )?.icon
                            }
                            className="flag-icon drop-down-image"
                            alt="Selected language"
                          />
                        </div>
                      </a>
                    </div>
                    <div className="lang-drop" ref={langDropdownRef}>
                      <div className="lang-drop-container">
                        {showLangSelector && (
                          <div className="dropdownList">
                            {config.languages?.map((lang) => (
                              <div
                                className="language-Svenska drop-down-element"
                                key={lang.code}
                                onClick={() => handleLanguageSelect(lang)}
                              >
                                <div className="drop-down-lang-name">
                                  {lang.name}
                                </div>
                                <div className="drop-down-image-div">
                                  <img
                                    src={lang.icon}
                                    className="drop-down-image"
                                    alt={lang.name}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </header>
            </nav>

            <main className="public-content">
              <Outlet context={{ content }} />
            </main>
          </>
        )}
      </div>
    </>
  );
};

export default PublicLayout;
