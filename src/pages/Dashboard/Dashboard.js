import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import LoginPage from '../LoginPage/LoginPage';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageNav from '../../components/PageNav/PageNav';
import slideRight from '../../assets/icons/slide_right.svg';
import slideLeft from '../../assets/icons/slide_left.svg';
import sketch1 from '../../assets/illustrations/sketch-1.svg';
import sketch2 from '../../assets/illustrations/sketch-2.svg';
import sketch3 from '../../assets/illustrations/sketch-3.svg';
import sketch4 from '../../assets/illustrations/sketch-4.svg';
import sketch5 from '../../assets/illustrations/sketch-5.svg';
import './Dashboard.scss';

const Dashboard = ({ user, isLoggedIn, onLogout , authToken}) => {

    const [showNav, setShowNav] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const ref = useRef(null);
    let [slideNum, setSlideNum] = useState(0);

    const slideImages = [
        {
            url: '../../assets/illustrations/sketch-1.svg',
            caption: 'Slide 1'
        },
        {
            url: '../../assets/illustrations/sketch-2.svg',
            caption: 'Slide 2'
        },
        {
            url: '../../assets/illustrations/sketch-3.svg',
            caption: 'Slide 3'
        },
        {
            url: '../../assets/illustrations/sketch-4.svg',
            caption: 'Slide 4'
        },
        {
            url: '../../assets/illustrations/sketch-5.svg',
            caption: 'Slide 5'
        }
    ];

    const slideURL = [sketch1, sketch2, sketch3, sketch4, sketch5];

    const slideShow = () => {
        <Slide autoplay={false}>
            {
                slideImages.map((slideImage, index) => {
                    <div className='dashboard__hero-slide' key={index}>
                        <div className='dashboard__hero-background'>
                            <span>{slideImage.caption}</span>
                        </div>
                    </div>
                })
            }
        </Slide>
    };

    const handleSlideDown = () => {
        if(slideNum === 0) {
            return;
        }
        setSlideNum(slideNum--);
    };

    const handleSlideUp = () => {
        if(slideNum === 4) {
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
                        <div className='dashboard__add dashboard__add--tablet'>
                            <p className='dashboard__add-text' onClick={handleShowOptions} >
                                + 
                            </p>
                        </div>
                        <main className='dashboard'>
                            <div className='dashboard__hero'>
                                <img src={slideLeft} alt='hero slider' className='dashboard__hero-slider dashboard__hero-slider--left' onClick={handleSlideDown}/>
                                <img src={slideURL[slideNum]} alt='hero sketch' className='dashboard__hero-image'/>
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
                                <Link to='/file/add' className='dashboard__text'>
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
                        />
                    </>
            ) : (
                <LoginPage />
            )}
        </>
    );
};

export default Dashboard;
