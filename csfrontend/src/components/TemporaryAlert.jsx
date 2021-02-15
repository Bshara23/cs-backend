import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {Alert} from 'react-bootstrap';
var timeout = null;
const TemporaryAlert = (
  {body, heading, type = 'success', showTime = 5000},
  ref
) => {
  const [show, setShow] = useState(false);
 
  useImperativeHandle(ref, () => ({
    showAlert: () => {
      setShow(true);
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        closeAlert();
      }, showTime);
    },
  }));

  const closeAlert = () => {
    setShow(false);
  };
  return (
    <>
      {show && (
        <Alert variant={type} onClose={closeAlert} dismissible>
          <Alert.Heading>{heading}</Alert.Heading>
          <p>{body}</p>
        </Alert>
      )}
    </>
  );
};
export default forwardRef(TemporaryAlert);
