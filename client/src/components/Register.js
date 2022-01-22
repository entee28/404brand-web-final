import { useForm } from 'react-hook-form';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'

const Register = () => {
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match'),
        firstname: Yup.string()
            .required('This field is required')
            .matches(/\p{L}+/u, 'Alphabetical characters only'),
        lastname: Yup.string()
            .required('This field is required')
            .matches(/\p{L}+/u, 'Alphabetical characters only'),
        username: Yup.string()
            .required('This field is required')
            .matches(/\p{L}+/u, 'Alphabetical characters only'),
        email: Yup.string()
            .required('This field is required')
            .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email'),

    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState: { errors }, watch } = useForm(formOptions);
    const onSubmit = (data) => {
        alert('hello')
    };

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
                                <label htmlFor="username" className='input'>
                                    <input type='text' className="input__field" placeholder=' ' name='username' id='username'
                                        {...register("username")} />
                                    <span className="input__label">Username*</span>
                                </label>
                                <p className='error'>{errors.username?.message}</p>
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

                            <button className="btn btn-reversed" type='submit'>Submit</button>
                        </form>
                        <Link to='/login'>Back to login</Link>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Register;
