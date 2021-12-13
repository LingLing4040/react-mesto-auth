import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePopup({ isOpen, onClose, handlePopupClick, onConfirm, card }) {
    function handleSubmitConfirm(e) {
        e.preventDefault();

        onConfirm(card);
    }
    return (
        <PopupWithForm
            title='Вы уверены?'
            name='delete'
            onClose={onClose}
            isOpened={isOpen}
            buttonTitle='Да'
            onPopupClick={handlePopupClick}
            onSubmit={handleSubmitConfirm}
        ></PopupWithForm>
    );
}

export default DeletePopup;
