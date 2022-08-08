import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";
import { useDrag, useDrop } from 'react-dnd';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import './Detail.scss';

const Detail = ({ index, detail, moveListItem, onDelete }) => {

    const date = dateFormat(detail.updated_at, "mmmm dS, yyyy");

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
        onDelete(detail.id);
    };

    return (
        <article className={!isDragging ? 'detail' : 'detail detail--dragging'} ref={dragDropRef} >
            <div className='detail__heading'>
                <h3 className='detail__label'>{detail.label}</h3>
                <p className='detail__date'>{date}</p>
            </div>
            <p className='detail__content'>{detail.detail}</p>
            <div className='detail__icons'>
                <Link to={`/detail/${detail.id}/edit`}>
                    <img src={editIcon} alt='edit icon' className='detail__icon' />
                </Link>
                <img src={deleteIcon} alt='delete icon' className='detail__icon' onClick={handleClick} />
            </div>
        </article>
    );
};

export default Detail;