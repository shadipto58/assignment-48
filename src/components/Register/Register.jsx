import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/UserContext';

const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { createUser, veryfyEmail, updateProfileName } = useContext(AuthContext);


    const handleRegistration = (event) => {
        setSuccess(false)
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        if (!/(?=.*?[A-Z])/.test(password)) {
            setError('At least one upper case English letter')
            return;
        }
        if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
            setError('At least one special character')
            return;
        }
        if (password.length < 6) {
            setError('At least 6 digit')
            return;
        }
        setError('');

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true);
                form.reset();
                updateProfileName(name);
                veryfyEmail();
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error, errorMessage, errorCode);
            });
    }

    return (
        <div>
            <h2>Register</h2>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold pb-5">Register Now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleRegistration} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Name" name='name' className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="Email" name='email' className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" placeholder="password" name='password' className="input input-bordered" required />
                                <label className="label">
                                    <Link to="/login" className="label-text-alt link link-hover">Alredy have account? Please Login</Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                            {
                                success && <p className='text-green-600'>Registration Successfull</p>
                            }
                            <p className='text-red-600'>{error}</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;