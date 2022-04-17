import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useForgetPasswordMutation } from "../generated/graphql";

const ForgotPassword = () => {
  const [msg, setMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [, forgetPassword] = useForgetPasswordMutation();

  const onSubmit = async (formData: { email: string }) => {
    await forgetPassword(formData);
    setMsg("Email sent");
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <div className="register-wrapper">
          <div className="wrapper-flex">
            <h2>Forgot Password</h2>
            <form
              className="form-flex"
              //@ts-ignore
              value="sentMessage"
              onSubmit={handleSubmit(onSubmit)}
            >
              <p>
                Please enter the email address you registered your account with.
                We will send you reset password confirmation to this email
              </p>
              <div className="input-row">
                <label htmlFor="email" className="input">
                  <input
                    className="input__field"
                    placeholder=" "
                    //@ts-ignore
                    name="email"
                    id="email"
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                  />
                  <span className="input__label">Email</span>
                </label>
                {errors?.email?.type === "required" && (
                  <p className="error">This field is required</p>
                )}
                {errors?.email?.type === "pattern" && (
                  <p className="error">Invalid email</p>
                )}
              </div>
              {msg && <p className="success">{msg}</p>}
              <button className="btn btn-reversed" type="submit">
                Submit
              </button>
              <Link to="/login">Back to login</Link>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
