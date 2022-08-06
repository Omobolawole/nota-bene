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
    const [objectKeys, setObjectKeys] = useState([]);
    const [objectContent, setObjectContent] = useState({});
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isAxiosError, setIsAxiosError] = useState(false);
    const { listId } = useParams();

    const history = useHistory();

    let previousLength = 0;

    const handleInput = (event) => {
        const bullet = `\u2022  `;
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

        };

        // const updatedList = JSON.stringify(listContent);

        // const updatedList = listContent.split(' ');

        // updatedList.map((item ,index) => {
        //     console.log(item);
        // });
        
        const updatedListObject = {};

        const updatedList = listContent.split('--');

        const filteredList = updatedList.filter(char => char.length > 2);

        for (let i = 0; i > filteredList.length; i++) {
            updatedListObject[`item ${i + 1}`] = filteredList[i];
        };


        // filteredList.map((item, index) => updatedListObject[`item ${index + 1}`] === item);

        console.log(updatedListObject)

        if (status === 'edit') {

        };

        if (status === 'add') {
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
                    
                    console.log(response)
                    const selectedList = response.data;
                    setListLabel(selectedList.label);


                    const listsObject = JSON.parse(selectedList.list);
                    setObjectContent(listsObject);


                    const listsKeys = Object.keys(listsObject);
                    setObjectKeys(listsKeys);


                    const listsItems = listsKeys.map((key) => {
                        return (`-- ${listsObject[key]} --\n`);
                    });
                    setListContent(listsItems.join(' '));


                    // listsKeys.forEach((item) => {
                    //    console.log(listsObject[item]);
                    // });




                    // const listsKeys = Object.keys(listsObject);
                    // const listsItems = [];

                    
                    // const listsItems = listsKeys.map((item) => {
                    //     return (`•  ${listsObject[item]}\n`);
                    // })

                    // listsKeys.forEach((item) => {
                    //    return listsItems.push(`•  ${listsObject[item]}\n`);
                    // })

                    // setListContent(listsItems.join(' '))
                    // console.log(listsObject) 
                })
                .catch((error) => {
                    console.log(error)
                    setIsAxiosError(true);
                });
        }
    }, [listId]);

    // if (!listContent && status === 'edit') {
    //     return;
    // }

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
                    className={!isError ? 'list-form__label' : 'list-form__label list-form__label--error'}
                    name='listLabel'
                    value={listLabel}
                    onChange={handleChangeLabel}
                />

                {/* <p className='list-form__title'>
                    List
                </p>
                <ul className='list-form__list'>
                    {
                        listContent.map((item, index) => {
                            return (
                                <li className='list-form__item' key={index} >
                                    <label htmlFor='list-item' className='list__item'>
                                        <input type='checkbox' className='list__input' id='list-item' />
                                        <p className='list-form__text'>
                                            {item}
                                        </p>
                                    </label>
                                </li>
                            );
                        })
                    }
                </ul>
                <label className='list-form__title'>
                    New Item
                </label>
                <input 
                    type='text'
                    placeholder='Add a new item to your list'
                    className='list-form__label'
                    name='listLabel'
                    value={listLabel}
                    onChange={handleChangeLabel}
                    onInput={handleInput}
                    onFocus={handleInput}
                    onSubmit={console.log('yes')}
                /> */}

                <label className='list-form__title'>
                    List
                </label>

                <textarea
                    type='text'
                    placeholder='Add your list'
                    className={!isError ? 'list-form__content' : 'list-form__content list-form__content--error'}
                    name='listContent'
                    cols='10'
                    wrap='hard'
                    value={listContent}
                    onChange={handleChangeContent}
                    onInput={handleInput}
                    onFocus={handleInput}
                />

                {isError && <span className='list-form__error'>All fields are required.</span>}
                {isSuccess && <span className='list-form__success'>List {status==='add' ? 'added' : 'updated'} successfully!</span>}
                {isAxiosError && <span className='list-form__request'>Please try again later.</span>}

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