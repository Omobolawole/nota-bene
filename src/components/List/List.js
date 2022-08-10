import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';
import dateFormat from "dateformat";
import { useDrag, useDrop } from 'react-dnd';
import axios from 'axios';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import './List.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const List = ({ 
    index, 
    user, 
    list, 
    moveListItem, 
    onDelete, 
    // updateLists, 
    itemsStatuses, 
    itemsIds 
    }) => {

    const [listItemsData, setListItemsData] = useState([]);
    const [isError, setIsError] = useState(false);

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

    const updateStatus = (item) => {
        if (user && item) {
            axios
                .put(`${SERVER_URL}/lists/${user.id}/list/${itemsIds[item]}`, {
                    label: list.label,
                    item: item,
                    checked: itemsStatuses[item],
                    user_id: user.id
                }) 
                .then((response) => {
                    console.log(response);
                    setIsError(true);
                })
        }
    };

    const handleItemToggle = (item) => {
        // itemsStatuses[item] = !itemsStatuses[item];
        // updateStatus(item);
    };

    const handleItemsCheck = (items) => {
        // items.forEach(item => {
        //     itemsStatuses[item] = true;
        //     updateStatus(item);
        // });
    };

    const handleClick = () => {
        onDelete(list.id);
    };

    const updateListItems = () => {
        if(user) {
            axios
                .get(`${SERVER_URL}/items/${list.id}`)
                .then((response) => {
                    const listItemsDetails = response.data;
                    setListItemsData(listItemsDetails);
                })
                .catch(() => {
                    setIsError(true);
                });
        }
    };

    useEffect(() => {
        updateListItems();
    }, []);

    return (
        <article className={!isDragging ? 'list' : 'list list--dragging'} ref={dragDropRef}>
            <div className='list__heading'>
                <h3 className='list__label'>{list.label}</h3>
                <p className='list__date'>{date}</p>
            </div>
            <ul className='list__content'>
                {
                    listItemsData.map((item) => {
                        return (
                            <li 
                                key={uniqid()} 
                                className='list__group'
                            >
                                <input 
                                    type='checkbox' 
                                    className='list__input' 
                                    id='list-item' 
                                    onClick={() => handleItemToggle(item)} 
                                />
                                <label htmlFor='list-item' className='list__item'>
                                    <p className={!item.checked ? 'list__text' : 'list__text list__text--checked'}>
                                        {item.item}
                                    </p>
                                </label>
                            </li>
                        );
                    })
                }
            </ul>
            <button className='list__check-all' onClick={() => handleItemsCheck(list.items)} >Check All Boxes</button>
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