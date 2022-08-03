import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import backIcon from '../../assets/icons/arrow_back.svg';
import List from '../../components/List/List';
import './ListsPage.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ListsPage = () => {
    const [listsData, setListsData] = useState([]);
    const [isError, setIsError] = useState(false);

    const history = useHistory();

    const handleDelete = (id) => {
        axios
            .delete(`${SERVER_URL}/lists/2/list/${id}`)
            .then((response) => {
                console.log(response)
                updateLists();
            })
            .catch((error) => {
                console.log(error)
                setIsError(true);
            })
    };

    const updateLists = () => {
        axios
            .get(`${SERVER_URL}/lists/2`)
            .then((response) => {
                console.log(response)
                const listsDetails = response.data;

                setListsData(listsDetails);
            })
            .catch((error) => {
                console.log(error)
                setIsError(true);
            })
    };

    useEffect(() => {
        updateLists();
    }, []);

    if (!listsData) {
        return <p>Getting started...</p>
    }

    if (isError) {
        return <p>Loading...</p>
    }

    return (
        <main>
            <div className='lists__nav'>
                <img src={backIcon} alt='back icon' className='lists__back' onClick={history.goBack}/>
                <Link to='/list/add' className='lists__link'>
                    <div className='lists__add'>
                        <p className='lists__add-text' >
                            + New List
                        </p>
                    </div>
                </Link>
            </div>
            <div className='lists__container'>
                {
                    listsData.map((list) => {
                       return <List 
                                key={list.id}
                                list={list}
                                onDelete={handleDelete}
                              />
                    })
                }
            </div>
        </main>
    );
};

export default ListsPage;