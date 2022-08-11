import { Link } from 'react-router-dom';
import logoImage from '../../assets/logos/nb-logo-gradient.svg';
import googleImage from '../../assets/images/google-logo.webp';
import './LoginPage.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const LoginPage = ({ onSubmit, onError, onAxiosError }) => {
    return (
        <main className='login'>
            <img src={logoImage} alt='brand logo' className='login__logo'/>
            <h1 className='login__heading'>nota bene</h1>
            <p className='login__text'>Let's get started</p>
            <a href={`${SERVER_URL}/auth/google`} className='login__auth-link'>
                <img src={googleImage} alt='google logo' className='login__auth-logo'/>
                Log In with Google
            </a>
            <div className='login__or-container'>
                <p className='login__or'>or</p>
            </div>
            <form className='login__form' onSubmit={onSubmit}>
                <label className='login__label'>
                    <input 
                        type='text'
                        placeholder='Email'
                        className={!onError ? 'login__input' : 'login__input login__input--error'}
                        name='email'
                    />
                </label>
                <label className='login__label'>
                    <input 
                        type='password'
                        placeholder='Password'
                        className={!onError ? 'login__input' : 'login__input login__input--error'}
                        name='password'
                    />
                </label>

                {onError && <span className='login__error'>All fields are required to log in.</span>}
                {onAxiosError && <span className='login__request'>Error logging in. Please try again later.</span>}

                <button className='login__button' type='submit' >Continue</button>
            </form>
            <p className='login__signup'>Don't have an account?</p>
            <Link to='/signup' className='login__signup-link'><p className='login__signup-text'>Sign Up</p></Link>
        </main>
    );
};

export default LoginPage;