import React from 'react';
import deletePath from '../images/Trash.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = `card__delete-button ${
        isOwn ? 'card__delete-button_shown' : ''
    }`;

    const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
    const cardLikeButtonClassName = `card__like ${isLiked ? 'card__like_active' : ''}`;

    function handleClick() {
        props.onClick(props.card.name, props.card.link);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onDeleteCard(props.card);
    }

    return (
        <article className='card'>
            <img
                className='card__photo'
                alt={props.card.name}
                src={props.card.link}
                onClick={handleClick}
            />
            <div className='card__footer'>
                <h2 className='card__title'>{props.card.name}</h2>
                <div className='card__like-container'>
                    <button
                        type='button'
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick}
                    ></button>
                    <p className='card__like-counter'>{props.card.likes.length}</p>
                </div>
            </div>
            <button type='button' className={cardDeleteButtonClassName} onClick={handleDeleteClick}>
                <img src={deletePath} alt='Удалить' />
            </button>
        </article>
    );
}

export default Card;
