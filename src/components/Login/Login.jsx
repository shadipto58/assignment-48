import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';


const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [userEmail, setuserEmail] = useState('');

    const { loginUser, updatePassword } = useContext(AuthContext);


    const handleLogin = (event) => {
        setSuccess(false)
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        loginUser(email, password)
            .then(result => {
                const user = result.user;
                //console.log(user);
                setSuccess(true)
                form.reset();
                setError('')
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
            });
    }

    const handleEmailBlur = (event) => {
        const email = event.target.value;
        setuserEmail(email);
        //console.log(email);
    }
    const handleForgetPassword = () => {
        //console.log('clicked forgert');
        if (!userEmail) {
            alert('provide your Email');
            return;
        }
        updatePassword(userEmail);


    }

    return (
        <div>
            <h2>Register</h2>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold pb-5">Login Now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input onBlur={handleEmailBlur} type="email" placeholder="Email" name='email' className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" placeholder="password" name='password' className="input input-bordered" required />
                                <label className="label">
                                    <Link to="/register" className="label-text-alt link link-hover">New user? Register here!</Link>
                                </label>
                                <label className="label">
                                    <p>Forget password? <button onClick={handleForgetPassword}>Reset Password</button></p>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            {
                                success && <p className='text-green-600'>Login Successfull</p>
                            }
                            <p className='text-red-600'>{error}</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;