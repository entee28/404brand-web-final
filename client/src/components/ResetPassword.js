import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { useForm } from 'react-hook-form';
import Navbar from './Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';


const ResetPassword = ({ match }) => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        console.log(match.params.resetToken);
    }, []);

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState: { errors } } = useForm(formOptions);

    const onSubmit = async (formData) => {
        const { password } = formData;
        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.put(
                `/api/auth/passwordreset/${match.params.resetToken}`,
                {
                    password,
                },
                config
            );

            setSuccess(data.data);
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <>
            <Navbar />
            <div className='register-container'>
                <div className="register-wrapper">
                    <div className='wrapper-flex'>
                        <h2>Reset Password</h2>
                        <form className='form-flex' value="sentMessage" onSubmit={handleSubmit(onSubmit)}>
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
                            {error && <p className="error">{error}</p>}
                            {success && <p className="success">{success} <Link to='/login'>Login</Link></p>}
                            <button className="btn btn-reversed" type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
