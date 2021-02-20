import React, {useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import {currentUser, setCurrentUser} from '../data/Global';
import {AiFillEdit} from 'react-icons/ai';
import TemporaryAlert from '../components/TemporaryAlert';
import {useHistory} from 'react-router-dom';
import ReCaptcha from '@matt-block/react-recaptcha-v2';
import {SITE_KEY} from '../data/Consts';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {updatePassword} from '../API/API';
var sha256 = require ('js-sha256');
export default function ProfilePage () {
  const user = useSelector (currentUser);

  const editEmail = () => {
    console.log ('edit email');
  };
  useEffect (() => {
    console.log ('user', user);
  }, []);
  return (
    <div>

      <h1 className="text-center m-5">Profile Details</h1>
      <div className="d-flex flex-column align-content-sm-start flex-wrap">

        <div className="p-2 m-2 d-flex justify-content-between">
          <div className="">First Name: {user.name}</div>
          <div>Last Name: {user.family_name}</div>
          <div>Phone Number: -</div>
          <div>Country: {user.name}</div>

        </div>

        <div className="p-2 m-2 d-flex justify-content-between">
          <div>
            <AiFillEdit
              onClick={editEmail}
              color="#0e7bf1"
              className="pointer"
              size={'25px'}
            />
            Email:
            {' '}
            {user.email}
          </div>
          <div>City: {user.city}</div>
          <div>Street: {user.street}</div>
          <div>Zip Code: {user.zip_code}</div>
        </div>
        <span class="border-bottom w-100" />
      </div>

      <div className="p-2 m-2  d-flex align-content-sm-center flex-wrap">

        <div>Change Password</div>
        <ChangePassword oldPassCopy={user.password} userId={user.id} />
      </div>

    </div>
  );
}

const ChangePassword = ({oldPassCopy, userId}) => {
  const alertRef = useRef ();

  const history = useHistory ();

  const [alertType, setAlertType] = useState ('');
  const [alertHeading, setAlertHeading] = useState ('');
  const [alertBody, setAlertBody] = useState ('');
  const [isVerified, setIsVerified] = useState (false);

  const handleSubmit = ({oldPassword, password}) => {
    // TODO create in api
    // 1. check if password are equal in DB
    if (sha256 (oldPassword) === oldPassCopy) {
      setAlertType ('warning');
      setAlertHeading ('Error');
      setAlertBody ('Old password is wrong!');
      alertRef.current.showAlert ();
      return;
    }

    // 2. update password
    updatePassword (userId, sha256 (password)).then (res => {
      if (res.data == 1) {
        // password changed
        setAlertType ('success');
        setAlertHeading ('Success');
        setAlertBody ('Password has been changed successfuly!');
        alertRef.current.showAlert ();
      } else {
        // password didn't change
        setAlertType ('warning');
        setAlertHeading ('Error');
        setAlertBody ('Ops, something went wrong!!');
        alertRef.current.showAlert ();
      }
    });
  };

  const formik = useFormik ({
    initialValues: {
      oldPassword: '',
      password: '',
      pass2: '',
    },
    validationSchema: Yup.object ({
      oldPassword: Yup.string ().required ('Password is required'),

      password: Yup.string ()
        .required ('Password is required')
        .matches (
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          'Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
        ),

      pass2: Yup.string ()
        .oneOf ([Yup.ref ('password'), null], 'Passwords must match')
        .required ('Required'),
    }),
    onSubmit: values => {
      handleSubmit (values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>

      <TemporaryAlert
        body={alertBody}
        heading={alertHeading}
        type={alertType}
        ref={alertRef}
      />

      <div className=" d-flex flex-column align-items-md-center">
        <h2 className="m-5">Change Password</h2>

        <div className="form-group">

          <input
            className="form-control m-2"
            id="oldPassword"
            name="oldPassword"
            type="password"
            placeholder="Old Password"
            {...formik.getFieldProps ('oldPassword')}
          />
          {formik.touched.oldPassword && formik.errors.oldPassword
            ? <div className="error ml-2">{formik.errors.oldPassword}</div>
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
            type="submit"
            className="btn btn-primary mt-3"
            disabled={!(formik.isValid && formik.dirty && isVerified)}
          >
            Change Password
          </button>
        </div>

      </div>

    </form>
  );
};
