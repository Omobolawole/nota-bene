import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";
import { useDrag, useDrop } from 'react-dnd';
// import uncheckedIcon from '../../assets/icons/check_box_empty.svg';
// import checkedIcon from '../../assets/icons/check_box_filled.svg';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';
// import { formatDate } from '../../utils/dateUtils';
import './List.scss';

const List = ({ index, list, moveListItem, onDelete }) => {
    // const [itemsData, setItemsData] = useState([]);
    // const [isChecked, setIsChecked] = useState(false)

    const date = dateFormat(list.updated_at, "mmmm dS, yyyy");

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

    // const handelCheck = () => {
    //     setIsChecked(true);
    // };
    
    // const handelUncheck = () => {
    //     setIsChecked(false);
    // };

    const handleClick = () => {
        onDelete(list.id);
    };

    // const listArray = JSON.parse(list.list);

    return (
        <article className={!isDragging ? 'list' : 'list list--dragging'} ref={dragDropRef}>
            <div className='list__heading'>
                <h3 className='list__label'>{list.label}</h3>
                <p className='list__date'>{date}</p>
            </div>
            <ul className='list__content'>
                {
                    <li className='list__group' key={list.id} >
                        {/* <img src={isChecked ? checkedIcon : uncheckedIcon} alt='checkbox icon' className='list__icon' onClick={handelCheck} /> */}
                        <label htmlFor='list-item' className='list__item'>
                            <input type='checkbox' className='list__input' id='list-item'/>
                            <p className='list__text'>
                                {list.item}
                            </p>
                        </label>
                    </li>
                }
            </ul>
            {/* <button className='list__check-all' >Check All</button> */}
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