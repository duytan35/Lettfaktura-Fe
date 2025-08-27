import "./PublicLayout.css";

import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios.js";

const PublicLayout = () => {
  const [config, setConfig] = useState();
  const [content, setContent] = useState();

  const fetchConfig = async () => {
    try {
      const response = await axiosInstance.get("/config");
      console.log("Config response:", response);
      setConfig(response.data);
    } catch (error) {
      console.error("Error fetching config:", error);
    }
  };

  const fetchTermContent = async () => {
    try {
      const response = await axiosInstance.get("/locales/svenska");
      setContent(response.data);
    } catch (error) {
      console.error("Error fetching config:", error);
    }
  };

  useEffect(() => {
    fetchConfig();
    fetchTermContent();
  }, []);

  console.log("Config:", config, content);

  return (
    <div className="public-layout">
      <div className="background-image">
        <img src={config?.image} alt="Background" />
      </div>
      <nav className="navigation-out">
        <header className="navigation-header">
          <section className="navigation-section">
            <div className="logoa">
              <img src={config?.logo} alt="Logo" className="navigation-logo" />
            </div>
            <div className="navigation-menu-bar">
              <div className="pc-menu">
                {config &&
                  content &&
                  Object.keys(config.links).map((key) => {
                    const link = config.links[key];
                    const title = content?.navigation?.[key];

                    if (!title) return null;

                    return (
                      <a href={link} className="pc-menu-items">
                        <span class="collectionSpan">
                          <p class="collectionitem">{title}</p>
                        </span>
                      </a>
                    );
                  })}
                <a href="#" className="pc-menu-items language-pc-menu-items">
                  <div className="language-title-box">
                    <p>English</p>
                    <img
                      src="https://storage.123fakturere.no/public/flags/GB.png"
                      className="flag-icon drop-down-image"
                    />
                  </div>
                </a>
              </div>
              <div className="lang-drop">
                <div className="lang-drop-container">
                  <div className="dropdownList">
                    <div className="language-Svenska drop-down-element">
                      <div className="drop-down-lang-name">Svenska</div>
                      <div className="drop-down-image-div">
                        <img
                          src="https://storage.123fakturere.no/public/flags/SE.png"
                          className="drop-down-image"
                          alt="Svenska"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </header>
      </nav>

      <main className="public-content">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
