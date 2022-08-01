import { Link } from 'react-router-dom';
import menuIcon from '../../assets/icons/menu.svg';
import searchIcon from '../../assets/icons/search.svg';
import './PageHeader.scss';

const PageHeader = () => {
    return (
        <header className='header'>
            <img src={menuIcon} alt='menu icon' className='header__menu' />
            {/* <Link to='/' className='header__logo'>
                <img src={logo} alt='nota-bene logo' />
            </Link> */}
            <img src={searchIcon} alt='search icon' className='header__search' />
            <h3 className='header__greeting'>Welcome back Anastasia!</h3>
            <p className='header__date'>Thursday, 13th May, 2022</p>
            {/* <h2 className='header__title'>My Dashboard</h2> */}
        </header>
    );
};

export default PageHeader;