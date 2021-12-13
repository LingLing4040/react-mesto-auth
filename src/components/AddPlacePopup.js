import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, handlePopupClick }) {
    const [cardName, setCardName] = React.useState('');
    const [cardLink, setCardLink] = React.useState('');

    React.useEffect(() => {
        if (isOpen) {
            clearInputs();
        }
    }, [isOpen]);

    function clearInputs() {
        setCardLink('');
        setCardName('');
    }

    function handleChangeCardName(e) {
        setCardName(e.target.value);
    }

    function handleChangeCardLink(e) {
        setCardLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({ name: cardName, link: cardLink });
    }

    return (
        <PopupWithForm
            title='Новое место'
            name='cards'
            onClose={onClose}
            isOpened={isOpen}
            buttonTitle='Создать'
            onPopupClick={handlePopupClick}
            onSubmit={handleSubmit}
        >
            <label className='popup__label'>
                <input
                    name='name'
                    id='card-name-input'
                    type='text'
                    placeholder='Название'
                    className='popup__input popup__input_type_card-name'
                    minLength='2'
                    maxLength='30'
                    required
                    onChange={handleChangeCardName}
                    value={cardName}
                />
                <span className='popup__error card-name-input-error'></span>
            </label>
            <label className='popup__label'>
                <input
                    name='link'
                    id='card-link-input'
                    type='url'
                    placeholder='Ссылка на картинку'
                    className='popup__input popup__input_type_card-link'
                    required
                    onChange={handleChangeCardLink}
                    value={cardLink}
                />
                <span className='popup__error card-link-input-error'></span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
