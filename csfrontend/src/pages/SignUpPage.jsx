import React, {useState, useRef, useEffect} from 'react';
import {Player} from '@lottiefiles/react-lottie-player';
import TemporaryAlert from '../components/TemporaryAlert';
import {doesEmailExists, register, sendMail} from '../API/API';
import ReCaptcha from '@matt-block/react-recaptcha-v2';
import {SITE_KEY} from '../data/Consts';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useHistory} from 'react-router-dom';

var sha256 = require ('js-sha256');

export default function SignUpPage () {
  const [alertType, setAlertType] = useState ('');
  const [alertHeading, setAlertHeading] = useState ('');
  const [alertBody, setAlertBody] = useState ('');
  const [isVerified, setIsVerified] = useState (false);
  const history = useHistory ();
  const onSignUpClick = () => {
    history.push ('/sign-up');
  };

  const handleSubmit = ({fname, lname, email, password, promoCode}) => {
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
        });
      }
    });
  };

  const onLogInClick = () => {
    history.push ('/sign-in');
  };
  const alertRef = useRef ();

  const formik = useFormik ({
    initialValues: {
      fname: '',
      lname: '',
      email: '',
      password: '',
      pass2: '',
      promoCode: '',
    },
    validationSchema: Yup.object ({
      fname: Yup.string ()
        .max (15, 'Must be 15 characters or less')
        .required ('Required'),
      lname: Yup.string ()
        .max (20, 'Must be 15 characters or less')
        .required ('Required'),
      email: Yup.string ()
        .email ('Invalid email address')
        .required ('Required'),

      password: Yup.string ()
        .required ('Password is required')
        .matches (
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          'Must Contain at least 8 Characters\n One Uppercase, One Lowercase\n One Number and one special\n case Character'
        ),

      pass2: Yup.string ()
        .oneOf ([Yup.ref ('password'), null], 'Passwords must match')
        .required ('Required'),

      promoCode: Yup.string (),
    }),
    onSubmit: values => {
      handleSubmit (values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
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
      <h2 className="m-5">Sign Up</h2>

        <div className="form-group">
          <input
            className="form-control m-2"
            id="fname"
            name="fname"
            type="text"
            placeholder="First Name"
            {...formik.getFieldProps ('fname')}
          />
          {formik.touched.fname && formik.errors.fname
            ? <div className="error ml-2">{formik.errors.fname}</div>
            : null}
        </div>

        <div className="form-group">

          <input
            className="form-control m-2"
            id="lname"
            name="lname"
            type="text"
            placeholder="Last Name"
            {...formik.getFieldProps ('lname')}
          />
          {formik.touched.lname && formik.errors.lname
            ? <div className="error ml-2">{formik.errors.lname}</div>
            : null}
        </div>

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
        
        </div>
        <div className="shrink">
        {formik.touched.password && formik.errors.password
            ? <p className="error ml-2">{formik.errors.password}</p>
            : null}
        </div>
        
        <div className="form-group">

          <input
            className="form-control m-2"
            id="pass2"
            name="pass2"
            type="password"
            placeholder="Repeat Password"
            {...formik.getFieldProps ('pass2')}
          />
          {formik.touched.pass2 && formik.errors.pass2
            ? <div className="error ml-2">{formik.errors.pass2}</div>
            : null}
        </div>

        <div className="form-group">

          <input
            className="form-control m-2"
            id="promoCode"
            name="promoCode"
            type="text"
            placeholder="Promo Code"
            {...formik.getFieldProps ('promoCode')}
          />
          {formik.touched.promoCode && formik.errors.promoCode
            ? <div className="error ml-2">{formik.errors.promoCode}</div>
            : null}
        </div>
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
            className="btn btn-primary mt-3"
            disabled={!(formik.isValid && formik.dirty && isVerified)}
          >
            Sign Up
          </button>

          <div className="form-group mt-3">
            Already have an account? 
          <a className="mb-3 pointer" size="m" onClick={onLogInClick}>
            {' '}Sign In
          </a>
        </div>
        </div>

      </div>
    </form>
  );
}
