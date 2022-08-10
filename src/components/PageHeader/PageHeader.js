import React, { useEffect, useState } from 'react';
import dateFormat from "dateformat";
import menuIcon from '../../assets/icons/menu.svg';
import './PageHeader.scss';

const PageHeader = ({ user, onShow }) => {
    const [newSearch, setNewSearch] = useState('');

    const now = new Date();

    const date = dateFormat(now, "dddd, mmmm dS, yyyy");

    const handleSearchChange = (event) => {
        setNewSearch(event.target.value);
    };

    // const filteredSearch  = () => {

    // }
    
    return (
        <header className='header'>
            <nav className='header__nav'>
                <img src={menuIcon} alt='menu icon' className='header__menu' onClick={onShow} />
                <form className='header__form'>
                    <input 
                        type='text'
                        value={newSearch}
                        className='header__search-input'
                        placeholder='Search...'
                        onChange={handleSearchChange}
                    />
                </form>
            </nav>
            <div className='header__title'>
                <h3 className='header__greeting'>{`Welcome back ${user.username.split(' ')[0]}!`}</h3>
                <p className='header__date'>{date}</p>
            </div>
        </header>
    );
};

export default PageHeader;
