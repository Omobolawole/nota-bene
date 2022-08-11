import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageNav from '../../components/PageNav/PageNav';
import logoImage from '../../assets/logos/nb-logo-gradient.svg';
import slideRight from '../../assets/icons/slide_right.svg';
import slideLeft from '../../assets/icons/slide_left.svg';
import './Dashboard.scss';

const Dashboard = ({ 
        user, 
        isLoggedIn, 
        onSubmit,
        onError, 
        onAxiosError,
        onLogout , 
        authToken, 
        onOpen }) => {

    const [showNav, setShowNav] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const ref = useRef(null);
    let [slideNum, setSlideNum] = useState(0);

    const slideURL = [
        'http://localhost:8080/illustrations/sketch-1.svg', 
        'http://localhost:8080/illustrations/sketch-2.svg', 
        'http://localhost:8080/illustrations/sketch-3.svg', 
        'http://localhost:8080/illustrations/sketch-4.svg', 
        'http://localhost:8080/illustrations/sketch-5.svg'
    ];

    const slideCaption = [
        'NOTA BENE is an app tailored to your organizational needs', 
        'Note your thoughts with ease', 
        'Put down your lists without the pressure of deadlines', 
        'Keep important details you want to remember', 
        'Start organizing your life today!'
    ];

    const handleSlideDown = () => {
        setSlideNum(slideNum--);
        if(slideNum === -1) {
            return;
        }
        setSlideNum(slideNum--);
    };

    const handleSlideUp = () => {
        setSlideNum(slideNum++);
        if(slideNum === 5) {
            return;
        }
        setSlideNum(slideNum++);
    };
    
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

    return (
        <>
            {isLoggedIn ? (
                user && 
                    <>
                        <div className='dashboard__header'>
                            <Link to='/' >
                                <img src={logoImage} alt='brand logo' className='dashboard__logo'/>
                            </Link>
                            <h2 className='dashboard__title'>Nota Bene</h2>
                        </div>
                        <PageHeader 
                            user={user} 
                            onShow={handleShowNav} 
                        />
                        <div className='dashboard__add dashboard__add--tablet'>
                            <p className='dashboard__add-text' onClick={handleShowOptions} >
                                + 
                            </p>
                        </div>
                        <main className='dashboard'>
                            <div className='dashboard__hero'>
                                <img src={slideLeft} alt='hero slider' className='dashboard__hero-slider dashboard__hero-slider--left' onClick={handleSlideDown}/>
                                <div className='hero__welcome'>
                                    <img src={slideURL[slideNum]} alt='hero sketch' className='dashboard__hero-image'/>
                                    <p className='dashboard__features'>
                                        {slideCaption[slideNum]}
                                    </p>
                                </div>
                                <img src={slideRight} alt='hero slider' className='dashboard__hero-slider dashboard__hero-slider--right' onClick={handleSlideUp}/>
                            </div>
                            <div className='dashboard__actions'>
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
                            </div>
                            <div className='dashboard__add dashboard__add--mobile'>
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
                                <Link to='/detail/add' className='dashboard__text'>
                                    <button className='dashboard__button'>
                                            New Detail
                                    </button>
                                </Link>
                            </div>
                        </main>
                        <PageNav 
                            onShow={showNav} 
                            onHide={handleHideNav} 
                            onLogout={authToken && onLogout} 
                            onAdd={handleShowOptions}
                            onOpen={onOpen}
                        />
                    </>
            ) : (
                <LoginPage 
                    onSubmit={onSubmit}
                    onError={onError}
                    onAxiosError={onAxiosError}
                />
            )}
        </>
    );
};

export default Dashboard;
