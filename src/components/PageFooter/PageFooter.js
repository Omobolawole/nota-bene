import { NavLink } from 'react-router-dom';
import closeIcon from '../../assets/icons/close.svg';
import homeIcon from '../../assets/icons/home.svg';
import notesIcon from '../../assets/icons/notes.svg';
import listsIcon from '../../assets/icons/lists.svg';
import filesIcon from '../../assets/icons/files.svg';
import accountIcon from '../../assets/icons/account.svg';
import './PageFooter.scss';

const PageFooter = ({ onShow, onHide }) => {
    return (
        <footer className={onShow ? 'footer' : 'footer--hidden'}>
            <nav className='footer__nav'>
                <img src={closeIcon} alt='close icon' className='footer__close' onClick={onHide} />
                <ul className='footer__list'>
                    <li>
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
                    <li>
                        <NavLink
                            to='/notes'
                            className='footer__item'
                            activeClassName='footer__item--active'
                        >
                            <img src={notesIcon} alt='notes icon' className='footer__icon' />
                            <p className='footer__text'>Notes</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/lists'
                            className='footer__item'
                            activeClassName='footer__item--active'
                        >
                            <img src={listsIcon} alt='lists icon' className='footer__icon' />
                            <p className='footer__text'>Lists</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/files'
                            className='footer__item'
                            activeClassName='footer__item--active'
                        >
                            <img src={filesIcon} alt='files icon' className='footer__icon' />
                            <p className='footer__text'>Files</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/account'
                            className='footer__item'
                            activeClassName='footer__item--active'
                        >
                            <img src={accountIcon} alt='account icon' className='footer__icon' />
                            <p className='footer__text'>Account</p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

export default PageFooter;
