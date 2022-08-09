import dateFormat from "dateformat";
import menuIcon from '../../assets/icons/menu.svg';
import searchIcon from '../../assets/icons/search.svg';
import './PageHeader.scss';

const PageHeader = ({ user, onShow }) => {
    const now = new Date();

    const date = dateFormat(now, "dddd, mmmm dS, yyyy");
    
    return (
        <header className='header'>
            <nav className='header__nav'>
                <img src={menuIcon} alt='menu icon' className='header__menu' onClick={onShow} />
                <img src={searchIcon} alt='search icon' className='header__search' />
            </nav>
            <div className='header__title'>
                <h3 className='header__greeting'>{`Welcome ${user.username.split(' ')[0]}!`}</h3>
                <p className='header__date'>{date}</p>
            </div>
        </header>
    );
};

export default PageHeader;
