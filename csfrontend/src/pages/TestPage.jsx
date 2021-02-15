import React, {useEffect} from 'react';
import {sendMail} from '../API/API';
export default function TestPage () {
  
useEffect (() => {
    const to = 'bshara23@gmail.com';
    const subject = 'This is a test email';
    const text = 'this is the content';
    const onSuccess = e => {
      console.log ('on success', e);
    };
    //sendMail (to, subject, text, onSuccess);
  }, []);

  return (
    <div>
      <h1>Test Page</h1>
    </div>
  );
}
