import React, {useState, useRef} from 'react';
import {Player, Controls} from '@lottiefiles/react-lottie-player';
import TemporaryAlert from '../components/TemporaryAlert';
import {doesEmailExists, register, sendMail} from '../API/API';
// import ReCaptcha from '@matt-block/react-recaptcha-v2';
import {SITE_KEY, SECRET_KEY} from '../data/Consts';
var sha256 = require ('js-sha256');

export default function SignUpPage () {
  const [fname, setFname] = useState ('');
  const [lname, setLname] = useState ('');
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [repeatedPassword, setRepeatedPassword] = useState ('');
  const [promoCode, setPromoCode] = useState ('');

  const [alertType, setAlertType] = useState ('');
  const [alertHeading, setAlertHeading] = useState ('');
  const [alertBody, setAlertBody] = useState ('');
  const [isVerified, setIsVerified] = useState (false);

  const handleSubmit = e => {
    e.preventDefault ();

    if (password !== repeatedPassword) {
      setAlertType ('warning');
      setAlertHeading ('Incorrect Password');
      setAlertBody ("Passwords don't match!");
      alertRef.current.showAlert ();
      return;
    }
    // check if already exists
    doesEmailExists (email).then (res => {
      if (res.data.length != 0) {
        // user already exists
        setAlertType ('warning');
        setAlertHeading ('User Exists');
        setAlertBody (
          'There is already an account registered with this email!'
        );
        alertRef.current.showAlert ();
      } else {
        // register

        register (
          fname,
          lname,
          email,
          sha256 (password),
          promoCode
        ).then (res => {
          setAlertType ('success');
          setAlertHeading ('Success');
          setAlertBody ('Registeration has been completed successfully!');
          alertRef.current.showAlert ();

          // send activation mail

          const userId = res.data.id;
          const token = res.data.spare2;

          const url = `http://localhost:3000/a/${userId}/${token}`;
          const to = email;
          const subject = 'Activation Email';
          const text = `Click on this link to activate your account: ${url}`;
          const onSuccess = e => {};
          sendMail (to, subject, text, onSuccess);
          setAlertType ('success');
          setAlertHeading ('Success');
          setAlertBody ('Check your email for an activation link');
        });
      }
    });
  };
  function validateForm () {
    return (
      fname.length > 0 &&
      lname.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      repeatedPassword.length > 0 &&
      promoCode.length > 0 && isVerified
    );
  }

  const alertRef = useRef ();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Player
          src="https://assets5.lottiefiles.com/packages/lf20_wd1udlcz.json"
          background="transparent"
          speed="1"
          loop
          autoplay
          style={{height: '300px', width: '300px'}}
        />
        <TemporaryAlert
          body={alertBody}
          heading={alertHeading}
          type={alertType}
          ref={alertRef}
        />

        <div className=" d-flex flex-column align-items-md-center">
          <h3 className="mt-5 mb-5">Sign Up</h3>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={e => setFname (e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              onChange={e => setLname (e.target.value)}
              type="text"
              className="form-control"
              placeholder="Last name"
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={e => setEmail (e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={e => setPassword (e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Repeat password"
              onChange={e => setRepeatedPassword (e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Have a promo code"
              onChange={e => setPromoCode (e.target.value)}
            />
          </div>
          {/* <ReCaptcha
            siteKey={SITE_KEY}
            theme="light"
            size="normal"
            onSuccess={captcha => setIsVerified (true)}
            onExpire={() =>
              console.log ('Verification has expired, re-verify.')}
            onError={() =>
              console.log ('Something went wrong, check your conenction')}
          /> */}
          <button
            disabled={!validateForm ()}
            type="submit"
            className="btn btn-primary mt-3"
          >
            Sign Up
          </button>
          <p className="forgot-password text-right">
            <a href="/reset-password">Forgot Password?</a>
          </p>
          <p className="forgot-password text-right">
            Already registered <a href="/sign-in">sign in?</a>
          </p>
        </div>
      </form>       {' '}
    </div>
  );
}
