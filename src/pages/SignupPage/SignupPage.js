import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logoImage from '../../assets/logos/nb-logo-gradient.svg';
import googleImage from '../../assets/images/google-logo.webp';
import './SignupPage.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const SignupPage = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isAxiosError, setIsAxiosError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;

        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const email = form.email.value;
        const password = form.password.value;

        const userInformation = {
            username: `${firstName} ${lastName}`,
            email: email,
            password: password
        }

        if (!firstName || !lastName || !email || !password) {
            setIsError(true);
            return false;
        }

        axios
            .post(`${SERVER_URL}/users/register`, userInformation) 
            .then(() => {
                setIsError(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                console.log(`Error signing up: ${error}`);
                setIsAxiosError(true);
            });
        
        event.target.reset();
    };

    return (
        <main className='signup'>
            <img src={logoImage} alt='brand logo' className='signup__logo'/>
            <h1 className='signup__heading'>nota bene</h1>
            <p className='signup__text'>Let's get started</p>
            <a href={`${SERVER_URL}/auth/google`} className='signup__auth-link'>
                <img src={googleImage} alt='google logo' className='signup__auth-logo'/>
                Sign Up with Google
            </a>
            <p className='signup__or'>or</p>
            <form className='signup__form' onSubmit={handleSubmit}>
                <label className='signup__label'>
                    <input
                        type='text' 
                        placeholder='First Name'
                        className={!isError ? 'signup__input' : 'signup__input signup__input--error'}
                        name='firstName'
                    />
                </label>
                <label className='signup__label'>
                    <input 
                        type='text'
                        placeholder='Last Name'
                        className={!isError ? 'signup__input' : 'signup__input signup__input--error'}
                        name='lastName'
                    />
                </label>
                <label className='signup__label'>
                    <input 
                        type='text'
                        placeholder='Email'
                        className={!isError ? 'signup__input' : 'signup__input signup__input--error'}
                        name='email'
                    />
                </label>
                <label className='signup__label'>
                    <input 
                        type='password'
                        placeholder='Password'
                        className={!isError ? 'signup__input' : 'signup__input signup__input--error'}
                        name='password'
                    />
                </label>

                {isError && <span className='signup__error'>All fields are required to sign up.</span>}
                {isSuccess && <span className='signup__success'>Sign up successful! Log in below.</span>}
                {isAxiosError && <span className='signup__request'>Error signing in. Please try again later.</span>}

                <button className='signup__button'>Continue</button>
            </form>
            <p className='signup__login'>Have an account?</p>
            <Link to='/login' className='signup__login-link'>Log In</Link>
        </main>
    );
};

export default SignupPage;
