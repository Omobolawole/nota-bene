import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import backIcon from '../../assets/icons/arrow_back.svg';
import homeIcon from '../../assets/icons/home.svg';
import './ListForm.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ListForm = ({ user, status }) => {
    const [listLabel, setListLabel] = useState('');
    const [listContent, setListContent] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { listId } = useParams();

    const history = useHistory();

    let previousLength = 0;

    const handleInput = (event) => {
        const bullet = "\u2022";
        const newLength = event.target.value.length;
        const characterCode = event.target.value.substr(-1).charCodeAt(0);

        if (newLength > previousLength) {
            if (characterCode === 10) {
                event.target.value = `${event.target.value}${bullet}`;
            } else if (newLength === 1) {
                event.target.value = `${bullet}  ${event.target.value}`;
            }
        }
    
        previousLength = newLength;
    }

    const handleChangeLabel = (event) => {
        setListLabel(event.target.value);
    };

    const handleChangeContent = (event) => {
        setListContent(event.target.value);
    };

    const isFormValid = () => {
        if (!listLabel || !listContent) {
            return false;
        }
        return true;
    };

    const handleCancel = (event) => {
        event.preventDefault();
        history.goBack();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (!isFormValid()) {
            setIsError(true);
            return;
        }

        
        // const updatedList = listContent.split(' ').replaceAll('•', '');

        // listContent.map((item ,index) => {

        // });

        // const listObject = {};
 
        axios
            .post(`${SERVER_URL}/lists`, {
                label: listLabel,
                list: listContent,
                user_id: user.id
            }) 
            .then((response) => {
                console.log(response)
                setIsError(false);
                setIsSuccess(true);
            })
            .catch(() => {
                setIsError(true);
            });

        console.log(listContent)

        setListLabel('');
        setListContent('');
    };

    useEffect(() => {
        if (status === 'edit') {
            axios
                .get(`${SERVER_URL}/lists/${user.id}/list/${listId}`)
                .then((response) => {
                    
                    console.log(response)
                    const selectedList = response.data;

                    setListLabel(selectedList.label);

                    const listsObject = JSON.parse(selectedList.list);
                    const listsKeys = Object.keys(listsObject);
                    const listsItems = [];

                    listsKeys.forEach((item) => {
                       return listsItems.push(listsObject[item]);
                    })

                    // const newListsItems = listItems.map((item) => {
                    //     return `• ${item} \n`;
                    // });

                    // setListContent(newListsItems.join(' '));

                    setListContent(listsItems)
                })
                .catch((error) => {
                    console.log(error)
                    setIsError(true);
                });
        }
    }, [listId]);

    if (!listContent) {
        return;
    }

    return (
        <>
            <div className='list-form__nav'>
                <img src={backIcon} alt='back icon' className='list-form__icon' onClick={history.goBack} />
                <Link to='/' className='list-form__link'>
                    <img src={homeIcon} alt='home icon' className='list-form__icon' />
                </Link>
            </div>
            <form className='list-form__fields'>
                <label className='list-form__title'>
                    Label
                </label>
                <input 
                    type='text'
                    placeholder='Add a label to your list'
                    className='list-form__label'
                    name='listLabel'
                    value={listLabel}
                    onChange={handleChangeLabel}
                />

                <label className='list-form__title'>
                    List
                </label>
                    <ul className='list__content'>
                        {
                            listContent.map((item, index) => {
                                return (
                                    <li className='list__group' key={index} >
                                        <label htmlFor='list-item' className='list__item'>
                                            <input type='checkbox' className='list__input' id='list-item' />
                                            <p className='list__text'>
                                                {item}
                                            </p>
                                        </label>
                                    </li>
                                );
                            })
                        }
                    </ul>
                <textarea
                    type='text'
                    placeholder='Add your list'
                    className='list-form__content'
                    name='listContent'
                    value={listContent}
                    onChange={handleChangeContent}
                    onInput={handleInput}
                    onFocus={handleInput}
                />

                <div className='list-form__buttons'>
                    <button className='list-form__button' onClick={handleCancel} >
                        Cancel
                    </button>
                    <button className='list-form__button' onClick={handleSubmit} >
                        {status === 'add' ? 'Add List' : 'Update List'}
                    </button>
                </div>
            </form>
        </>
    );
};

export default ListForm;