import React from 'react';
import closePath from '../images/Close-icon.svg';

function PopupWithForm({
    name,
    title,
    buttonTitle,
    onClose,
    isOpened,
    onPopupClick,
    children,
    onSubmit,
}) {
    return (
        <div
            className={`popup popup_type_${name} ${isOpened ? 'popup_opened' : ''}`}
            onClick={onPopupClick}
        >
            <div className='popup__container'>
                <button type='button' className='popup__close-button' onClick={onClose}>
                    <img className='popup__close-icon' src={closePath} alt='Закрыть' />
                </button>
                <h2 className='popup__title'>{title}</h2>
                <form
                    name={name}
                    onSubmit={onSubmit}
                    className={`popup__form popup__form_type_${name}`}
                >
                    {children}
                    <button type='submit' className='popup__button'>
                        {buttonTitle}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
