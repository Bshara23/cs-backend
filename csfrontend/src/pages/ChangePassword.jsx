import React, {useEffect, useState, useRef} from 'react';
import {getUserSpare1, updatePasswordByToken, setUserSpare1} from '../API/API';
import TemporaryAlert from '../components/TemporaryAlert';
import {useHistory} from 'react-router-dom';
var sha256 = require ('js-sha256');

export default function ChangePassword({match}) {
  const alertRef = useRef ();
  const history = useHistory ();

  const [allow, setAllow] = useState (false);

  const [password, setPassword] = useState ('');
  const [repeatedPassword, setRepeatedPassword] = useState ('');

  const [alertType, setAlertType] = useState ('');
  const [alertHeading, setAlertHeading] = useState ('');
  const [alertBody, setAlertBody] = useState ('');

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

  const handleSubmit = e => {
    e.preventDefault ();
    let userId = match.params.id;
    let userToken = match.params.token;
    if (password !== repeatedPassword) {
      setAlertType ('warning');
      setAlertHeading ('Incorrect Password');
      setAlertBody ("Passwords don't match!");
      alertRef.current.showAlert ();
      return;
    }
    updatePasswordByToken (userId, userToken, sha256(password)).then (res => {
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
  function validateForm () {
    return password.length > 0 && repeatedPassword.length > 0;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <TemporaryAlert
          body={alertBody}
          heading={alertHeading}
          type={alertType}
          ref={alertRef}
        />

        {allow &&
          <div>

            <div className=" d-flex flex-column align-items-md-center">
              <h3 className="mt-5 mb-5">Change Password</h3>

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

              <button
                disabled={!validateForm ()}
                type="submit"
                className="btn btn-primary mt-3"
              >
                Change Password
              </button>
            </div>

          </div>}

      </form>       {' '}
    </div>
  );
}
