import "./Terms.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios.js";
import { useEffect, useState } from "react";

const Terms = () => {
  const navigate = useNavigate();

  const [config, setConfig] = useState();
  const [content, setContent] = useState();

  const fetchConfig = async () => {
    try {
      const response = await axiosInstance.get("/config");
      setConfig(response.data.data);
    } catch (error) {
      console.error("Error fetching config:", error);
    }
  };

  const fetchTermContent = async () => {
    try {
      const response = await axiosInstance.get("/locales/svenska");
      setContent(response.data.data);
    } catch (error) {
      console.error("Error fetching config:", error);
    }
  };

  useEffect(() => {
    fetchConfig();
    fetchTermContent();
  }, []);

  return null;

  return (
    <div className="terms-page">
      <div className="background">
        <img src={config?.image} alt="Background" />
      </div>
      <h1>Terms</h1>

      <div className="terms-content">
        <p>
          BY clicking Invoice Now, you choose to register according to the
          information that you have typed in and the text on the registration
          page and the terms here, and you at the same time accept the terms
          here.
        </p>

        <p>
          You can use Invoice Now free for a trial program from FDR FREE for 14
          days.
        </p>

        <p>
          123 Fakturera is so easy and self-explanatory so hopefully the chance
          that you will need support is minimal, but if you should need support,
          we are there for you, with our office manned for the most part of the
          day. After the trial period, the subscription continues and costs SEK
          99 excluding VAT per month, which is billed annually. If you do not
          want to keep using the program, just cancel the trial period by giving
          notice before 14 days from registration.
        </p>

        <p>
          You have of course the right to terminate the use of the program
          without any costs, by giving us notice per email before 14 days from
          registration, that you do not want to continue with the program, and
          you then of course do not pay anything.
        </p>

        <p>
          If we do not receive such a notice from you before 14 days from
          registration, the order, for natural reasons, cannot be changed. With
          registration it is meant the date and time when you choose to press
          the button Invoice Now.
        </p>

        <p>
          Billing is for one year at a time.
          <br />
          The price for 123 Fakturera (offer price SEK 99 per month / ordinary
          price SEK 159 per month)
          <br />
          is for the annual fee Start for one year's use of the program.
        </p>

        <p>
          (When using the offer price of SEK 99, the one-year period is
          calculated from registration.)
          <br />
          All prices are excluding VAT.
        </p>

        <p>
          Offer, Inventory Control, Member Invoicing, Multiuser version and
          English printout are for can be) additional modules that can be
          ordered later.
        </p>

        <p>
          Intermediation, as well as invoicing, may take place from K-Soft
          Sverige AB, Box 2826, 187 28 Täby. In the future, we may choose to
          cooperate with another company for e.g.
        </p>

        <p>
          Intermediation and invoicing. However, the customer relationship is
          with us. The payment is made to the company from which the invoice
          comes.
        </p>

        <p>
          The annual fee is on a continuous basis, but if you do not wish to
          continue using the program, you have to do is give notice thirty days
          before the start of the next one-year period.
        </p>

        <p>
          The introductory offer ( SEK 99 per month) is for the annual fee Start
          for the first year. After the first year, the ordinary price is
          billed, which is currently, for annual fee Remote control and
          fifty-nine kroner per month. for annual fee Pro, three hundred and
          thirty-three kroner per month and for annual fee Pro, three hundred
          and thirty-three kroner per month and for annual fee Remote control,
          three hundred and thirty-three kroner per year, the annual Remote
          Control fee is invoiced as standard, but you can choose Start or Pro
          by giving notice at any time before the due date.
        </p>

        <p>
          If you choose to keep the program by not notifying us by email within
          14 days of registration that you do not wish to continue with the
          program, you accept that you will pay the invoice for your order.
          Failure to pay the invoice or late payment does not give the right to
          cancel the order. We are happy to help you with logo at a cost price.
        </p>

        <p>
          License for the use of 123 Fakturera is of course sold in accordance
          with applicable laws.
        </p>

        <p>
          In order to be able to help you more easily and provide you with
          support, as well as to comply with the laws, we, for natural reasons,
          have to store your information.
        </p>

        <p>
          In connection with the storage of information, the law requires that
          we provide you with the following information:
        </p>

        <p>
          If you order as a private person, you have the right to cancel as
          stated by law. Your information is stored so that we can help you etc.
          We will use it to be able to help you if you need help follow the laws
          regarding bookkeeping, etc. When there are upgrades and the like, we
          may send you offers and the like about our products and services by
          email or the like. You may be contacted by email, post and the like,
          just send an email about it.
        </p>

        <p>
          You can at any time ask not to be sent information about upgrades by
          email, letter or the like, and we will of course not do that. You send
          such a request to us by email, and there will be information about
          upgrades by email, letter or the like to be requested if you ask. For
          natural reasons, we have to store, process and move your data. Your
          information is stored until further notice. You give us permission to
          store, process and move your data as well as to send you offers and
          the like by email, letter and the like, and tell others that you are
          customer. Due to the way it works with software, permission also needs
          to be granted to other parties. The permission is therefore granted to
          us, as well as to the companies and/or person(s) who own the software,
          source code, the website and the like. It is also given to current and
          future companies owned and/or controlled by one or more of those who
          currently own and/or control us. It is also given to current and
          future companies owned and/or controlled by one or more of those who
          currently own and/or control the companies (if any), which own or will
          own the software, source code, website and the like. This applies both
          to current and future products and services, either by intermediation
          or otherwise.
        </p>

        <p>
          This applies both to current and future companies owned and/or
          controlled by one or more of those who currently own and/or control
          the companies (if any), which own or will own the software, source
          code, website and the like either by intermediation or otherwise.
        </p>

        <p>
          You of course have the right to request access, change and deletion of
          the information we hold about you. You also have the right to request
          restriction of data processing, and to object to data processing and
          the right to data portability. You have the right to complain to the
          supervisory authority. You can find more legal information about us
          here. The laws that are applicable are the applicable laws. Placing an
          order is of course completely voluntary. Of course, we do not use any
          automated profiling or decisions.
        </p>

        <p>
          If you wish to contact us, please use the information on this website.
        </p>

        <p>
          Click on Invoice Now to register according to the information you have
          entered and the terms here. (Date and time of admission are entered
          automatically in our registers.)
        </p>

        <p>
          Our experience tells us that you will be very satisfied with the way
          we work and think that this will also be your experience.
        </p>

        <p>Have a great day!</p>
      </div>

      <div className="terms-actions">
        <button className="close-button" onClick={() => navigate("/")}>
          Close and Go Back
        </button>
      </div>
    </div>
  );
};

export default Terms;
