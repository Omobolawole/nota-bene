import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import ContentNav from '../../components/ContentNav/ContentNav';
import Detail from '../../components/Detail/Detail';
import './DetailsPage.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const DetailsPage = ({ user }) => {
    const [detailsData, setDetailsData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [newSearch, setNewSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    
    const handleSearchChange = (event) => {
        setNewSearch(event.target.value);
    };

    const filteredSearch  = !newSearch 
        ? detailsData
        : detailsData.filter((detail) => 
            detail.label.toLowerCase().includes(newSearch.toLowerCase())
    );

    const moveListItem = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = detailsData[dragIndex]
            const hoverItem = detailsData[hoverIndex]
  
            setDetailsData(details => {
                const updatedDetails = [...details]
                updatedDetails[dragIndex] = hoverItem
                updatedDetails[hoverIndex] = dragItem
                return updatedDetails
            })
        },
        [detailsData],
    )

    const handleDelete = (id) => {
        setShowModal(true);
        setSelectedContent(id);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const handleConfirmDelete = (id) => {
        axios
            .delete(`${SERVER_URL}/details/${user.id}/detail/${id}`)
            .then(() => {
                setShowModal(false);
                updateDetails();
            })
            .catch(() => {
                setIsError(true);
            })
    };

    const updateDetails = () => {
        if(user) {
            axios
            .get(`${SERVER_URL}/details/${user.id}`)
            .then((response) => {
                const detailsDetails = response.data;

                setDetailsData(detailsDetails.reverse());
            })
            .catch((error) => {
                console.log(error)
                setIsError(true);
            });
        }
    };

    useEffect(() => {
        updateDetails();
    }, []);

    if (!detailsData) {
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
                type='detail'
            />
            <DndProvider backend={HTML5Backend}>
                <main className='details'>
                    <ContentNav newSearch={newSearch} handleSearchChange={handleSearchChange} type='New Detail' />
                    <div className='details__container'>
                        {
                            !newSearch
                            ?
                            detailsData.map((detail, index) => {
                                return <Detail 
                                            key={detail.id}
                                            index={index}
                                            detail={detail}
                                            moveListItem={moveListItem}
                                            onDelete={handleDelete}
                                        />
                            })
                            :
                            filteredSearch.map((detail, index) => {
                                return <Detail 
                                            key={detail.id}
                                            index={index}
                                            detail={detail}
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

export default DetailsPage;