import React from 'react';
import { useForm } from 'react-hook-form';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        alert('hello')
    };

    return (
        <>
            <Navbar />
            <div className='register-container'>
                <div className="register-wrapper">
                    <div className='wrapper-flex'>
                        <h2>Sign in</h2>
                        <form className='form-flex' value="sentMessage" onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-row">
                                <label htmlFor="username" className='input'>
                                    <input type='text' className="input__field" placeholder=' ' name='username' id='username'
                                        {...register("username")} />
                                    <span className="input__label">Username</span>
                                </label>
                            </div>

                            <div className="input-row">
                                <label htmlFor="password" className='input'>
                                    <input type='password' className="input__field" placeholder=' ' name='password' id='password'
                                        {...register("password")} />
                                    <span className="input__label">Password</span>
                                </label>
                            </div>

                            <button className="btn btn-reversed" type='submit'>Submit</button>
                        </form>
                        <Link to='/register'>Already forgot your password?</Link>
                        <p className='no-account'>Don't have an account? <Link to='/register'>Create one</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
