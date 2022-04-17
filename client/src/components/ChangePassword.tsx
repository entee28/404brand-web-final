import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useChangePasswordMutation } from "../generated/graphql";
import Footer from "./Footer";
import Navbar from "./Navbar";

const ChangePassword = () => {
  const history = useHistory();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Current Password is required")
      .min(6, "Password must be at least 6 characters"),
    newPassword: Yup.string()
      .required("New Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const [, changePassword] = useChangePasswordMutation();

  const onSubmit = async <T extends { password: string; newPassword: string }>(
    formData: T
  ) => {
    const { password, newPassword } = formData;
    const res = await changePassword({
      password,
      newPassword,
    });
    if (res.data?.changePassword.errors) {
      setError(res.data?.changePassword.errors[0].message);
    } else {
      setError("");
      setSuccess(
        "Password successfully changed, auto navigate to home page in 2 seconds"
      );
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <div className="register-wrapper">
          <div className="wrapper-flex">
            <h2>Change Password</h2>
            <form
              className="form-flex"
              //@ts-ignore
              value="sentMessage"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="input-row">
                <label htmlFor="password" className="input">
                  <input
                    type="password"
                    className="input__field"
                    placeholder=" "
                    //@ts-ignore
                    name="password"
                    id="password"
                    {...register("password")}
                  />
                  <span className="input__label">Current Password*</span>
                </label>
                <p className="error">{errors.password?.message}</p>
              </div>

              <div className="input-row">
                <label htmlFor="newPassword" className="input">
                  <input
                    type="password"
                    className="input__field"
                    placeholder=" "
                    //@ts-ignore
                    name="newPassword"
                    id="newPassword"
                    {...register("newPassword")}
                  />
                  <span className="input__label">New Password*</span>
                </label>
                <p className="error">{errors.newPassword?.message}</p>
              </div>

              <div className="input-row">
                <label htmlFor="confirmPassword" className="input">
                  <input
                    type="password"
                    className="input__field"
                    placeholder=" "
                    //@ts-ignore
                    name="confirmPassword"
                    id="confirmPassword"
                    {...register("confirmPassword")}
                  />
                  <span className="input__label">Confirm Password*</span>
                </label>
                <p className="error">{errors.confirmPassword?.message}</p>
              </div>
              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}
              <button className="btn btn-reversed" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChangePassword;
