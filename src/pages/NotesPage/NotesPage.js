import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import backIcon from '../../assets/icons/arrow_back.svg';
import Note from '../../components/Note/Note';
import './NotesPage.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const NotesPage = ({ user }) => {
    const [notesData, setNotesData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const history = useHistory();

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
    )

    const handleDelete = (id) => {
        axios
            .delete(`${SERVER_URL}/notes/${user.id}/note/${id}`)
            .then((response) => {
                console.log(response)
                
                // setIsDelete(true);
                // alert('Your note has been deleted.');
                updateNotes();
            })
            .catch((error) => {
                console.log(error)
                setIsError(true);
            })
    };

    const updateNotes = () => {
        if(user) {
            axios
            .get(`${SERVER_URL}/notes/${user.id}`)
            .then((response) => {
                console.log(response)
                const notesDetails = response.data;

                // setIsDelete(false);
                setNotesData(notesDetails.reverse());
            })
            .catch((error) => {
                console.log(error)
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
        <DndProvider backend={HTML5Backend}>
            <main className='notes'>
                <div className='notes__nav'>
                    <img src={backIcon} alt='back icon' className='notes__back' onClick={history.goBack}/>
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
                        notesData.map((note, index) => {
                        return <Note 
                                    key={note.id}
                                    index={index}
                                    note={note}
                                    moveListItem={moveListItem}
                                    onDelete={handleDelete}
                                    // isDelete={isDelete}
                                />
                        })
                    }
                </div>
            </main>
        </DndProvider>
    );
};

export default NotesPage;
