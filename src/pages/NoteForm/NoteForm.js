import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
import './NoteForm.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const NoteForm = ({ status }) => {
    const [noteLabel, setNoteLabel] = useState(['']);
    const [noteContent, setNoteContent] = useState(['']);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { noteId } = useParams();


    const handleChange = (event) => {
        setNoteLabel(event.target.noteLabel.value);
        setNoteContent(event.target.noteContent.value);
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
                note: noteContent
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

    // useEffect(() => {
    //     axios
    //         .get(`${SERVER_URL}/notes/2/note/${noteId}`)
    //         .then((response) => {
    //             console.log(response)
    //             const selectedNote = response;

    //             setNoteLabel(response.label);
    //             setNoteContent(response.note);
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //             setIsError(true);
    //         });
    // }, [noteId]);

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
                onChange={handleChange}
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
                onChange={handleChange}
            />
            
            <button className='note-form__button' onClick={handleSubmit} >
                Add Note
            </button>
        </form>
    );
};

export default NoteForm;