import { Link } from 'react-router-dom';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';
// import { formatDate } from '../../utils/dateUtils';
import './Note.scss';

const Note = ({ note }) => {
    return (
        <article className='note'>
            <h3 className='note__label'>{note.label}</h3>
            <p className='note__date'>{note.updated_at}</p>
            <p className='note__content'>{note.note}</p>
            <div className='note__icons'>
                <Link to={`/note/${note.id}/edit`}>
                    <img src={editIcon} alt='edit icon' className='note__icon' />
                </Link>
                <img src={deleteIcon} alt='delete icon' className='note__icon' />
            </div>
        </article>
    );
};

export default Note;