import React, { useState } from 'react';
import axios from 'axios';
import closeIcon from '../../assets/icons/close.svg';
import './Item.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Item = ({ item, onDelete, listLabel, listId }) => {

    const [checked, setChecked] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isAxiosError, setIsAxiosError] = useState(false);
    
    const handleItemToggle = () => {
        console.log(item.checked, checked)

        if (checked) {
            setChecked(false);
        } else {
            setChecked(true);
        }

        item.checked = checked;

        updateStatus();

        console.log(item.checked, checked)
    };

    const updateStatus = () => {
        axios
            .put(`${SERVER_URL}/items/${listId}/item/${item.id}`, {
                label: listLabel,
                item: item.item,
                checked: item.checked,
                list_id: listId
            })
            .then(() => {
                setIsError(false);
                setIsSuccess(true);
            })
            .catch(() => {
                setIsAxiosError(true);
            });
    };

    const handleClick = () => {
        onDelete(item.id);
    };

    return (
        <div className='item'>
            {
                <li 
                    className='item__group'
                >
                    <label htmlFor='list-item' className='item__label'>
                        <input 
                            type='checkbox' 
                            className='item__input' 
                            id='list-item' 
                            // checked={!item.checked && 'checked'}
                            onChange={handleItemToggle} 
                        />
                        <p className={!checked ? 'item__text' : 'item__text item__text--checked'}>
                            {item.item}{item.checked}
                        </p>
                    </label>
                    <img src={closeIcon} alt='close icon' className='item__icon' onClick={handleClick} />
                </li>
            }
        </div>
    );
};

export default Item;
