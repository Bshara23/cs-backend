import React, {useState} from 'react';
import Cards from 'react-credit-cards';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import Spinner from 'react-bootstrap/Spinner';
import 'react-credit-cards/es/styles-compiled.css';

export default function CreditCard({onSuccess}) {
  const [focus, setFocus] = useState ('');

  const [buttonTitle, setButtonTitle] = useState ('Confirm Payment');
  const onPaymentPress = () => {
    if (buttonTitle === 'Success') {
      onSuccess ();
    } else {
      setButtonTitle ('Proccessing');

      setTimeout (() => {
        setButtonTitle ('Success');
      }, 2000);
    }
  };
  const handleInputFocus = e => {
    setFocus (e.target.name);
  };

  const formik = useFormik ({
    initialValues: {
      cvc: '',
      expiry: '',
      name: '',
      number: '',
    },
    validationSchema: Yup.object ({
      cvc: Yup.string ()
        .max (3, 'Must be exactly 3')
        .min (3, 'Must be exactly 3')
        .required ('Required'),
      expiry: Yup.string ()
        .max (4, 'Must be exactly 4')
        .min (4, 'Must be exactly 4')
        .required ('Required'),
      name: Yup.string ().required ('Required'),

      number: Yup.string ()
        .required ('Numbers required')
        .min (16, 'Must be exactly 16')
        .max (16, 'Must be exactly 16'),
    }),
    onSubmit: values => {
      onPaymentPress ();
    },
  });
  return (
    <form
      className="row d-flex flex-row justify-content-center"
      onSubmit={formik.handleSubmit}
    >
      <div className="col-12 col-lg-6">
        <Cards
          cvc={formik.values.cvc}
          expiry={formik.values.expiry}
          focused={focus}
          name={formik.values.name}
          number={formik.values.number}
        />
      </div>

      <div className="col-12 col-lg-6">
        <div className=" d-flex flex-column align-items-md-center ml-5">

          <div className="form-group w-100">
            <input
              className="form-control m-2"
              id="number"
              name="number"
              type="number"
              placeholder="Number"
              {...formik.getFieldProps ('number')}
              onFocus={handleInputFocus}
            />
            {formik.touched.number && formik.errors.number
              ? <div className="error ml-2">{formik.errors.number}</div>
              : null}
          </div>

          <div className="form-group w-100">
            <input
              className="form-control m-2"
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              {...formik.getFieldProps ('name')}
              onFocus={handleInputFocus}
            />
            {formik.touched.name && formik.errors.name
              ? <div className="error ml-2">{formik.errors.name}</div>
              : null}
          </div>

          <div className="d-flex flex-row">
            <div className="form-group w-100">

              <input
                className="form-control m-2"
                id="expiry"
                name="expiry"
                type="number"
                pattern="\d\d/\d\d"
                placeholder="Expiry date"
                {...formik.getFieldProps ('expiry')}
                onFocus={handleInputFocus}
              />
              {formik.touched.expiry && formik.errors.expiry
                ? <p className="error ml-2">{formik.errors.expiry}</p>
                : null}
            </div>

            <div className="form-group w-100 ml-2 ">
              <input
                className="form-control m-2"
                id="cvc"
                name="cvc"
                type="number"
                placeholder="CVC"
                {...formik.getFieldProps ('cvc')}
                onFocus={handleInputFocus}
              />
              {formik.touched.cvc && formik.errors.cvc
                ? <div className="error ml-2">{formik.errors.cvc}</div>
                : null}
            </div>
          </div>

          <div className="form-group">

            <button
              //disabled={!validateForm ()}
              type="submit"
              className={`btn btn-${buttonTitle !== 'Success' ? 'primary' : 'success'} mt-3`}
              disabled={!(formik.isValid && formik.dirty)}
            >
              {buttonTitle == 'Proccessing' &&
                <Spinner animation="border" variant="light" />}

              {buttonTitle}
            </button>

          </div>

        </div>
      </div>

    </form>
  );
}
