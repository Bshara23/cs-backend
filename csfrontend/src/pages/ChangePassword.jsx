import React, {useEffect, useState, useRef} from 'react';
import {getUserSpare1, updatePasswordByToken, setUserSpare1} from '../API/API';
import TemporaryAlert from '../components/TemporaryAlert';
import {useHistory} from 'react-router-dom';
import ReCaptcha from '@matt-block/react-recaptcha-v2';
import {SITE_KEY, SECRET_KEY} from '../data/Consts';
import * as Yup from 'yup';
import {useFormik} from 'formik';
var sha256 = require ('js-sha256');

export default function ChangePassword({match}) {
  const alertRef = useRef ();
  const history = useHistory ();

  const [allow, setAllow] = useState (false);

  const [alertType, setAlertType] = useState ('');
  const [alertHeading, setAlertHeading] = useState ('');
  const [alertBody, setAlertBody] = useState ('');
  const [isVerified, setIsVerified] = useState (false);

  useEffect (() => {
    let userId = match.params.id;
    let userToken = match.params.token;
    console.log (match);
    getUserSpare1 (userId).then (res => {
      if (res.data) {
        let token = res.data.spare1;
        if (token === userToken) {
          // token is valid
          setAllow (true);
        } else {
          setAllow (false);
          history.push ('/404');
        }
      }
    });
  }, []);

  const handleSubmit = ({password}) => {

    let userId = match.params.id;
    let userToken = match.params.token;

    updatePasswordByToken (userId, userToken, sha256 (password)).then (res => {
      if (res.data == 1) {
        // password changed
        setAlertType ('success');
        setAlertHeading ('Success');
        setAlertBody ('Password has been changed successfuly!');
        alertRef.current.showAlert ();
        setAllow (false);
        // delete token
        setUserSpare1 (userId, null).then (res => {
          setTimeout (() => {
            // redirect to log in
            history.push ('/sign-in');
          }, 1000);
        });
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
      password: '',
      pass2: '',
    },
    validationSchema: Yup.object ({
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
      {allow &&
        <div className=" d-flex flex-column align-items-md-center">
      <h2 className="m-5">Change Password</h2>

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
            onExpire={() =>
              console.log ('Verification has expired, re-verify.')}
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

        </div>}

    </form>
  );
}

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>

//         <TemporaryAlert
//           body={alertBody}
//           heading={alertHeading}
//           type={alertType}
//           ref={alertRef}
//         />

//         {allow &&
//           <div>

//             <div className=" d-flex flex-column align-items-md-center">
//               <h3 className="mt-5 mb-5">Change Password</h3>

//               <div className="form-group">
//                 <SmartPasswordInput
//                   onValChange={e => setPassword (e)}
//                   onErrorChange={err => setPasswordError (err)}
//                   onValChangeConfirm={e => setRepeatedPassword (e)}
//                   onErrorChangeConfirm={err => setPasswordConfirmError (err)}
//                 />
//               </div>

//               <ReCaptcha
//                 siteKey={SITE_KEY}
//                 theme="light"
//                 size="normal"
//                 onSuccess={captcha => setIsVerified (true)}
//                 onExpire={() =>
//                   console.log ('Verification has expired, re-verify.')}
//                 onError={() =>
//                   console.log ('Something went wrong, check your conenction')}
//               />
//               <button
//                 disabled={!validateForm ()}
//                 type="submit"
//                 className="btn btn-primary mt-3"
//               >
//                 Change Password
//               </button>
//             </div>

//           </div>}

//       </form>       {' '}
//     </div>
//   );
// }
