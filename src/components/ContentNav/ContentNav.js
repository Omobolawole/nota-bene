import { useHistory, Link } from 'react-router-dom';
import backIcon from '../../assets/icons/arrow_back.svg';
import './ContentNav.scss';

const ContentNav = ({ newSearch, handleSearchChange, type }) => {
    
    const history = useHistory();

    return (
        <div className='content__nav'>
            <img src={backIcon} alt='back icon' className='content__back' onClick={history.goBack}/>
            <div className='content__container'>
                <form className='content__form'>
                    <input 
                        type='text'
                        value={newSearch}
                        className='content__search-input'
                        placeholder='Search...'
                        onChange={handleSearchChange}
                    />
                </form>
                <Link to='/note/add' className='content__link'>
                    <div className='content__add'>
                        <p className='content__add-text' >
                            {`+ ${type}`}
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ContentNav;