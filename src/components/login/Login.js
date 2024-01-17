import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { updateAppSettings } from "../../utils";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { login } from '../../server/api/authApi';
import LoginForm from './LoginForm';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number'),
  login: Yup.string(),
});

export const Login = () => {
  const history = useHistory();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const json = await login(values.username, values.password);
      if (isMounted.current) {
        if (json.message) {
          setErrors({ login: json.message });
        }
        else {
          updateAppSettings(json.token);
          history.push("/v1/rescues");
        }
        if (isMounted.current) {
          setSubmitting(false);
        }
      }
    } catch (err) {
      if (isMounted.current) {
        console.log("Error logging into app ", err.message);
      }
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '', login: '' }}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <LoginForm isSubmitting={isSubmitting} />
      )}
    </Formik>
  );
};