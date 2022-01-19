import { useForm } from 'react-hook-form';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Register = () => {
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
                        <h2>Create an account</h2>
                        <form className='form-flex' value="sentMessage" onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-row">
                                <label htmlFor="fname" className='input'>
                                    <input type="text" className="input__field" placeholder=' ' name='fname' id='fname'
                                        {...register("fname", {
                                            required: true,
                                            pattern: /\p{L}+/u
                                        })} />
                                    <span className="input__label">First Name</span>
                                </label>
                                {errors?.name?.type === "required" && <p className='error'>This field is required</p>}
                                {errors?.name?.type === "pattern" && (
                                    <p className='error'>Alphabetical characters only</p>
                                )}
                            </div>
                            <div className="input-row">
                                <label htmlFor="lname" className='input'>
                                    <input type="text" className="input__field" placeholder=' ' name='lname' id='lname'
                                        {...register("lname", {
                                            required: true,
                                            pattern: /\p{L}+/u
                                        })} />
                                    <span className="input__label">Last Name</span>
                                </label>
                                {errors?.name?.type === "required" && <p className='error'>This field is required</p>}
                                {errors?.name?.type === "pattern" && (
                                    <p className='error'>Alphabetical characters only</p>
                                )}
                            </div>

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

                            <div className="input-row">
                                <label htmlFor="c-password" className='input'>
                                    <input type='password' className="input__field" placeholder=' ' name='c-password' id='c-password'
                                        {...register("c-password")} />
                                    <span className="input__label">Confirm Password</span>
                                </label>
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
