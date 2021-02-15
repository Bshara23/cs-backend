import React, {useEffect, useState} from 'react';
import {getUserSpare2, setUserSpare2} from '../API/API';
import {useHistory} from 'react-router-dom';
var sha256 = require ('js-sha256');

export default function ActivateAccount({match}) {
  const history = useHistory ();
  const [allow, setAllow] = useState (false);

  useEffect (() => {
    let userId = match.params.id;
    let userToken = match.params.token;
    console.log(userId, userToken);

    getUserSpare2 (userId).then (res => {
      if (res.data) {
        let token = res.data.spare2;
        console.log(token, userToken);
        if (token === userToken) {
          setUserSpare2 (userId, 'Activated').then (res => {
            setAllow (true);
            setTimeout (() => {
              history.push ('/sign-in');
            }, 2000);
          });
        } else {
          setAllow (false);
          history.push ('/404');
        }
      }
    });
  }, []);

  return (
    <div>
      {allow && <h3>Account activated, redirecting...</h3>}
    </div>
  );
}
