import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { updateAppSettings } from "../../utils/utils";
import { login } from "../../server/apiService/authApi";
import LoginForm from "./LoginForm";
import { rescuesEndpoint } from "../../server/apiService/apiConfig";
import loginSchema from "../../validations/loginValidationSchema";

export default function Login() {
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
        } else {
          updateAppSettings(json.token);
          history.push(rescuesEndpoint);
        }
        if (isMounted.current) {
          setSubmitting(false);
        }
      }
    } catch (err) {
      setErrors({ login: err.message });
    }
  };

  return (
    <Formik
      initialValues={{ username: "", password: "", login: "" }}
      validationSchema={loginSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => <LoginForm isSubmitting={isSubmitting} />}
    </Formik>
  );
}
