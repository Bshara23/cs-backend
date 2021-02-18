import React, {useState, useEffect, useRef} from 'react';
import {Player, Controls} from '@lottiefiles/react-lottie-player';
import {Form, Button} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {logIn, sendMail} from '../API/API';
import TemporaryAlert from '../components/TemporaryAlert';
import {setCurrentUser} from '../data/Global';
import ReCaptcha from '@matt-block/react-recaptcha-v2';
import {SITE_KEY, SECRET_KEY} from '../data/Consts';

var sha256 = require ('js-sha256');

export default function LogInPage () {
  const history = useHistory ();
  const dispatch = useDispatch ();

  const alertRef = useRef ();
  const [alertHeading, setAlertHeading] = useState ('');
  const [alertBody, setAlertBody] = useState ('');
  const [alertType, setAlertType] = useState ('');

  const [id, setId] = useState (-1);
  const [spare2, setSpare2] = useState (-1);

  const [isVerified, setIsVerified] = useState (false);
  const [email, setemail] = useState ('');
  const [password, setPassword] = useState ('');
  const [allowSendActivationLink, setAllowSendActivationLink] = useState (
    false
  );

  function validateForm () {
    return email.length > 0 && password.length > 0 && isVerified;
  }

  const handleSubmit = e => {
    e.preventDefault ();
    logIn (email, sha256 (password)).then (res => {
      if (res.data.length != 0) {
        console.log ('user:', res.data);
        setId (res.data.id);
        setSpare2 (res.data.spare2);
        if (res.data.spare2 === 'Activated') {
          console.log ('log in');
          history.push ('/dashboard');
          dispatch (setCurrentUser (res.data));
        } else if (res.data.id != null) {
          setAlertType ('info');

          setAlertHeading ('Activate account');
          setAlertBody ('Please check you email for an activation link.');
          alertRef.current.showAlert ();
          setAllowSendActivationLink (true);
        }
      } else {
        setAlertType ('warning');

        setAlertHeading ('Log in failed');
        setAlertBody ('Password or email are not correct! try again.');
        alertRef.current.showAlert ();
      }
    });
  };

  useEffect (() => {
    var full = window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port: '');

    console.log ("loc:", full);
  }, []);

  const onSignUpClick = () => {
    history.push ('/sign-up');
  };

  const resendActivationLink = () => {
    const userId = id;
    const token = spare2;

    // let url = `http://csclientserverapp.herokuapp.com/a/${userId}/${token}`;

    // if(process.env.NODE_ENV === 'production'){
    //   url = `http://csclientserverapp.herokuapp.com/a/${userId}/${token}`;
    // }
    // if(process.env.NODE_ENV === 'development'){
    //   url = `http://csclientserverapp.herokuapp.com/a/${userId}/${token}`;
    // }

    // const to = email;
    // const subject = 'Activation Email';
    // const text = `Click on this link to activate your account: ${url}`;
    // const onSuccess = e => {};
    // sendMail (to, subject, text, onSuccess);
    // setAlertType ('success');
    // setAlertHeading ('Success');
    // setAlertBody ('Check your email for an activation link');
    // alertRef.current.showAlert ();
  };

  return (
    <div className="Login">

      <Player
        autoplay
        loop
        src="https://assets1.lottiefiles.com/datafiles/RvQQlJ3ODelSiQi/data.json"
        style={{height: '300px', width: '300px'}}
      />
      <TemporaryAlert
        body={alertBody}
        heading={alertHeading}
        type={alertType}
        ref={alertRef}
      />
      <Form
        className="d-flex flex-column align-items-md-center"
        onSubmit={handleSubmit}
      >
        <h3 className="pt-5 pb-3"> Welcome Back!</h3>

        <Form.Group size="lg" controlId="email">
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setemail (e.target.value)}
          />

        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={e => setPassword (e.target.value)}
          />
        </Form.Group>

        <ReCaptcha
          siteKey={SITE_KEY}
          theme="light"
          size="normal"
          onSuccess={captcha => setIsVerified (true)}
          onExpire={() => console.log ('Verification has expired, re-verify.')}
          onError={() =>
            console.log ('Something went wrong, check your conenction')}
        />
        <Button
          className="mt-3 mb-3"
          size="m"
          type="submit"
          disabled={!validateForm ()}
        >
          Login
        </Button>
        <Button className="mb-3" size="m" onClick={onSignUpClick}>
          Sign Up
        </Button>

        {allowSendActivationLink &&
          <div className="d-flex flex-column align-items-md-center m-3">

            <p className="forgot-password text-right m-2">
              Didn't receive an activation link?
            </p>
            <Button
              className="mb-3"
              disabled={email.length == 0}
              size="m"
              onClick={resendActivationLink}
            >
              Resend Activation Link
            </Button>

          </div>}
        <p className="forgot-password text-right">
          <a href="/reset-password">Forgot Password?</a>
        </p>
      </Form>
    </div>
  );
}
