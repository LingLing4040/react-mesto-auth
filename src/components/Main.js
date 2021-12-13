import React from 'react';
import editPath from '../images/edit-button.svg';
import addPath from '../images/add.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onDeleteCard,
    onCardClick,
    cards,
    onCardLike,
}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className='profile'>
                <div
                    className='profile__avatar'
                    onClick={onEditAvatar}
                    style={{ backgroundImage: `url(${currentUser.avatar})` }}
                ></div>
                <div className='profile__info'>
                    <h1 className='profile__name'>{currentUser.name}</h1>
                    <button
                        type='button'
                        className='profile__button profile__button_type_edit'
                        onClick={onEditProfile}
                    >
                        <img className='profile__edit-icon' src={editPath} alt='Редактировать' />
                    </button>
                    <p className='profile__occupation'>{currentUser.about}</p>
                </div>
                <button
                    type='button'
                    className='profile__button profile__button_type_add'
                    onClick={onAddPlace}
                >
                    <img className='profile__add-icon' src={addPath} alt='Добавить' />
                </button>
            </section>
            <section className='cards'>
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onDeleteCard={onDeleteCard}
                        onClick={onCardClick}
                        onCardLike={onCardLike}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;
