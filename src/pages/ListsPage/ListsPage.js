import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import ContentNav from '../../components/ContentNav/ContentNav';
import List from '../../components/List/List';
import './ListsPage.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ListsPage = ({ user }) => {
    const [listsData, setListsData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [newSearch, setNewSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);

    const handleSearchChange = (event) => {
        setNewSearch(event.target.value);
    };

    const filteredSearch  = !newSearch 
        ? listsData
        : listsData.filter((list) => 
            list.label.toLowerCase().includes(newSearch.toLowerCase())
    );

    const moveListItem = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = listsData[dragIndex];
            const hoverItem = listsData[hoverIndex];
  
            setListsData(lists => {
                const updatedLists = [...lists]
                updatedLists[dragIndex] = hoverItem
                updatedLists[hoverIndex] = dragItem
                return updatedLists
            });
        },
        [listsData],
    );

    const handleDelete = (id) => {
        setShowModal(true);
        setSelectedContent(id);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const handleConfirmDelete = (id) => {
        axios
            .delete(`${SERVER_URL}/lists/${user.id}/list/${id}`)
            .then(() => {
                setShowModal(false);
                updateLists();
            })
            .catch(() => {
                setIsError(true);
            })
    };

    const updateLists = () => {
        if(user) {
            axios
                .get(`${SERVER_URL}/lists/${user.id}`)
                .then((response) => {
                    const listsDetails = response.data;
                    setListsData(listsDetails.reverse());
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
        <>
            <DeleteModal 
                show={showModal}
                onClose={handleCancel}
                onConfirmDelete={handleConfirmDelete}
                selectedContent={selectedContent}
                type='list'
            />
            <DndProvider backend={HTML5Backend}>
                <main className='lists'>
                    <ContentNav newSearch={newSearch} handleSearchChange={handleSearchChange} type='New List' />
                    <div className='lists__container'>
                        {   
                            !newSearch 
                            ? 
                            listsData.map((list, index) => {
                                return <List 
                                            key={list.id}
                                            index={index}
                                            user={user}
                                            list={list}
                                            moveListItem={moveListItem}
                                            onDelete={handleDelete}
                                        />
                            })
                            :
                            filteredSearch.map((list, index) => {
                                return <List 
                                            key={list.id}
                                            index={index}
                                            user={user}
                                            list={list}
                                            moveListItem={moveListItem}
                                            onDelete={handleDelete}
                                        />
                            })
                        }
                    </div>
                </main>
            </DndProvider>
        </>
        
    );
};

export default ListsPage;