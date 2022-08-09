import { useHistory, Link } from 'react-router-dom';
// import ReactModal from "react-modal";
// ReactModal.setAppElement('.account__modal');
import logoImage from '../../assets/logos/nb-logo-gradient.svg';
import backIcon from '../../assets/icons/arrow_back.svg';
import homeIcon from '../../assets/icons/home.svg';
import lightIcon from '../../assets/icons/light_mode.svg';
import displayIcon from '../../assets/icons/display_settings.svg';
import shareIcon from '../../assets/icons/share.svg';
import reminderIcon from '../../assets/icons/notifications.svg';
import helpIcon from '../../assets/icons/help.svg';
import reviewsIcon from '../../assets/icons/reviews.svg';
import './AccountPage.scss';


// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const AccountPage = ({ isOpen, onClose }) => {
    const history = useHistory();

    return (
        <main className='account__container'>
            {/* <div className='account__header'>
                <Link to='/' >
                    <img src={logoImage} alt='brand logo' className='account__logo'/>
                </Link>
                <h2 className='account__title'>Nota Bene</h2>
            </div> */}
            {/* <ReactModal className='account__modal' overlayClassName="account__overlay" isOpen={isOpen} > */}
                <div className='account__nav'>
                    <img src={backIcon} alt='back icon' className='account__icon' onClick={history.goBack} />
                    <Link to='/' className='account__link'>
                        <img src={homeIcon} alt='home icon' className='account__icon' />
                    </Link>
                </div>
                <section>
                    <div className='account__group'>
                        <img src={lightIcon} alt='back icon' className='account__icon' />
                        <p className='account__text'>Theme</p>
                        <label className='account__theme-switch'>
                            <input type='checkbox' className='account__theme-checkbox' />
                            <span className='account__theme-slider'></span>
                        </label>
                    </div>
                    <div className='account__group'>
                        <img src={displayIcon} alt='back icon' className='account__icon' />
                        <p className='account__text'>Display Options</p>
                    </div>
                    <div className='account__group'>
                        <img src={shareIcon} alt='back icon' className='account__icon' />
                        <p className='account__text'>Sharing</p>
                    </div>
                    <div className='account__group'>
                        <img src={reminderIcon} alt='back icon' className='account__icon' />
                        <p className='account__text'>Reminder Settings</p>
                    </div>
                    <div className='account__group'>
                        <img src={helpIcon} alt='back icon' className='account__icon' />
                        <p className='account__text'>Help</p>
                    </div>
                    <div className='account__group'>
                        <img src={reviewsIcon} alt='back icon' className='account__icon' />
                        <p className='account__text'>Send app feedback</p>
                    </div>
                </section>
            {/* </ReactModal> */}
        </main>
    );
};

export default AccountPage;
