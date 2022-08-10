import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import uniqid from 'uniqid';
import axios from 'axios';
import backIcon from '../../assets/icons/arrow_back.svg';
import List from '../../components/List/List';
import './ListsPage.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ListsPage = ({ user }) => {
    const [listsData, setListsData] = useState([]);
    const [itemsStatuses, setItemsStatuses] = useState({});
    const [itemsIds, setItemsIds] = useState({});
    const [isError, setIsError] = useState(false);

    const history = useHistory();

    const moveListItem = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = listsData[dragIndex]
            const hoverItem = listsData[hoverIndex]
  
            setListsData(notes => {
                const updatedNotes = [...notes]
                updatedNotes[dragIndex] = hoverItem
                updatedNotes[hoverIndex] = dragItem
                return updatedNotes
            })
        },
        [listsData],
    )

    const handleDelete = (id) => {
        axios
            .delete(`${SERVER_URL}/lists/${user.id}/list/${id}`)
            .then(() => {
                updateLists();
            })
            .catch((error) => {
                console.log(error)
                setIsError(true);
            })
    };

    const updateLists = () => {
        if(user) {
            axios
                .get(`${SERVER_URL}/lists/${user.id}`)
                .then((response) => {
                    const listsDetails = response.data;

                    const labels = {};
                    const statuses = {};
                    const Ids = {};
                    const updatedListsDetails = [];

                    listsDetails.forEach(item => {
                        if (!labels[item.label]) {
                            labels[item.label] = [];
                        };
                    });

                    listsDetails.forEach(item => {
                        if (Object.keys(labels).includes(item.label)) {
                            labels[item.label].push(item.item);
                        };
                    });

                    listsDetails.forEach(item => {
                        statuses[item.item] = item.status;
                    });

                    listsDetails.forEach(item => {
                        Ids[item.item] = item.id;
                    });

                    Object.keys(labels).forEach((key) => {
                        const newItem = {
                            id: uniqid(),
                            items: labels[key],
                            label: key,
                            updated_at: new Date(),
                            user_id: user.id
                        };
                        updatedListsDetails.push(newItem);
                    });

                    setListsData(updatedListsDetails);
                    setItemsStatuses(statuses);
                    setItemsIds(Ids);
                })
                .catch(() => {
                    setIsError(true);
                });
        }
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
        <DndProvider backend={HTML5Backend}>
            <main className='lists'>
                <div className='lists__nav'>
                    <img src={backIcon} alt='back icon' className='lists__back' onClick={history.goBack}/>
                    <Link to='/list/add' className='lists__link'>
                        <div className='lists__add'>
                            <p className='lists__add-text' >
                                + New Item
                            </p>
                        </div>
                    </Link>
                </div>
                <div className='lists__container'>
                    {
                        listsData.map((list, index) => {
                        return <List 
                                    key={list.id}
                                    index={index}
                                    user={user}
                                    list={list}
                                    moveListItem={moveListItem}
                                    onDelete={handleDelete}
                                    updateLists={updateLists}
                                    itemsStatuses={itemsStatuses}
                                    itemsIds={itemsIds}
                                />
                        })
                    }
                </div>
            </main>
        </DndProvider>
    );
};

export default ListsPage;