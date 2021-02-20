import React, {useState, useEffect, useRef} from 'react';
import {Player} from '@lottiefiles/react-lottie-player';
import {Form, Button} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {logIn, sendMail} from '../API/API';
import TemporaryAlert from '../components/TemporaryAlert';
import {setCurrentUser} from '../data/Global';
import ReCaptcha from '@matt-block/react-recaptcha-v2';
import {SITE_KEY} from '../data/Consts';
import {useCookies} from 'react-cookie';
import * as Yup from 'yup';
import {useFormik} from 'formik';

var sha256 = require ('js-sha256');

export default function LogInPage () {
  const history = useHistory ();
  const dispatch = useDispatch ();
  const [cookies, setCookie] = useCookies (['user']);

  const alertRef = useRef ();
  const [alertHeading, setAlertHeading] = useState ('');
  const [alertBody, setAlertBody] = useState ('');
  const [alertType, setAlertType] = useState ('');

  const [id, setId] = useState (-1);
  const [spare2, setSpare2] = useState (-1);
  const [rememberMe, setRememberMe] = useState (false);

  const [isVerified, setIsVerified] = useState (false);

  const [allowSendActivationLink, setAllowSendActivationLink] = useState (
    false
  );

  useEffect (() => {
    // auto login if user has been saved by remember me
    if (cookies.user !== undefined) {
      const email = cookies.user.email;
      const password = cookies.user.password;
      logIn (email, sha256 (password)).then (res => {
        if (res.data.length != 0) {
          setId (res.data.id);
          setSpare2 (res.data.spare2);
          if (res.data.spare2 === 'Activated') {
            history.push ('/dashboard');
            dispatch (setCurrentUser (res.data));
          }
        }
      });
    }
  }, []);

  const handleSubmit = ({email, password}) => {
    logIn (email, sha256 (password)).then (res => {
      if (res.data.length != 0) {
        console.log ('user:', res.data);
        setId (res.data.id);
        setSpare2 (res.data.spare2);
        if (res.data.spare2 === 'Activated') {
          if (rememberMe) {
            setCookie ('user', {email, password});
          }
          setTimeout (() => {
            history.push ('/dashboard');
          }, 500);
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

  const onSignUpClick = () => {
    history.push ('/sign-up');
  };

  const resendActivationLink = email => {
    const userId = id;
    const token = spare2;

    const full =
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '');
    const url = `${full}/a/${userId}/${token}`;

    const to = email;
    const subject = 'Activation Email';
    const text = `Click on this link to activate your account: ${url}`;
    const onSuccess = e => {};
    sendMail (to, subject, text, onSuccess);
    setAlertType ('success');
    setAlertHeading ('Success');
    setAlertBody ('Check your email for an activation link');
    alertRef.current.showAlert ();
  };

  const formik = useFormik ({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object ({
      email: Yup.string ()
        .email ('Invalid email address')
        .required ('Required'),

      password: Yup.string ().required ('Password is required'),
    }),
    onSubmit: values => {
      handleSubmit (values);
    },
  });
  return (
    <form  onSubmit={formik.handleSubmit}>
      <br/>
      <Player
        autoplay
        speed="0.5"
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
      <div className=" d-flex flex-column align-items-md-center">

        <h2 className="m-5">Sign In</h2>
        <div className="form-group">

          <input
            className="form-control m-2"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            {...formik.getFieldProps ('email')}
          />
          {formik.touched.email && formik.errors.email
            ? <div className="error ml-2">{formik.errors.email}</div>
            : null}
        </div>

        <div className="form-group">

          <input
            className="form-control m-2"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            {...formik.getFieldProps ('password')}
          />
          {formik.touched.password && formik.errors.password
            ? <div className="error ml-2">{formik.errors.password}</div>
            : null}
        </div>

        <Form.Group className="m-2" controlId="formBasicCheckbox">
          <Form.Check
            value={rememberMe}
            onChange={e => setRememberMe (e.target.value)}
            type="checkbox"
            label="Remember Me"
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
        <div className="form-group">

          <button
            //disabled={!validateForm ()}
            type="submit"
            className="btn btn-primary m-2"
            disabled={!(formik.isValid && formik.dirty && isVerified)}
          >
            Log In
          </button>

        </div>
        <div className="form-group">
          Don't have an account?
          <a className="mb-3 pointer" size="m" onClick={onSignUpClick}>
            {' '}Sign Up
          </a>
        </div>

        {allowSendActivationLink &&
          <div className="d-flex flex-column align-items-md-center m-3">

            <p className="forgot-password text-right m-2">
              Didn't receive an activation link?
            </p>
            <Button
              className="mb-3"
              size="m"
              onClick={() => resendActivationLink (formik.values.email)}
            >
              Resend Activation Link
            </Button>
          </div>}
        <p className="forgot-password text-right mb-5">
          <a href="/reset-password">Forgot Password?</a>
        </p>

      </div> 

      <br/>
    </form>
  );
}
