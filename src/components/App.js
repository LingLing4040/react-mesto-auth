import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import ProfilePopup from './ProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';

function App() {
    const [isProfilePopupOpened, setIsProfilePopupOpened] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
    const [isBigCardPopupOpen, setIsBigCardPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
    const [cardToDelete, setCardToDelete] = React.useState({});
    const [cards, setCards] = React.useState([]);

    const [currentUser, setCurrentUser] = React.useState({});

    React.useEffect(() => {
        Promise.all([api.getInfo(), api.getInitialCards()])
            .then(([user, cards]) => {
                setCards(cards);
                setCurrentUser(user);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    React.useEffect(() => {
        if (
            isBigCardPopupOpen ||
            isDeletePopupOpen ||
            isProfilePopupOpened ||
            isAddPlacePopupOpen ||
            isEditAvatarPopupOpen === true
        ) {
            function handleEsc(event) {
                if (event.key === 'Escape') {
                    closeAllPopups();
                }
            }

            document.addEventListener('keydown', handleEsc);

            return () => {
                document.removeEventListener('keydown', handleEsc);
            };
        }
    }, [
        isProfilePopupOpened,
        isAddPlacePopupOpen,
        isEditAvatarPopupOpen,
        isDeletePopupOpen,
        isBigCardPopupOpen,
    ]);

    function closeAllPopups() {
        setIsProfilePopupOpened(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsDeletePopupOpen(false);
        setIsBigCardPopupOpen(false);
        setCardToDelete({});
        setSelectedCard({});
    }

    function handleEditProfileClick() {
        setIsProfilePopupOpened(true);
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleDeleteButtonClick(card) {
        setIsDeletePopupOpen(true);
        setCardToDelete(card);
    }

    function handleCardClick(name, link) {
        setIsBigCardPopupOpen(true);
        setSelectedCard({ name, link });
    }

    function handlePopupClick(event) {
        if (event.target.classList.contains('popup')) {
            closeAllPopups();
        }
    }

    function handleUpdateUser({ name, about }) {
        api.editInfo({ name, about })
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar({ avatar }) {
        api.updateAvatar({ avatar })
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((oldCards) =>
                    oldCards.map((oldCard) => (oldCard._id === card._id ? newCard : oldCard))
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((oldCards) => oldCards.filter((oldCard) => oldCard._id !== card._id));
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(card) {
        api.addCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                <div className='content'>
                    <Header />
                    <Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onDeleteCard={handleDeleteButtonClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                    />
                    <Footer />
                    <ProfilePopup
                        isOpen={isProfilePopupOpened}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                        handlePopupClick={handlePopupClick}
                    />
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        handlePopupClick={handlePopupClick}
                    />
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                        handlePopupClick={handlePopupClick}
                    />
                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                        isOpened={isBigCardPopupOpen}
                        handlePopupClick={handlePopupClick}
                    />

                    <DeletePopup
                        onClose={closeAllPopups}
                        isOpen={isDeletePopupOpen}
                        handlePopupClick={handlePopupClick}
                        onConfirm={handleCardDelete}
                        card={cardToDelete}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
