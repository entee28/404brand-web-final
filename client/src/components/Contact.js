import Navbar from './Navbar'
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Contact = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        // Headers
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // Request body
        const body = JSON.stringify(data);

        axios.post('/api/contacts', body, config)
            .then(alert('Form submitted!'));
    };

    return (
        <div>
            <Navbar />
            <div className='featured-products'>
                <h3>Get in touch</h3>
                <p>Need help? We've got you. Our support is unmatched.</p>
                <br />
                <p className='p-warning'>Due to the ongoing COVID-19 pandemic, shipping timelines for some countries have been impacted. You can expect a response within 7-10 business days</p>
                <button className='btn btn-feature'>Email us</button>

                <form className='form-flex' value="sentMessage" onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-row">
                        <label htmlFor="name" className='input'>
                            <input type="text" className="input__field" placeholder=' ' name='name' id='name'
                                {...register("name", {
                                    required: true,
                                    pattern: /\p{L}+/u
                                })} />
                            <span className="input__label">Name</span>
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
                        <label htmlFor="subject" className='input'>
                            <input type='text' className="input__field" placeholder=' ' name='subject' id='subject'
                                {...register("subject")} />
                            <span className="input__label">Subject</span>
                        </label>
                    </div>


                    <div className="input-row">
                        <label htmlFor="message" className='input'>
                            <textarea className="input__field" placeholder=' ' name='subject' id='subject'
                                {...register("message", {
                                    required: true
                                })} />
                            <span className="input__label">Message</span>
                        </label>
                        {errors?.message?.type === "required" && <p className='error'>This field is required</p>}
                    </div>

                    <button className="btn btn-feature" type='submit'>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Contact
