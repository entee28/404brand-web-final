import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { LoginInput } from "../generated/graphql";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useLoginMutation } from "../generated/graphql";

const Login = () => {
  const [, login] = useLoginMutation();
  const [msg, setMsg] = useState(false);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: LoginInput) => {
    const res = await login({
      input: data,
    });

    if (res.data?.login.errors) {
      setMsg(true);
    } else if (res.data?.login.user) {
      history.push("/");
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <div className="register-wrapper">
          <div className="wrapper-flex">
            <h2>Sign in</h2>
            <form
              className="form-flex"
              //@ts-ignore
              value="sentMessage"
              onSubmit={handleSubmit(onSubmit)}
            >
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

              <div className="input-row">
                <label htmlFor="password" className="input">
                  <input
                    type="password"
                    className="input__field"
                    placeholder=" "
                    //@ts-ignore
                    name="password"
                    id="password"
                    {...register("password", {
                      required: true,
                    })}
                  />
                  <span className="input__label">Password</span>
                </label>
                {errors?.password?.type === "required" && (
                  <p className="error">This field is required</p>
                )}
              </div>
              <p className="error">
                {msg ? "Invalid email or password" : null}
              </p>
              <button className="btn btn-reversed" type="submit">
                Submit
              </button>
            </form>
            <Link to="/forgotpassword">Already forgot your password?</Link>
            <p className="no-account">
              Don't have an account? <Link to="/register">Create one</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
