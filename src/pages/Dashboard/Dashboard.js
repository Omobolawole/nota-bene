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
                <p className='dashboard__add-text'>
                    + 
                </p>
            </div>
        </main>
    );
};

export default Dashboard;