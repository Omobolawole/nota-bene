import { Link } from 'react-router-dom';
import './Dashboard.scss';

const Dashboard = () => {
    return (
        <main className='dashboard'>
            <div className='dashboard__hero'>
                <p className='dashboard__hero-text'>
                    Slidable Doodles + Human Sketches
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
                <Link to='/note/add' className='dashboard__add-link'>
                    <p className='dashboard__add-text'>
                        + 
                    </p>
                </Link>
            </div>
        </main>
    );
};

export default Dashboard;