import React from 'react';
import closePath from '../images/Close-icon.svg';
import okPath from '../images/Ok.svg';
import notOkPath from '../images/Not-ok.svg';

function InfoTooltip({ isSuccess, onClose, isOpened, handlePopupClick }) {
    return (
        <div
            className={`popup popup_type_info ${isOpened ? 'popup_opened' : ''}`}
            onClick={handlePopupClick}
        >
            <div className='popup__container'>
                <button type='button' className='popup__close-button' onClick={onClose}>
                    <img className='popup__close-icon' src={closePath} alt='Закрыть' />
                </button>
                <img
                    className='popup__message-icon'
                    src={isSuccess ? okPath : notOkPath}
                    alt={isSuccess ? 'Ок' : 'Не Ок'}
                />
                <h2 className='popup__message'>
                    {isSuccess
                        ? 'Вы успешно зарегистрировались!'
                        : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h2>
            </div>
        </div>
    );
}

export default InfoTooltip;
