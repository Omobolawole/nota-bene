import { NavLink } from 'react-router-dom';
import closeIcon from '../../assets/icons/close.svg';
import logoutIcon from '../../assets/icons/logout.svg';
import addIcon from '../../assets/icons/add.svg';
import homeIcon from '../../assets/icons/home.svg';
import notesIcon from '../../assets/icons/notes.svg';
import listsIcon from '../../assets/icons/lists.svg';
import filesIcon from '../../assets/icons/files.svg';
import accountIcon from '../../assets/icons/account.svg';
import './PageFooter.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const PageFooter = ({ onShow, onHide, onLogout, onAdd }) => {
    return (
        <footer className={onShow ? 'footer' : 'footer--hidden'}>
            <nav className='footer__nav'>
                <div className='footer__actions'>
                    <img src={closeIcon} alt='close icon' className='footer__close' onClick={onHide} />
                    <a href={`${SERVER_URL}/auth/logout`} onClick={onLogout} >
                        <img src={logoutIcon} alt='logout icon' className='footer__logout-mobile' />
                    </a>
                </div>
                <ul className='footer__list'>
                    <li className='footer__hidden-list-item' onClick={onAdd}>
                        <img src={addIcon} alt='add icon' className='footer__add-tablet'  />
                        <p className='footer__text'>New Content</p>
                    </li>
                    <li className='footer__list-item'>
                        <NavLink
                            to='/'
                            exact
                            className='footer__item'
                            activeClassName='footer__item--active'
                        >
                            <img src={homeIcon} alt='home icon' className='footer__icon' />
                            <p className='footer__text'>Home</p>
                        </NavLink>
                    </li>
                    <li className='footer__list-item'>
                        <NavLink
                            to='/notes'
                            className='footer__item'
                            activeClassName='footer__item--active'
                        >
                            <img src={notesIcon} alt='notes icon' className='footer__icon' />
                            <p className='footer__text'>Notes</p>
                        </NavLink>
                    </li>
                    <li className='footer__list-item'>
                        <NavLink
                            to='/lists'
                            className='footer__item'
                            activeClassName='footer__item--active'
                        >
                            <img src={listsIcon} alt='lists icon' className='footer__icon' />
                            <p className='footer__text'>Lists</p>
                        </NavLink>
                    </li>
                    <li className='footer__list-item'>
                        <NavLink
                            to='/files'
                            className='footer__item'
                            activeClassName='footer__item--active'
                        >
                            <img src={filesIcon} alt='files icon' className='footer__icon' />
                            <p className='footer__text'>Files</p>
                        </NavLink>
                    </li>
                    <li className='footer__list-item'>
                        <NavLink
                            to='/account'
                            className='footer__item'
                            activeClassName='footer__item--active'
                        >
                            <img src={accountIcon} alt='account icon' className='footer__icon' />
                            <p className='footer__text'>Account</p>
                        </NavLink>
                    </li>
                    <li className='footer__hidden-list-item'>
                        <a href={`${SERVER_URL}/auth/logout`} onClick={onLogout} className='footer__hidden-link'>
                            <img src={logoutIcon} alt='logout icon' className='footer__logout-tablet' />
                            <p className='footer__text'>Logout</p>
                        </a>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

export default PageFooter;
