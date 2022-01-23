import React, { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';


const Login = () => {
    const [msg, setMsg] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        dispatch(login(data));
    };

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const dispatch = useDispatch();
    const errorState = useSelector(state => state.error);
    const prevError = usePrevious({ errorState });

    useEffect(() => {
        if (prevError !== errorState) {
            if (errorState.id === 'LOGIN_FAIL') {
                setMsg(errorState.msg.error);
                setTimeout(() => {
                    dispatch(clearErrors());
                }, 10000)
            } else {
                setMsg(null);
            }
        }
    }, [errorState, prevError, msg])

    return (
        <>
            <Navbar />
            <div className='register-container'>
                <div className="register-wrapper">
                    <div className='wrapper-flex'>
                        <h2>Sign in</h2>
                        <form className='form-flex' value="sentMessage" onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-row">
                                <label htmlFor="email" className='input'>
                                    <input className="input__field" placeholder=' ' name='email' id='email'
                                        {...register("email", {
                                            required: true,
                                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                        })} />
                                    <span className="input__label">Email</span>
                                </label>
                                {errors?.email?.type === "required" && <p className='error'>This field is required</p>}
                                {errors?.email?.type === "pattern" && (
                                    <p className='error'>Invalid email</p>
                                )}
                            </div>

                            <div className="input-row">
                                <label htmlFor="password" className='input'>
                                    <input type='password' className="input__field" placeholder=' ' name='password' id='password'
                                        {...register("password", {
                                            required: true
                                        })} />
                                    <span className="input__label">Password</span>
                                </label>
                                {errors?.password?.type === "required" && <p className='error'>This field is required</p>}

                            </div>
                            <p className='error'>{msg === 'Wrong Credentials' ? "Invalid email or password" : null}</p>
                            <button className="btn btn-reversed" type='submit'>Submit</button>
                        </form>
                        <Link to='/forgotpassword'>Already forgot your password?</Link>
                        <p className='no-account'>Don't have an account? <Link to='/register'>Create one</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
