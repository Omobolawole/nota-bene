import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageFooter from '../../components/PageFooter/PageFooter';
import './Dashboard.scss';

const Dashboard = () => {
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
    };

    const handleHideOptions = () => {
        setShowOptions(false);
    };

    return (
        <>
            <PageHeader onShow={handleShowNav} />
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
                                Notes
                        </button>
                    </Link>
                    <Link to='/list/add' className='dashboard__text'>
                        <button className='dashboard__button'>
                                Lists
                        </button>
                    </Link>
                    <Link to='/file/add' className='dashboard__text'>
                        <button className='dashboard__button'>
                                Files
                        </button>
                    </Link>
                </div>
            </main>
            <PageFooter onShow={showNav} onHide={handleHideNav} />
        </>
    );
};

export default Dashboard;