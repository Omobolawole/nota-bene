import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";
import { useDrag, useDrop } from 'react-dnd';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import './Note.scss';

const Note = ({ index, note, moveListItem, onDelete }) => {

    const date = dateFormat(note.updated_at, "mmmm dS, yyyy");

    const [{ isDragging }, dragRef] = useDrag({
        type: 'item',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [spec, dropRef] = useDrop({
        accept: 'item',
        hover: (item, monitor) => {
            const dragIndex = item.index
            const hoverIndex = index
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

            moveListItem(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    });

    const ref = useRef(null);
    const dragDropRef = dragRef(dropRef(ref));

    const handleClick = () => {
        onDelete(note.id);
    };

    // const opacity = isDragging ? 0 : 1

    return (
        <article className={!isDragging ? 'note' : 'note note--dragging'} ref={dragDropRef} >
            <div className='note__heading'>
                <h3 className='note__label'>{note.label}</h3>
                <p className='note__date'>{date}</p>
            </div>
            <p className='note__content'>{note.note}</p>
            <div className='note__icons'>
                <Link to={`/note/${note.id}/edit`}>
                    <img src={editIcon} alt='edit icon' className='note__icon' />
                </Link>
                <img src={deleteIcon} alt='delete icon' className='note__icon' onClick={handleClick} />
            </div>
        </article>
    );
};

export default Note;
