import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from '../../components/Note/Note';
import './NotesPage.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const NotesPage = () => {
    const [notesData, setNotesData] = useState([]);
    const [isError, setIsError] = useState(false);

    const handleDelete = (id) => {
        axios
            .delete(`${SERVER_URL}/notes/2/note/${id}`)
            .then((response) => {
                console.log(response)
                updateNotes();
            })
            .catch((error) => {
                console.log(error)
                setIsError(true);
            })
    };

    const updateNotes = () => {
        axios
            .get(`${SERVER_URL}/notes/2`)
            .then((response) => {
                console.log(response)
                const notesDetails = response.data;

                setNotesData(notesDetails);
            })
            .catch((error) => {
                console.log(error)
                setIsError(true);
            })
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
        <main className='notes'>
            <div className='notes__container'>
                {
                    notesData.map((note) => {
                       return <Note 
                                key={note.id}
                                note={note}
                                onDelete={handleDelete}
                              />
                    })
                }
            </div>
        </main>
    );
};

export default NotesPage;
