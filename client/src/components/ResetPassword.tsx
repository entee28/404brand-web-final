import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useResetPasswordMutation } from "../generated/graphql";
import Footer from "./Footer";
import Navbar from "./Navbar";

const ResetPassword = ({ match }: any) => {
  const [err, setErr] = useState<string | null>(null);
  const history = useHistory();

  const validationSchema = Yup.object().shape({
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

  const [, resetPassword] = useResetPasswordMutation();

  const onSubmit = async <T extends { password: string }>(formData: T) => {
    const { password } = formData;
    const res = await resetPassword({
      newPassword: password,
      token: match.params.resetToken,
    });

    if (res.data?.resetPassword.errors) {
      setErr(res.data.resetPassword.errors[0].message);
    } else if (res.data?.resetPassword.user) {
      history.push("/");
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <div className="register-wrapper">
          <div className="wrapper-flex">
            <h2>Reset Password</h2>
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
                    //@ts-ignore
                    name="confirmPassword"
                    id="confirmPassword"
                    {...register("confirmPassword")}
                  />
                  <span className="input__label">Confirm Password*</span>
                </label>
                <p className="error">{errors.confirmPassword?.message}</p>
              </div>
              {err && <p className="error">{err}</p>}
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

export default ResetPassword;
