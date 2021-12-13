import React from 'react';
import closePath from '../images/Close-icon.svg';

function ImagePopup(props) {
    return (
        <div
            className={`popup popup_type_card-big ${props.isOpened ? 'popup_opened' : ''}`}
            onClick={props.handlePopupClick}
        >
            <figure className='popup__figure'>
                <button type='button' className='popup__close-button' onClick={props.onClose}>
                    <img className='popup__close-icon' src={closePath} alt='Закрыть' />
                </button>
                <img className='popup__image' src={props.card.link} alt={props.card.name} />
                <figcaption className='popup__image-caption'>{props.card.name}</figcaption>
            </figure>
        </div>
    );
}

export default ImagePopup;
