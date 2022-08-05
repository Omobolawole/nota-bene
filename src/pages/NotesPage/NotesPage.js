import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import backIcon from '../../assets/icons/arrow_back.svg';
import Note from '../../components/Note/Note';
import './NotesPage.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const NotesPage = ({ user }) => {
    const [notesData, setNotesData] = useState([]);
    const [isError, setIsError] = useState(false);

    const history = useHistory();

    const handleDelete = (id) => {
        axios
            .delete(`${SERVER_URL}/notes/${user.id}/note/${id}`)
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
            .get(`${SERVER_URL}/notes/${user.id}`)
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
