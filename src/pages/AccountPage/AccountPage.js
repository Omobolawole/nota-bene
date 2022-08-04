import { useHistory, Link } from 'react-router-dom';
import backIcon from '../../assets/icons/arrow_back.svg';
import homeIcon from '../../assets/icons/home.svg';
import './AccountPage.scss';

// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const AccountPage = () => {
    const history = useHistory();

    return (
        <main>
            <div className='note-form__nav'>
                <img src={backIcon} alt='back icon' className='note-form__icon' onClick={history.goBack} />
                <Link to='/' className='note-form__link'>
                    <img src={homeIcon} alt='home icon' className='note-form__icon' />
                </Link>
            </div>
            <section>
                Theme
            </section>
            <section>
                Settings
            </section>
            {/* <section>
                <a href={`${SERVER_URL}/auth/logout`} onClick={authToken && handleLogout}>
                    Log Out
                </a>
            </section> */}
        </main>
    );
};

export default AccountPage;
