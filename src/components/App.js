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
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import * as Auth from '../utils/Auth.js';
import InfoTooltip from './InfoTooltip';

function App() {
    const [isProfilePopupOpened, setIsProfilePopupOpened] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
    const [isBigCardPopupOpen, setIsBigCardPopupOpen] = React.useState(false);
    const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
    const [cardToDelete, setCardToDelete] = React.useState({});
    const [cards, setCards] = React.useState([]);

    const [currentUser, setCurrentUser] = React.useState({});

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const [email, setEmail] = React.useState('');

    const history = useHistory();

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
            isEditAvatarPopupOpen ||
            isInfoPopupOpen === true
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
        isInfoPopupOpen,
    ]);

    function closeAllPopups() {
        setIsProfilePopupOpened(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsDeletePopupOpen(false);
        setIsBigCardPopupOpen(false);
        setIsInfoPopupOpen(false);
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

    function handleLogout() {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        history.push('/sign-in');
    }

    React.useEffect(() => {
        tokenCheck();
    }, []);

    function tokenCheck() {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            if (token) {
                Auth.getContent(token)
                    .then((res) => {
                        if (res) {
                            setIsLoggedIn(true);
                            setEmail(res.data.email);
                            history.push('/');
                        }
                    })
                    .catch((err) => console.log(err));
            }
        }
    }

    function handleInfoOpen(res) {
        setIsSuccess(res);
        setIsInfoPopupOpen(true);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                <div className='content'>
                    <Switch>
                        <ProtectedRoute
                            exact
                            path='/'
                            loggedIn={isLoggedIn}
                            component={() => {
                                return (
                                    <>
                                        <Header
                                            email={email}
                                            handleLogout={handleLogout}
                                            linkText='Выйти'
                                            linkPath='/sign-in'
                                        >
                                            <p className='header__email'>{email}</p>
                                        </Header>
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
                                    </>
                                );
                            }}
                        />

                        <Route path='/sign-up'>
                            <Header linkText='Войти' linkPath='/sign-in' />
                            <Register handleInfoOpen={handleInfoOpen} />
                        </Route>
                        <Route path='/sign-in'>
                            <Header linkText='Зарегистрироваться' linkPath='/sign-up' />
                            <Login handleLogin={tokenCheck} />
                        </Route>
                        <Route path='*'>
                            <Redirect to='/sign-in' />
                        </Route>
                    </Switch>
                    <InfoTooltip
                        onClose={closeAllPopups}
                        isOpened={isInfoPopupOpen}
                        handlePopupClick={handlePopupClick}
                        isSuccess={isSuccess}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
