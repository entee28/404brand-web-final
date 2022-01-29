import { useForm } from 'react-hook-form';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { register as registerUser } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

const Register = () => {
    const [msg, setMsg] = useState(null);

    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
            .required('This field is required')
            .matches(/\p{L}+/u, 'Alphabetical characters only'),
        lastname: Yup.string()
            .required('This field is required')
            .matches(/\p{L}+/u, 'Alphabetical characters only'),
        email: Yup.string()
            .required('This field is required')
            .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState: { errors } } = useForm(formOptions);
    function onSubmit(data) {
        dispatch(registerUser(data));
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
            if (errorState.id === 'REGISTER_FAIL') {
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
                        <h2>Create an account</h2>
                        <form className='form-flex' value="sentMessage" onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-row">
                                <label htmlFor="firstname" className='input'>
                                    <input type="text" className="input__field" placeholder=' ' name='firstname' id='firstname'
                                        {...register("firstname")} />
                                    <span className="input__label">First Name*</span>
                                </label>
                                <p className='error'>{errors.firstname?.message}</p>
                            </div>
                            <div className="input-row">
                                <label htmlFor="lastname" className='input'>
                                    <input type="text" className="input__field" placeholder=' ' name='lastname' id='lastname'
                                        {...register("lastname")} />
                                    <span className="input__label">Last Name*</span>
                                </label>
                                <p className='error'>{errors.lastname?.message}</p>
                            </div>

                            <div className="input-row">
                                <label htmlFor="email" className='input'>
                                    <input className="input__field" placeholder=' ' name='email' id='email'
                                        {...register("email")} />
                                    <span className="input__label">Email*</span>
                                </label>
                                <p className='error'>{errors.email?.message}</p>
                            </div>

                            <div className="input-row">
                                <label htmlFor="password" className='input'>
                                    <input type='password' className="input__field" placeholder=' ' name='password' id='password'
                                        {...register("password")} />
                                    <span className="input__label">Password*</span>
                                </label>
                                <p className='error'>{errors.password?.message}</p>
                            </div>

                            <div className="input-row">
                                <label htmlFor="confirmPassword" className='input'>
                                    <input type='password' className="input__field" placeholder=' ' name='confirmPassword' id='confirmPassword'
                                        {...register("confirmPassword")} />
                                    <span className="input__label">Confirm Password*</span>
                                </label>
                                <p className='error'>{errors.confirmPassword?.message}</p>
                            </div>

                            <p className='error'>{msg}</p>
                            <button className="btn btn-reversed" type='submit'>Submit</button>
                        </form>
                        <Link to='/login'>Back to login</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
};

export default Register;
