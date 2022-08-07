import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";
// import uncheckedIcon from '../../assets/icons/check_box_empty.svg';
// import checkedIcon from '../../assets/icons/check_box_filled.svg';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';
// import { formatDate } from '../../utils/dateUtils';
import './List.scss';

const List = ({ list, onDelete }) => {
    // const [itemsData, setItemsData] = useState([]);
    // const [isChecked, setIsChecked] = useState(false)

    const date = dateFormat(list.updated_at, "mmmm dS, yyyy");

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
        <article className='list'>
            <h3 className='list__label'>{list.label}</h3>
            <p className='list__date'>{date}</p>
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