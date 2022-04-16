import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { RegisterInput, useRegisterMutation } from "../generated/graphql";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Register = () => {
  const [msg, setMsg] = useState<string | null>(null);

  const history = useHistory();

  const [, registerUser] = useRegisterMutation();

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .required("This field is required")
      .matches(/\p{L}+/u, "Alphabetical characters only"),
    lastname: Yup.string()
      .required("This field is required")
      .matches(/\p{L}+/u, "Alphabetical characters only"),
    email: Yup.string()
      .required("This field is required")
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  async function onSubmit<T extends RegisterInput>(data: T) {
    const res = await registerUser({
      input: {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
      },
    });
    if (res.data?.register.errors) {
      setMsg(res.data.register.errors[0].message);
    } else if (res.data?.register.user) {
      history.push("");
    }
  }

  return (
    <>
      <Navbar />
      <div className="register-container">
        <div className="register-wrapper">
          <div className="wrapper-flex">
            <h2>Create an account</h2>
            <form
              className="form-flex"
              onSubmit={handleSubmit(onSubmit)}
              //@ts-ignore
              value="sentMessage"
            >
              <div className="input-row">
                <label htmlFor="firstname" className="input">
                  <input
                    type="text"
                    className="input__field"
                    placeholder=" "
                    // @ts-ignore
                    name="firstname"
                    id="firstname"
                    {...register("firstname")}
                  />
                  <span className="input__label">First Name*</span>
                </label>
                <p className="error">{errors.firstname?.message}</p>
              </div>
              <div className="input-row">
                <label htmlFor="lastname" className="input">
                  <input
                    type="text"
                    className="input__field"
                    placeholder=" "
                    // @ts-ignore
                    name="lastname"
                    id="lastname"
                    {...register("lastname")}
                  />
                  <span className="input__label">Last Name*</span>
                </label>
                <p className="error">{errors.lastname?.message}</p>
              </div>

              <div className="input-row">
                <label htmlFor="email" className="input">
                  <input
                    className="input__field"
                    placeholder=" "
                    // @ts-ignore
                    name="email"
                    id="email"
                    {...register("email")}
                  />
                  <span className="input__label">Email*</span>
                </label>
                <p className="error">{errors.email?.message}</p>
              </div>

              <div className="input-row">
                <label htmlFor="password" className="input">
                  <input
                    type="password"
                    className="input__field"
                    placeholder=" "
                    // @ts-ignore
                    name="password"
                    id="password"
                    {...register("password")}
                  />
                  <span className="input__label">Password*</span>
                </label>
                <p className="error">{errors.password?.message}</p>
              </div>

              <div className="input-row">
                <label htmlFor="confirmPassword" className="input">
                  <input
                    type="password"
                    className="input__field"
                    placeholder=" "
                    // @ts-ignore
                    name="confirmPassword"
                    id="confirmPassword"
                    {...register("confirmPassword")}
                  />
                  <span className="input__label">Confirm Password*</span>
                </label>
                <p className="error">{errors.confirmPassword?.message}</p>
              </div>

              <p className="error">{msg}</p>
              <button className="btn btn-reversed" type="submit">
                Submit
              </button>
            </form>
            <Link to="/login">Back to login</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
