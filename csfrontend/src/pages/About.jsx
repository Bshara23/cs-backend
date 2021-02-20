import React from 'react';
import Button from 'react-bootstrap/Button';
import {useHistory} from 'react-router-dom';
import privacyPdf from '../data/privacy.pdf';
import termsPdf from '../data/terms.pdf';

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
        <div className="m-3 align-self-center">Email: hasouby@hotmail.com</div>

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

      </div>

    </div>
  );
}
