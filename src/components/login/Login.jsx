import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { updateAppSettings } from "../../utils/utils";
import { login } from "../../server/apiService/authApi";
import LoginForm from "./LoginForm";
import {
  required,
  atLeast8Characters,
  atLeastOneLowercaseLetter,
  atLeastOneUppercaseLetter,
  atLeastOneNumber,
  atLeastOneSpecialCharacter,
} from "./loginText";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required(required),
  password: Yup.string()
    .required(required)
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
      if (isMounted.current) {
        throw new Error(`Error logging into app ${err.message}`);
      }
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
