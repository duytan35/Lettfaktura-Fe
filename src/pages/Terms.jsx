import "./Terms.css";
import { useOutletContext } from "react-router-dom";

const Terms = () => {
  const { content } = useOutletContext();

  const termsContent = content.terms;

  return (
    <div className="content">
      <section className="terms-section">
        <div className="terms-top-text">
          <h1 className="terms-heading">{termsContent.terms}</h1>
          <button
            className="go-back-button"
            onClick={() => {
              if (window.opener) {
                window.close();
              } else {
                window.history.back();
              }
            }}
          >
            {termsContent.close}
          </button>
        </div>
        <div className="back-terms">
          {Object.entries(termsContent).map(([key, value]) => {
            if (!key.includes("terms_text")) return null;

            return (
              <p
                className={
                  key === "terms_text_4" || key === "terms_text_5" ? "mt-6" : ""
                }
                key={key}
                dangerouslySetInnerHTML={{ __html: value }}
              />
            );
          })}
        </div>
        <div className="terms-top-text">
          <button
            className="go-back-button"
            onClick={() => {
              if (window.opener) {
                window.close();
              } else {
                window.history.back();
              }
            }}
          >
            {termsContent.close}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Terms;
