import React from 'react';
import Button from 'react-bootstrap/Button';
import {useHistory} from 'react-router-dom';
import privacyPdf from '../data/privacy.pdf';
import termsPdf from '../data/terms.pdf';
import {IoLogoTwitter} from 'react-icons/io5';
import {IoLogoFacebook} from 'react-icons/io5';
import {FaTelegramPlane} from 'react-icons/fa';

export default function About () {
  const history = useHistory ();

  const onTermsClick = () => {};

  const onPrivacyClick = () => {};
  const onBackToDashboardClick = () => {
    history.push ('/dashboard');
  };
  return (
    <div>

      <h1 className="text-center m-5">About</h1>
      <h3 className="text-center m-5">Got any questions? contact us!</h3>

      <div className="d-flex flex-column justify-content-md-around align-content-md-center">

        <div className="m-3 align-self-center">Phone: 052-2865645</div>
        <div className="m-3 align-self-center">
          Email: <a href="mailto: hasouby@hotmail.com">hasouby@hotmail.com</a>
        </div>
        <div className="m-3 align-self-center">
          Website: <a href="https://csclientserverapp.herokuapp.com/">hasouby</a>
        </div>
        <a
          className="m-3 align-self-center"
          href={privacyPdf}
          without
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button className="" variant="primary" onClick={onTermsClick}>
            Terms & Conditions
          </Button>
        </a>

        <a
          className="m-3 align-self-center"
          href={termsPdf}
          without
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button className="" variant="primary" onClick={onPrivacyClick}>
            Privacy
          </Button>
        </a>

        <a className="align-self-center">
          <Button
            className="m-3"
            variant="primary"
            onClick={onBackToDashboardClick}
          >
            Back to dashboard
          </Button>

        </a>

        <div className="d-flex flex-row justify-content-md-center align-content-md-center">

          <a href="https://twitter.com/" className="m-3">
            <IoLogoTwitter className="pointer" size={'30px'} />
          </a>

          <a href="https://facebook.com/" className="m-3">
            <IoLogoFacebook className="pointer" size={'30px'} />
          </a>

          <a href="https://telegram.org/" className="m-3">
            <FaTelegramPlane className="pointer" size={'30px'} />
          </a>
        </div>

      </div>

    </div>
  );
}
