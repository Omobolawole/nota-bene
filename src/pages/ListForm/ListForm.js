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
    const [isAxiosError, setIsAxiosError] = useState(false);
    const { listId } = useParams();

    const history = useHistory();

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

        };

        if (status === 'edit') {
            axios
                .put(`${SERVER_URL}/lists${user.id}/list/${listId}`, {
                    label: listLabel,
                    item: listContent,
                    user_id: user.id
                }) 
                .then((response) => {
                    console.log(response)
                    setIsError(false);
                    setIsSuccess(true);

                    setTimeout(() => {
                        history.goBack();
                    }, 2000)
                })
                .catch((response) => {
                    console.log(response)
                    setIsAxiosError(true);
                });

            setListLabel('');
            setListContent('');
        };

        if (status === 'add') {
            axios
                .post(`${SERVER_URL}/lists`, {
                    label: listLabel,
                    item: listContent,
                    user_id: user.id
                }) 
                .then((response) => {
                    console.log(response)
                    setIsError(false);
                    setIsSuccess(true);

                    setTimeout(() => {
                        history.goBack();
                    }, 2000)
                })
                .catch(() => {
                    setIsAxiosError(true);
                });

            console.log(listContent)

            setListLabel('');
            setListContent('');
        };
    };

    useEffect(() => {
        if (status === 'edit' && user ) {
            axios
                .get(`${SERVER_URL}/lists/${user.id}/list/${listId}`)
                .then((response) => {
                    const selectedList = response.data;
  
                    setListLabel(selectedList.label);
                    setListContent(selectedList.item);
                })
                .catch((error) => {
                    console.log(error)
                    setIsAxiosError(true);
                });
        }
    }, [listId]);

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
                    placeholder='Add a label to your item'
                    className={!isError ? 'list-form__label' : 'list-form__label list-form__label--error'}
                    name='listLabel'
                    value={listLabel}
                    onChange={handleChangeLabel}
                />

                <label className='list-form__title'>
                    Item
                </label>

                <input
                    type='text'
                    placeholder='Add your item'
                    className={!isError ? 'list-form__content' : 'list-form__content list-form__content--error'}
                    name='listContent'
                    value={listContent}
                    onChange={handleChangeContent}
                />

                {isError && <span className='list-form__error'>All fields are required.</span>}
                {isSuccess && <span className='list-form__success'>Item {status==='add' ? 'added' : 'updated'} successfully!</span>}
                {isAxiosError && <span className='list-form__request'>Please try again later.</span>}

                <div className='list-form__buttons'>
                    <button className='list-form__button' onClick={handleCancel} >
                        Cancel
                    </button>
                    <button className='list-form__button' onClick={handleSubmit} >
                        {status === 'add' ? 'Add Item' : 'Update Item'}
                    </button>
                </div>
            </form>
        </>
    );
};

export default ListForm;