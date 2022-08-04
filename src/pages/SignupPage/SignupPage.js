import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/my-notes-logo.png';
import googleImage from '../../assets/images/google-logo.webp';
import './SignupPage.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const SignupPage = ({ onSignup }) => {
    return (
        <main>
            {/* <img src={logoImage} alt='logo image' /> */}
            <h1>notabene</h1>
            <p>Note it.</p>
            <a href={`${SERVER_URL}/auth/google`} onClick={onSignup} >
                {/* <img src={googleImage} alt='google image' /> */}
                Sign Up with Google
            </a>
            <p>or</p>
            <form>
                <label>
                    <input placeholder='First Name'/>
                </label>
                <label>
                    <input placeholder='Last Name'/>
                </label>
                <label>
                    <input placeholder='Email'/>
                </label>
                <label>
                    <input placeholder='Password'/>
                </label>
                <Link to='/login'>
                    <button>Continue</button>
                </Link>
            </form>
            <p>Already have an account?</p>
            <Link to='/login'>Log In</Link>
        </main>
    );
};

export default SignupPage;