import { Link } from 'react-router-dom';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';
// import { formatDate } from '../../utils/dateUtils';
import './List.scss';

const List = ({ list, onDelete }) => {
    const handleClick = () => {
        onDelete(list.id);
    }

    return (
        <article className='list'>
            <h3 className='list__label'>{list.label}</h3>
            <p className='list__date'>{list.updated_at}</p>
            <p className='list__content'>{list.list}</p>
            <div className='list__icons'>
                <Link to={`/list/${list.id}/edit`}>
                    <img src={editIcon} alt='edit icon' className='list__icon' />
                </Link>
                <img src={deleteIcon} alt='delete icon' className='list__icon' onClick={handleClick} />
            </div>
        </article>
    );
};

export default List;