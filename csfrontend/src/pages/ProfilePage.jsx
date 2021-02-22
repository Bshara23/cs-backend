import React, {useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {currentUser, setCurrentUser} from '../data/Global';
import {AiFillEdit} from 'react-icons/ai';
import TemporaryAlert from '../components/TemporaryAlert';
import {useHistory} from 'react-router-dom';
import ReCaptcha from '@matt-block/react-recaptcha-v2';
import {SITE_KEY} from '../data/Consts';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {
  doesEmailExists,
  updatePassword,
  updateEmail,
  sendMail,
  setUserSpare3,
  updateUser,
} from '../API/API';
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap';

var sha256 = require ('js-sha256');

export default function ProfilePage () {
  const user = useSelector (currentUser);
  const dispatch = useDispatch ();

  const [show, setShow] = useState (false);
  const handleClose = () => setShow (false);
  const handleShow = () => setShow (true);
  const [errMsg, setErrMsg] = useState ('');
  const [sucMsg, setSucMsg] = useState ('');
  const [myEmail, setMyEmail] = useState ('');
  const [showNameChange, setShowNameChange] = useState (false);
  const [showEmailPhone, setShowEmailPhone] = useState (false);
  const [showLocation, setShowLocation] = useState (false);
  const editEmail = () => {
    doesEmailExists (myEmail).then (res => {
      if (res.data) {
        setErrMsg ('Mail already in use!');
        setSucMsg ('');
      } else {
        setErrMsg ('');
        setSucMsg (
          'We have sent you a link to your email, click on it to confirm'
        );
        // send email to confirm update mail
        const userId = user.id;

        setUserSpare3 (userId).then (res => {
          const token = res.data;

          const full =
            window.location.protocol +
            '//' +
            window.location.hostname +
            (window.location.port ? ':' + window.location.port : '');
          const url = `${full}/activateMail/${myEmail}/${userId}/${token}`;

          const to = user.email;
          const subject = 'Change Email';
          const text = `Click on this link to change your email: ${url}`;
          const onSuccess = e => {};
          sendMail (to, subject, text, onSuccess);
        });

        setTimeout (() => {
          handleClose ();
        }, 2000);
      }
    });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="form-control m-2"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={myEmail}
            onChange={e => {
              setMyEmail (e.target.value);
            }}
          />
          {sucMsg !== '' ? <div className="successm ml-2">{sucMsg}</div> : null}
          {errMsg !== '' ? <div className="error ml-2">{errMsg}</div> : null}
        </Modal.Body>
        <Button onClick={editEmail}>Change</Button>

      </Modal>

      <Modal show={showNameChange} onHide={() => setShowNameChange (false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChangeName
            fname_s={user.name}
            lname_s={user.family_name}
            onSaveClick={() => {
              setShowNameChange (false);
            }}
          />
        </Modal.Body>

      </Modal>

      <Modal show={showEmailPhone} onHide={() => setShowEmailPhone (false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Phone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChangePhone
            phone={user.promo_code}
            onSaveClick={() => {
              setShowEmailPhone (false);
            }}
          />
        </Modal.Body>

      </Modal>

      <Modal show={showLocation} onHide={() => setShowLocation (false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Location Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChangeLocation
            country={user.country}
            city={user.city}
            street={user.street}
            zipCode={user.zip_code}
            onSaveClick={() => {
              setShowLocation (false);
            }}
          />
        </Modal.Body>

      </Modal>

      <h1 className="text-center m-5">Profile Details</h1>
      <div className="row">
        <div className="border-bottom w-100 ml-3 mr-3" />

        <div className="row p-2 m-2 d-flex justify-content-between w-100">

          <div className="row col-8">
            <div className="col-12 col-md-4 ">First Name: {user.name}</div>
            <div className="col-12 col-md-4 ">
              Last Name: {user.family_name}
            </div>

          </div>

          <button
            onClick={setShowNameChange}
            type="submit"
            className="col-4  btn btn-primary"
          >
            Update
          </button>
        </div>

        <div className="p-2 m-2 d-flex justify-content-between">

          {/* <div>Phone Number: - </div> */}

        </div>
        <div className="border-bottom w-100 ml-3 mr-3" />
        <div className="row p-2 m-2 d-flex justify-content-between w-100 ">

          <div className="row col-8">
            <div className="col-12 col-md-6">Email: {user.email}</div>
          </div>

          <button
            onClick={() => setShow (true)}
            type="submit"
            className="col-4  btn btn-primary"
          >
            Update
          </button>
        </div>
        <div className="border-bottom w-100 ml-3 mr-3" />

        <div className="row p-2 m-2 d-flex justify-content-between w-100">

          <div className="row col-8">
            <div className="col-12 col-md-6">Phone: {user.promo_code}</div>
          </div>

          <button
            onClick={() => setShowEmailPhone (true)}
            type="submit"
            className="col-4  btn btn-primary"
          >
            Update
          </button>
        </div>
        <div className="border-bottom w-100 ml-3 mr-3" />

        <div className="row p-2 m-2 d-flex justify-content-between w-100">
          <div className="row col-8">

            <div className="col-12 col-md-6 ">Country: {user.country}</div>

            <div className="col-12 col-md-6 ">City: {user.city}</div>
            <div className="col-12 col-md-6 ">Street: {user.street}</div>
            <div className="col-12 col-md-6 ">Zip Code: {user.zip_code}</div>
          </div>

          <button
            onClick={() => setShowLocation (true)}
            type="submit"
            className="col-4 col-md-4 btn btn-primary"
          >
            Update
          </button>

        </div>
      </div>
      <div className="border-bottom w-100" />

      <div className="p-2 m-2  d-flex align-content-sm-center flex-wrap">

        <div>Change Password</div>
        <ChangePassword oldPassCopy={user.password} userId={user.id} />
      </div>

    </div>
  );
}

const ChangeLocation = ({country, city, street, zipCode, onSaveClick}) => {
  const user = useSelector (currentUser);
  const dispatch = useDispatch ();

  const handleSubmit = ({country, city, street, zipCode}) => {
    const newUser = {...user};

    newUser.country = country;
    newUser.city = city;
    newUser.zip_code = zipCode;
    newUser.street = street;

    dispatch (setCurrentUser (newUser));

    updateUser (newUser);

    onSaveClick ();
  };

  const formik = useFormik ({
    initialValues: {
      country,
      city,
      street,
      zipCode,
    },
    validationSchema: Yup.object ({
      country: Yup.string ().required ('Country is required'),
      city: Yup.string ().required ('City is required'),
      street: Yup.string ().required ('Street is required'),
      zipCode: Yup.string ().required ('Zip Code is required'),
    }),
    onSubmit: values => {
      handleSubmit (values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>

      <div className=" d-flex flex-column align-items-md-center">

        <div className="form-group">

          <input
            className="form-control m-2"
            id="country"
            name="country"
            type="text"
            placeholder="Country"
            {...formik.getFieldProps ('country')}
          />
          {formik.touched.country && formik.errors.country
            ? <div className="error ml-2">{formik.errors.country}</div>
            : null}
        </div>

        <div className="form-group">

          <input
            className="form-control m-2"
            id="city"
            name="city"
            type="text"
            placeholder="City"
            {...formik.getFieldProps ('city')}
          />
          {formik.touched.city && formik.errors.city
            ? <div className="error ml-2">{formik.errors.city}</div>
            : null}
        </div>

        <div className="form-group">

          <input
            className="form-control m-2"
            id="street"
            name="street"
            type="text"
            placeholder="Street"
            {...formik.getFieldProps ('street')}
          />
          {formik.touched.street && formik.errors.street
            ? <div className="error ml-2">{formik.errors.street}</div>
            : null}
        </div>

        <div className="form-group">

          <input
            className="form-control m-2"
            id="zipCode"
            name="zipCode"
            type="text"
            placeholder="zipCode"
            {...formik.getFieldProps ('zipCode')}
          />
          {formik.touched.zipCode && formik.errors.zipCode
            ? <div className="error ml-2">{formik.errors.zipCode}</div>
            : null}
        </div>

        <div className="form-group">

          <button
            type="submit"
            className="btn btn-primary mt-3"
            disabled={!formik.isValid}
          >
            Save
          </button>
        </div>

      </div>

    </form>
  );
};

const ChangePhone = ({phone, onSaveClick}) => {
  const user = useSelector (currentUser);
  const dispatch = useDispatch ();

  const handleSubmit = ({phone}) => {
    const newUser = {...user};

    newUser.promo_code = phone;

    dispatch (setCurrentUser (newUser));

    updateUser (newUser);

    onSaveClick ();
  };

  const formik = useFormik ({
    initialValues: {
      phone: phone,
    },
    validationSchema: Yup.object ({
      phone: Yup.string ().required ('Phone is required'),
    }),
    onSubmit: values => {
      handleSubmit (values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>

      <div className=" d-flex flex-column align-items-md-center">

        <div className="form-group">

          <input
            className="form-control m-2"
            id="phone"
            name="phone"
            type="text"
            placeholder="Phone"
            {...formik.getFieldProps ('phone')}
          />
          {formik.touched.phone && formik.errors.phone
            ? <div className="error ml-2">{formik.errors.phone}</div>
            : null}
        </div>

        <div className="form-group">

          <button
            type="submit"
            className="btn btn-primary mt-3"
            disabled={!formik.isValid}
          >
            Save
          </button>
        </div>

      </div>

    </form>
  );
};

const ChangeName = ({fname_s, lname_s, onSaveClick}) => {
  const user = useSelector (currentUser);
  const dispatch = useDispatch ();

  const handleSubmit = ({fname, lname}) => {
    const newUser = {...user};

    newUser.name = fname;
    newUser.family_name = lname;

    dispatch (setCurrentUser (newUser));

    updateUser (newUser);

    onSaveClick ();
  };

  const formik = useFormik ({
    initialValues: {
      fname: fname_s,
      lname: lname_s,
    },
    validationSchema: Yup.object ({
      fname: Yup.string ().required ('First name is required'),
      lname: Yup.string ().required ('Last name is required'),
    }),
    onSubmit: values => {
      handleSubmit (values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>

      <div className=" d-flex flex-column align-items-md-center">

        <div className="form-group">

          <input
            className="form-control m-2"
            id="fname"
            name="fname"
            type="text"
            placeholder="First Name"
            {...formik.getFieldProps ('fname')}
          />
          {formik.touched.oldPassword && formik.errors.oldPassword
            ? <div className="error ml-2">{formik.errors.oldPassword}</div>
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
          {formik.touched.password && formik.errors.password
            ? <div className="error ml-2">{formik.errors.password}</div>
            : null}
        </div>

        <div className="form-group">

          <button
            type="submit"
            className="btn btn-primary mt-3"
            disabled={!formik.isValid}
          >
            Save
          </button>
        </div>

      </div>

    </form>
  );
};

const ChangePassword = ({oldPassCopy, userId}) => {
  const alertRef = useRef ();
  const user = useSelector (currentUser);
  const dispatch = useDispatch ();
  const history = useHistory ();

  const [alertType, setAlertType] = useState ('');
  const [alertHeading, setAlertHeading] = useState ('');
  const [alertBody, setAlertBody] = useState ('');
  const [isVerified, setIsVerified] = useState (false);

  const handleSubmit = ({oldPassword, password}) => {
    
    // TODO create in api
    // 1. check if password are equal in DB

    if (sha256 (oldPassword) !== user.password) {
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

        const newUser = {...user};

        newUser.password = sha256 (password);
      

        dispatch (setCurrentUser (newUser));

        updateUser (newUser);
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
