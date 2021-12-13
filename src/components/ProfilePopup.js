import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function ProfilePopup({ isOpen, onClose, onUpdateUser, handlePopupClick }) {
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    const [name, setName] = React.useState(currentUser.name);
    const [description, setDescription] = React.useState(currentUser.about);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            title='Редактировать профиль'
            name='profile'
            onClose={onClose}
            isOpened={isOpen}
            buttonTitle='Сохранить'
            onPopupClick={handlePopupClick}
            onSubmit={handleSubmit}
        >
            <label className='popup__label'>
                <input
                    id='profile-name-input'
                    name='name'
                    type='text'
                    placeholder='Имя профиля'
                    className='popup__input popup__input_type_name'
                    required
                    minLength='2'
                    maxLength='40'
                    value={name || ''}
                    onChange={handleChangeName}
                />
                <span className='popup__error profile-name-input-error'></span>
            </label>
            <label className='popup__label'>
                <input
                    id='profile-occupation-input'
                    name='about'
                    type='text'
                    placeholder='Род деятельности'
                    className='popup__input popup__input_type_occupation'
                    required
                    minLength='2'
                    maxLength='200'
                    value={description || ''}
                    onChange={handleChangeDescription}
                />
                <span className='popup__error profile-occupation-input-error'></span>
            </label>
        </PopupWithForm>
    );
}

export default ProfilePopup;
