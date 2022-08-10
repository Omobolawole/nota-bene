import { NavLink } from 'react-router-dom';
import closeIcon from '../../assets/icons/close.svg';
import logoutIcon from '../../assets/icons/logout.svg';
import addIcon from '../../assets/icons/add.svg';
import homeIcon from '../../assets/icons/home.svg';
import notesIcon from '../../assets/icons/notes.svg';
import listsIcon from '../../assets/icons/lists.svg';
import filesIcon from '../../assets/icons/files.svg';
import accountIcon from '../../assets/icons/account.svg';
import './PageNav.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const PageNav = ({ onShow, onHide, onLogout, onAdd, onOpen }) => {
    return (
        <section className='links'>
            <nav className={onShow ? 'links__nav' : 'links__nav links__nav--hidden'}>
                <div className='links__actions'>
                    <img src={closeIcon} alt='close icon' className='links__close' onClick={onHide} />
                    <a href={`${SERVER_URL}/auth/logout`} onClick={onLogout} >
                        <img src={logoutIcon} alt='logout icon' className='links__logout-mobile' />
                    </a>
                </div>
                <ul className='links__list'>
                    <li className='links__hidden-list-item' onClick={onAdd}>
                        <img src={addIcon} alt='add icon' className='links__add-tablet'  />
                        <p className='links__text'>New Content</p>
                    </li>
                    <li className='links__list-item'>
                        <NavLink
                            to='/'
                            exact
                            className='links__item'
                            activeClassName='links__item--active'
                        >
                            <img src={homeIcon} alt='home icon' className='links__icon' />
                            <p className='links__text'>Home</p>
                        </NavLink>
                    </li>
                    <li className='links__list-item'>
                        <NavLink
                            to='/notes'
                            className='links__item'
                            activeClassName='links__item--active'
                        >
                            <img src={notesIcon} alt='notes icon' className='links__icon' />
                            <p className='links__text'>Notes</p>
                        </NavLink>
                    </li>
                    <li className='links__list-item'>
                        <NavLink
                            to='/lists'
                            className='links__item'
                            activeClassName='links__item--active'
                        >
                            <img src={listsIcon} alt='lists icon' className='links__icon' />
                            <p className='links__text'>Lists</p>
                        </NavLink>
                    </li>
                    <li className='links__list-item'>
                        <NavLink
                            to='/details'
                            className='links__item'
                            activeClassName='links__item--active'
                        >
                            <img src={filesIcon} alt='files icon' className='links__icon' />
                            <p className='links__text'>Details</p>
                        </NavLink>
                    </li>
                    <li className='links__list-item' onClick={onOpen} >
                        <NavLink
                            to='/account'
                            className='links__item'
                            activeClassName='links__item--active'
                        >
                            <img src={accountIcon} alt='account icon' className='links__icon' />
                            <p className='links__text'>Account</p>
                        </NavLink>
                    </li>
                    <li className='links__hidden-list-item'>
                        <a href={`${SERVER_URL}/auth/logout`} onClick={onLogout} className='links__hidden-link'>
                            <img src={logoutIcon} alt='logout icon' className='links__logout-tablet' />
                            <p className='links__text'>Logout</p>
                        </a>
                    </li>
                </ul>
            </nav>
        </section>
    );
};

export default PageNav;
