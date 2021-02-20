import React, {useEffect, useState} from 'react';
import {getUserSpare3, setUserSpare3, updateEmail} from '../API/API';
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap';

export default function ActivateMail({match}) {
  const history = useHistory ();
  const [allow, setAllow] = useState (false);

  const onActivateNewMail = () => {
    let userId = match.params.id;
    let myEmail = match.params.email;
    setUserSpare3 (userId).then (res => {});
    updateEmail (userId, myEmail).then (res => {
      history.push ('/');
    });
  };
  useEffect (() => {
    let userId = match.params.id;
    let userToken = match.params.token;
    let myEmail = match.params.email;

    getUserSpare3 (userId).then (res => {
      if (res.data) {
        let token = res.data.spare3;
        if (token == userToken) {
          setAllow (true);
        } else {
          setAllow (false);
          history.push ('/404');
        }
      }
    });
  }, []);

  return (
    <div>
      <h1>Changing email - Hasob</h1>
      {allow &&
        <div className="d-flex flex-column align-items-md-center">
          <h5 className="m-3">Are you sure you want to change email to {match.params.email}</h5>
          <Button className="m-3" onClick={onActivateNewMail}>Yes, I do.</Button>

          <h5 className="m-3">Ignore this mail if not.</h5>
        </div>}

      {/* {allow && <h3>Account activated, redirecting...</h3>} */}
    </div>
  );
}
