import { useHistory, Link } from 'react-router-dom';
import backIcon from '../../assets/icons/arrow_back.svg';
import homeIcon from '../../assets/icons/home.svg';
import lightIcon from '../../assets/icons/light_mode.svg'
import './AccountPage.scss';

// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const AccountPage = () => {
    const history = useHistory();

    return (
        <main className='account'>
            <div className='account__nav'>
                <img src={backIcon} alt='back icon' className='account__icon' onClick={history.goBack} />
                <Link to='/' className='account__link'>
                    <img src={homeIcon} alt='home icon' className='account__icon' />
                </Link>
            </div>
            <section>
                <div className='account__group'>
                    <img src={lightIcon} alt='back icon' className='account__icon' />
                    <p className='account__text'>Themes</p>
                </div>
                <p>
                    Display Options
                </p>
                <p>
                    Sharing
                </p>
                <p>
                    Reminder Settings
                </p>
                <p>
                    Help
                </p>
                <p>
                    Send app feedback
                </p>
            </section>
            {/* <section>
                <p>
                    Settings
                </p>
            </section> */}
            {/* <section>
                <a href={`${SERVER_URL}/auth/logout`} onClick={authToken && handleLogout}>
                    Log Out
                </a>
            </section> */}
        </main>
    );
};

export default AccountPage;
