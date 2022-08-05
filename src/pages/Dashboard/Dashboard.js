import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageFooter from '../../components/PageFooter/PageFooter';
import './Dashboard.scss';

const Dashboard = ({ user, isLoggedIn, onLogout , authToken}) => {

    const [showNav, setShowNav] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const ref = useRef(null);

    const handleShowNav = () => {
        setShowNav(true);
    };

    const handleHideNav = () => {
        setShowNav(false);
    };

    const handleShowOptions = () => {
        setShowOptions(true);
        setTimeout(() => {
            ref.current?.scrollIntoView({behavior: 'smooth'});
        }, 100)
        setShowNav(false);
    };

    // const handleHideOptions = () => {
    //     setShowOptions(false);
    // };

    return (
        <>
            {isLoggedIn ? (
                user && 
                    <>
                        <PageHeader 
                            user={user} 
                            onShow={handleShowNav} 
                        />
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
                        </main>
                        <PageFooter 
                            onShow={showNav} 
                            onHide={handleHideNav} 
                            onLogout={authToken && onLogout} 
                            onAdd={handleShowOptions}
                        />
                    </>
            ) : (
                <LoginPage />
            )}
        </>
    );
};

export default Dashboard;
