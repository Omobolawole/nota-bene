import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import backIcon from '../../assets/icons/arrow_back.svg';
import homeIcon from '../../assets/icons/home.svg';
import './ListForm.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ListForm = ({ user, status }) => {
    const [listLabel, setListLabel] = useState('');
    const [listContent, setListContent] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { listId } = useParams();

    const history = useHistory();

    const handleChangeLabel = (event) => {
        setListLabel(event.target.value);
    };

    const handleChangeContent = (event) => {
        setListContent(event.target.value);
    };

    const isFormValid = () => {
        if (!listLabel || !listContent) {
            return false;
        }
        return true;
    };

    const handleCancel = (event) => {
        event.preventDefault();
        history.goBack();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (!isFormValid()) {
            setIsError(true);
            return;
        }
 
        axios
            .post(`${SERVER_URL}/lists`, {
                label: listLabel,
                list: listContent,
                user_id: user.id
            }) 
            .then(() => {
                setIsError(false);
                setIsSuccess(true);
            })
            .catch(() => {
                setIsError(true);
            });

        setListLabel('');
        setListContent('');
    };

    useEffect(() => {
        if (status === 'edit') {
            axios
                .get(`${SERVER_URL}/notes/2/note/${listId}`)
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
        }
    }, [noteId]);
    return (
        <div>
            
        </div>
    );
};

export default ListForm;