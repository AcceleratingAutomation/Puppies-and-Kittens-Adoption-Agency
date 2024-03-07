import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { updateAppSettings } from "../../utils/utils";
import { login } from "../../server/apiService/authApi";
import LoginForm from "./LoginForm";
import {
  usernameRequired,
  passwordRequired,
  atLeast8Characters,
  atLeastOneLowercaseLetter,
  atLeastOneUppercaseLetter,
  atLeastOneNumber,
  atLeastOneSpecialCharacter,
} from "../../accessibility/login/loginText";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required(usernameRequired),
  password: Yup.string()
    .required(passwordRequired)
    .min(8, atLeast8Characters)
    .matches(/[a-z]/, atLeastOneLowercaseLetter)
    .matches(/[A-Z]/, atLeastOneUppercaseLetter)
    .matches(/[0-9]/, atLeastOneNumber)
    .matches(/[\^$*.[\]{}()?\-"!@#%&/,><':;|_~`]/, atLeastOneSpecialCharacter),
  login: Yup.string(),
});

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
          history.push("/v1/rescues");
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
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => <LoginForm isSubmitting={isSubmitting} />}
    </Formik>
  );
}
