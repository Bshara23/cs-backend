import React, {useEffect} from 'react';
import {Formik, Form, useField} from 'formik';
import * as Yup from 'yup';
import {Form as Form2, Button} from 'react-bootstrap';

export default function SmartPasswordInput({
  onValChange,
  onErrorChange,
  className,
}) {
  return (
    <PasswordInput
      className={className}
      onValChange={onValChange}
      onErrorChange={onErrorChange}
    />
  );
}

const PasswordInput = ({onValChange, onErrorChange, className = ''}) => {
  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <Formik initialValues={initialValues} validationSchema={SignInSchema}>
      {formik => {
        const {errors, touched, isValid, dirty} = formik;

        return (
          <Form>
            <CustomComponent2
              label="password"
              name="password"
              type="password"
              placeholder="password"
              onValChange={onValChange}
              onErrorChange={onErrorChange}
              className={className}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

const SignInSchema = Yup.object ().shape ({
  password: Yup.string ()
    .required ('Password is required')
    .matches (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
});

const CustomComponent2 = props => {
  const [field, meta] = useField (props);
  useEffect (
    () => {
      if (meta !== undefined)
        if (props.onValChange !== undefined) {
          props.onValChange (meta.value);
        }
      if (props.onErrorChange !== undefined) {
        props.onErrorChange (meta.error);
      }
    },
    [meta]
  );

  return (
    <div>

      <Form2.Control {...field} {...props} />

      {meta.touched && meta.error
        ? <div className="error">{meta.error}</div>
        : null}
    </div>
  );
};
