import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import logoImage from '../../assets/logos/nb-logo-gradient.svg';
import googleImage from '../../assets/images/google-logo.webp';
import './LoginPage.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const LoginPage = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isAxiosError, setIsAxiosError] = useState(false);
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;

        const email = form.email.value;
        const password = form.password.value;

        const loginInformation = {
            email: email,
            password: password
        }

        if (!email || !password) {
            setIsError(true);
            return;
        }

        axios
            .post(`${SERVER_URL}/users/login`, loginInformation) 
            .then((response) => {
                console.log(response);

                sessionStorage.setItem('authToken', response.data.token);
                
                setIsError(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                console.log(`Error logging in: ${error}`);
                setIsAxiosError(true);
            });
        
        event.target.reset();
    };

    return (
        <main className='login'>
            <img src={logoImage} alt='brand logo' className='login__logo'/>
            <h1 className='login__heading'>nota bene</h1>
            <p className='login__text'>Let's get started</p>
            <a href={`${SERVER_URL}/auth/google`} className='login__auth-link'>
                <img src={googleImage} alt='google logo' className='login__auth-logo'/>
                Log In with Google
            </a>
            <p className='login__or'>-----------------------or-----------------------</p>
            <form className='login__form' onSubmit={handleSubmit}>
                <label className='login__label'>
                    <input 
                        type='text'
                        placeholder='Email'
                        className={!isError ? 'login__input' : 'login__input login__input--error'}
                        name='email'
                    />
                </label>
                <label className='login__label'>
                    <input 
                        type='text'
                        placeholder='Password'
                        className={!isError ? 'login__input' : 'login__input login__input--error'}
                        name='password'
                    />
                </label>

                {isError && <span className='login__error'>All fields are required to log in.</span>}
                {/* {isSuccess && onLogin} */}
                {isAxiosError && <span className='login__request'>Error logging in. Please try again later.</span>}

                <button className='login__button'>Continue</button>
            </form>
            <p className='login__signup'>Don't have an account?</p>
            <Link to='/signup' className='login__signup-link'>Sign Up</Link>
        </main>
    );
};

export default LoginPage;