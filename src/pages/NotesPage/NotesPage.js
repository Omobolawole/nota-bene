import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import backIcon from '../../assets/icons/arrow_back.svg';
import Note from '../../components/Note/Note';
import './NotesPage.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const NotesPage = ({ user }) => {
    const [notesData, setNotesData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [newSearch, setNewSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedNote, setSelecetedNote] = useState(null);

    const history = useHistory();

    const handleSearchChange = (event) => {
        setNewSearch(event.target.value);
    };

    const filteredSearch  = !newSearch 
        ? notesData
        : notesData.filter((note) => 
            note.label.toLowerCase().includes(newSearch.toLowerCase())
    );

    const moveListItem = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = notesData[dragIndex]
            const hoverItem = notesData[hoverIndex]
  
            setNotesData(notes => {
                const updatedNotes = [...notes]
                updatedNotes[dragIndex] = hoverItem
                updatedNotes[hoverIndex] = dragItem
                return updatedNotes
            })
        },
        [notesData],
    );

    const handleDelete = (id) => {
        setShowModal(true);
        setSelecetedNote(id);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const handleConfirmDelete = (id) => {
        axios
            .delete(`${SERVER_URL}/notes/${user.id}/note/${id}`)
            .then(() => {
                setShowModal(false);
                updateNotes();
            })
            .catch(() => {
                setIsError(true);
            })
    };

    const updateNotes = () => {
        if(user) {
            axios
            .get(`${SERVER_URL}/notes/${user.id}`)
            .then((response) => {
                const notesDetails = response.data;
                setNotesData(notesDetails.reverse());
            })
            .catch(() => {
                setIsError(true);
            });
        }
    };

    useEffect(() => {
        updateNotes();
    }, []);

    if (!notesData) {
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
                type='note'
            />
            <DndProvider backend={HTML5Backend}>
                <main className='notes'>
                    <div className='notes__nav'>
                        <img src={backIcon} alt='back icon' className='notes__back' onClick={history.goBack}/>
                        <form className='notes__form'>
                            <input 
                                type='text'
                                value={newSearch}
                                className='notes__search-input'
                                placeholder='Search...'
                                onChange={handleSearchChange}
                            />
                        </form>
                        <Link to='/note/add' className='notes__link'>
                            <div className='notes__add'>
                                <p className='notes__add-text' >
                                    + New Note
                                </p>
                            </div>
                        </Link>
                    </div>
                    <div className='notes__container'>
                        {
                            !newSearch 
                            ? 
                            notesData.map((note, index) => {
                                return <Note 
                                            key={note.id}
                                            index={index}
                                            note={note}
                                            moveListItem={moveListItem}
                                            onDelete={handleDelete}
                                        />
                            })
                            :
                            filteredSearch.map((note, index) => {
                                return <Note 
                                            key={note.id}
                                            index={index}
                                            note={note}
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

export default NotesPage;
