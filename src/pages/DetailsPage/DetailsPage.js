import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import backIcon from '../../assets/icons/arrow_back.svg';
import Detail from '../../components/Detail/Detail';
import './DetailsPage.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const DetailsPage = ({ user }) => {
    const [detailsData, setDetailsData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [newSearch, setNewSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedNote, setSelecetedNote] = useState(null);

    const history = useHistory();
    
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
        setSelecetedNote(id);
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
                selectedNote={selectedNote}
                type='detail'
            />
            <DndProvider backend={HTML5Backend}>
                <main className='details'>
                    <div className='details__nav'>
                        <img src={backIcon} alt='back icon' className='details__back' onClick={history.goBack}/>
                        <form className='details__form'>
                            <input 
                                type='text'
                                value={newSearch}
                                className='details__search-input'
                                placeholder='Search...'
                                onChange={handleSearchChange}
                            />
                        </form>
                        <Link to='/detail/add' className='details__link'>
                            <div className='details__add'>
                                <p className='details__add-text' >
                                    + New Detail
                                </p>
                            </div>
                        </Link>
                    </div>
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