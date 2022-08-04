import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/my-notes-logo.png';
import googleImage from '../../assets/images/google-logo.webp';
import './LoginPage.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const LoginPage = ({ onLogin }) => {
    return (
        <main>
            {/* <img src={logoImage} alt='logo image' /> */}
            <h1>notabene</h1>
            <p>Note it.</p>
            <a href={`${SERVER_URL}/auth/google`} onClick={onLogin} >
                {/* <img src={googleImage} alt='google image' /> */}
                Log In with Google
            </a>
            <p>or</p>
            <form>
                <label>
                    <input placeholder='Email'/>
                </label>
                <label>
                    <input placeholder='Password'/>
                </label>
                <button>Continue</button>
            </form>
            <p>Don't have an account?</p>
            <Link to='/signup'>Sign Up</Link>
        </main>
    );
};

export default LoginPage;