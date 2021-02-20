import React from 'react';
import Button from 'react-bootstrap/Button';
import {useHistory} from 'react-router-dom';
import privacyPdf from '../data/privacy.pdf';
import termsPdf from '../data/terms.pdf';
import {IoLogoTwitter} from 'react-icons/io5';
import {IoLogoFacebook} from 'react-icons/io5';
import {FaTelegramPlane} from 'react-icons/fa';
import {BiMap} from 'react-icons/bi';
import {FaPhone} from 'react-icons/fa';
import {MdEmail} from 'react-icons/md';
import {BiWorld} from 'react-icons/bi';
import {Player} from '@lottiefiles/react-lottie-player';

export default function About () {
  const history = useHistory ();

  const onTermsClick = () => {};

  const onPrivacyClick = () => {};
  const onBackToDashboardClick = () => {
    history.push ('/dashboard');
  };
  return (
    <div>

      <Player
        src="https://assets9.lottiefiles.com/private_files/lf30_oSaQwF.json"
        background="transparent"
        speed="1"
        style={{height: '300px', width: '300px'}}
        loop
        autoplay
      />
      <h1 className="text-center">About</h1>
      <h3 className="text-center m-5">Got any questions? contact us!</h3>

      <div className="d-flex flex-column justify-content-center align-content-center">
        <div className="d-flex flex-row justify-content-center align-content-center">
          <a
            className="text-center"
            href="http://maps.google.com/?q=51 Snunit, Karmiel, The North, Israel"
            target="_blank"
          >
            <BiMap color="black" /> {' '}51 Snunit, Karmiel, The North, Israel.
          </a>
        </div>

        <div className="d-flex flex-row justify-content-center align-content-center m-2">
          <FaPhone className="mt-1 mr-2" />{' '}Phone: 052-2865645
        </div>

        <div className="d-flex flex-row justify-content-center align-content-center m-2">
          <MdEmail className="mt-1 mr-2" />
          {' '}
          Email:
          {' '}
          <a href="mailto: hasouby@hotmail.com">hasouby@hotmail.com</a>
        </div>
        <div className="d-flex flex-row justify-content-center align-content-center m-2">
          <BiWorld className="mt-1 mr-2" />{' '}Organization Website:
          {' '}
          <a href="https://www.braude.ac.il/">hasoub</a>
        </div>

        <a
          className="m-3 align-self-center"
          href={privacyPdf}
          without
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="mt-5" />

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

        <div className="d-flex flex-row justify-content-center align-content-md-center mt-3">

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
