import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
import './NoteForm.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const NoteForm = ({ status }) => {
    const [noteLabel, setNoteLabel] = useState(status === 'add' && '');
    const [noteContent, setNoteContent] = useState(status === 'add' && '');
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { noteId } = useParams();


    const handleChangeLabel = (event) => {
        setNoteLabel(event.target.value);
    };

    const handleChangeContent = (event) => {
        setNoteContent(event.target.value);
    };

    const isFormValid = () => {
        if (!noteLabel || !noteContent) {
            return false;
        }
        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (!isFormValid()) {
            setIsError(true);
            return;
        }
 
        axios
            .post(`${SERVER_URL}/notes`, {
                label: noteLabel,
                note: noteContent,
                user_id: 2
            }) 
            .then(() => {
                setIsError(false);
                setIsSuccess(true);
            })
            .catch(() => {
                setIsError(true);
            });

        setNoteLabel('');
        setNoteContent('');

        setTimeout(() => {
            <Redirect to='/notes' />
        }, 2000)
    }

    useEffect(() => {
        axios
            .get(`${SERVER_URL}/notes/2/note/${noteId}`)
            .then((response) => {
                console.log(response)
                const selectedNote = response.data;

                setNoteLabel(selectedNote.label);
                setNoteContent(selectedNote.note);
            })
            .catch((error) => {
                console.log(error)
                setIsError(true);
            });
    }, [noteId]);

    return (
        <form className='note-form'>
            <label className='note-form__title'>
                Label
            </label>
            <input 
                type='text'
                placeholder='Add a label to your note'
                className='note-form__label'
                name='noteLabel'
                value={noteLabel}
                onChange={handleChangeLabel}
            />

            <label className='note-form__title'>
                Note
            </label>
            <textarea
                type='text'
                placeholder='Add your note'
                className='note-form__content'
                name='noteContent'
                value={noteContent}
                onChange={handleChangeContent}
            />
            
            <button className='note-form__button' onClick={handleSubmit} >
                {status === 'add' ? 'Add Note' : 'Update Note'}
            </button>
        </form>
    );
};

export default NoteForm;