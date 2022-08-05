import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import uncheckedIcon from '../../assets/icons/check_box_empty.svg';
// import checkedIcon from '../../assets/icons/check_box_filled.svg';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';
// import { formatDate } from '../../utils/dateUtils';
import './List.scss';

const List = ({ list, onDelete }) => {
    // const [itemsData, setItemsData] = useState([]);
    const [isChecked, setIsChecked] = useState(false)

    const handelCheck = () => {
        setIsChecked(true);
    };
    
    const handelUncheck = () => {
        setIsChecked(false);
    };

    const handleClick = () => {
        onDelete(list.id);
    };

    const listsObject = JSON.parse(list.list);
    const listItems = Object.keys(listsObject);

    return (
        <article className='list'>
            <h3 className='list__label'>{list.label}</h3>
            <p className='list__date'>{list.updated_at}</p>
            <ul className='list__content'>
                {/* {
                    listItems.map((item, index) => {
                        return (
                            <div className='list__group' key={index} >
                                <img src={isChecked ? checkedIcon : uncheckedIcon} alt='checkbox icon' className='list__icon' onClick={handelCheck} />
                                <li className='list__item'>{listsObject[item]}</li>
                            </div>
                        );
                    })
                } */}
                {
                    listItems.map((item, index) => {
                        return (
                            <li className='list__group' key={index} >
                                {/* <img src={isChecked ? checkedIcon : uncheckedIcon} alt='checkbox icon' className='list__icon' onClick={handelCheck} /> */}
                                <label className='list__item'>
                                    <input type='checkbox' className='list__input'/>
                                    <p className='list__text'>
                                        {listsObject[item]}
                                    </p>
                                </label>
                            </li>
                        );
                    })
                }
            </ul>
            <buttton className='list__check-all' >Check All</buttton>
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