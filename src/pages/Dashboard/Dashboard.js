import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageFooter from '../../components/PageFooter/PageFooter';
import './Dashboard.scss';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Dashboard = () => {
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [showNav, setShowNav] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const ref = useRef(null);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleShowNav = () => {
        setShowNav(true);
        handleHideOptions();
    };

    const handleHideNav = () => {
        setShowNav(false);
        handleShowOptions();
    };

    const handleShowOptions = () => {
        setShowOptions(true);
        setTimeout(() => {
            ref.current?.scrollIntoView({behavior: 'smooth'});
        }, 100)
    };

    const handleHideOptions = () => {
        setShowOptions(false);
    };

    useEffect(() => {
            axios
            .get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
            .then((response) => {
                setIsAuthenticating(false);
                setIsLoggedIn(true);
                setUserName(response.data.username.split(' ')[0])
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setIsAuthenticating(false);
                    setIsLoggedIn(false);
                } else {
                    console.log(`Error Authenticating: ${error}`);
                }
            });
    }, []);

    if (isAuthenticating && isLoggedIn ) {
        return <p>Getting Started...</p>
    }

    return (
        <>
            {isLoggedIn ? (
                userName && 
                    <>
                        <PageHeader username={userName} onShow={handleShowNav} />
                        <main className='dashboard'>
                            <div className='dashboard__hero'>
                                <p className='dashboard__hero-text'>
                                    Slidable Doodles + Sketches
                                </p>
                            </div>
                            <div className='dashboard__history'>
                                <p className='dashboard__history-text'>
                                    See your recent activities
                                </p>
                            </div>
                            <div className='dashboard__customize'>
                                <p className='dashboard__customize-text'>
                                    Customize your app
                                </p>
                            </div>
                            <div className='dashboard__add'>
                                <p className='dashboard__add-text' onClick={handleShowOptions} >
                                    + 
                                </p>
                            </div>
                            <div className={showOptions ? 'dashboard__buttons' : 'dashboard__buttons--hidden'} ref={ref} >
                                <Link to='/note/add' className='dashboard__text'>
                                    <button className='dashboard__button'>
                                            New Note
                                    </button>
                                </Link>
                                <Link to='/list/add' className='dashboard__text'>
                                    <button className='dashboard__button'>
                                            New List
                                    </button>
                                </Link>
                                <Link to='/file/add' className='dashboard__text'>
                                    <button className='dashboard__button'>
                                            New File
                                    </button>
                                </Link>
                            </div>

                            <a href={`${SERVER_URL}/auth/logout`}>
                                Log Out
                            </a>
                        </main>
                        <PageFooter onShow={showNav} onHide={handleHideNav} />
                    </>
            ) : (
                <LoginPage onLogin={handleLogin} />
            )}
        </>
    );
};

export default Dashboard;
