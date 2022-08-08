import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import backIcon from '../../assets/icons/arrow_back.svg';
import homeIcon from '../../assets/icons/home.svg';
import './DetailForm.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const DetailForm = ({ user, status }) => {
    const [detailLabel, setDetailLabel] = useState('');
    const [detailContent, setDetailContent] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isAxiosError, setIsAxiosError] = useState(false);
    const { detailId } = useParams();

    const history = useHistory();

    const handleChangeLabel = (event) => {
        setDetailLabel(event.target.value);
    };

    const handleChangeContent = (event) => {
        setDetailContent(event.target.value);
    };

    const isFormValid = () => {
        if (!detailLabel || !detailContent) {
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

        };

        if (status === 'edit') {
            axios
                .put(`${SERVER_URL}/details${user.id}/detail/${detailId}`, {
                    label: detailLabel,
                    detail: detailContent,
                    user_id: user.id
                }) 
                .then((response) => {
                    console.log(response)
                    setIsError(false);
                    setIsSuccess(true);

                    setTimeout(() => {
                        history.goBack();
                    }, 2000)
                })
                .catch((response) => {
                    console.log(response)
                    setIsAxiosError(true);
                });

            setDetailLabel('');
            setDetailContent('');
        };

        if (status === 'add') {
            axios
                .post(`${SERVER_URL}/details`, {
                    label: detailLabel,
                    detail: detailContent,
                    user_id: user.id
                }) 
                .then((response) => {
                    console.log(response)
                    setIsError(false);
                    setIsSuccess(true);

                    setTimeout(() => {
                        history.goBack();
                    }, 2000)
                })
                .catch(() => {
                    setIsAxiosError(true);
                });

            console.log(detailContent)

            setDetailLabel('');
            setDetailContent('');
        };
    };

    useEffect(() => {
        if (status === 'edit' && user ) {
            axios
                .get(`${SERVER_URL}/details/${user.id}/detail/${detailId}`)
                .then((response) => {
                    const selectedDetail = response.data;
  
                    setDetailLabel(selectedDetail.label);
                    setDetailContent(selectedDetail.detail);
                })
                .catch((error) => {
                    console.log(error)
                    setIsAxiosError(true);
                });
        }
    }, [detailId]);

    return (
        <>
            <div className='detail-form__nav'>
                <img src={backIcon} alt='back icon' className='detail-form__icon' onClick={history.goBack} />
                <Link to='/' className='detail-form__link'>
                    <img src={homeIcon} alt='home icon' className='detail-form__icon' />
                </Link>
            </div>
            <form className='detail-form__fields'>
                <label className='detail-form__title'>
                    Label
                </label>
                <input 
                    type='text'
                    placeholder='Add a label to your detail'
                    className={!isError ? 'detail-form__label' : 'detail-form__label detail-form__label--error'}
                    name='detailLabel'
                    value={detailLabel}
                    onChange={handleChangeLabel}
                />

                <label className='detail-form__title'>
                    Detail
                </label>

                <input
                    type='text'
                    placeholder='Add your detail'
                    className={!isError ? 'detail-form__content' : 'detail-form__content detail-form__content--error'}
                    name='detailContent'
                    value={detailContent}
                    onChange={handleChangeContent}
                />

                {isError && <span className='detail-form__error'>All fields are required.</span>}
                {isSuccess && <span className='detail-form__success'>Detail {status==='add' ? 'added' : 'updated'} successfully!</span>}
                {isAxiosError && <span className='detail-form__request'>Please try again later.</span>}

                <div className='detail-form__buttons'>
                    <button className='detail-form__button' onClick={handleCancel} >
                        Cancel
                    </button>
                    <button className='detail-form__button' onClick={handleSubmit} >
                        {status === 'add' ? 'Add Detail' : 'Update Detail'}
                    </button>
                </div>
            </form>
        </>
    );
};

export default DetailForm;