import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

import React, { useState, useEffect } from "react";
import api from "../utils/Api";
import * as authMesto from "../utils/authMesto";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Switch, useHistory } from "react-router-dom";

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [cards, setCards] = useState([]);
    const [renderLoading, setRenderLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [emailCurrentUser, setEmailCurrentUser] = useState("Test");
    const [isSingUp, setIsSingUp] = useState(false);
    const history = useHistory();

    function handelSubmitSingUp({ password, email }) {
        authMesto
            .register(password, email)
            .then(() => {
                setIsSingUp(true);
                history.push("/sign-in");
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setIsInfoTooltipPopupOpen(true));
    }

    function handelSubmitLogin({ password, email }) {
        localStorage.setItem("email", email);
        authMesto
            .authorize(password, email)
            .then((res) => {
                console.log(res);
                localStorage.setItem("token", res.token);
                setLoggedIn(true);
                history.push("/");
            })
            .catch((err) => {
                setIsInfoTooltipPopupOpen(true);
                console.log(err);
            });
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            authMesto
                .checkToken(token)
                .then((res) => {
                    setEmailCurrentUser(res.data.email);
                    setLoggedIn(true);
                    history.push("/");
                })
                .catch((err) => console.log(err));
        }
    }, [loggedIn]);

    function handleSingOut() {
        localStorage.removeItem("token");
        setEmailCurrentUser("");
        setLoggedIn(false);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        api
            .changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => console.log(err));
    }

    function handleCardDelete(card) {
        api
            .deleteCard(card._id)
            .then(() => {
                setCards(cards.filter((item) => item._id !== card._id));
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        api
            .getInitialCards()
            .then((data) => {
                setCards(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleAddPlace(card) {
        setRenderLoading(true);
        api
            .addNewCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setRenderLoading(false));
    }

    useEffect(() => {
        api
            .getUser()
            .then((data) => {
                setCurrentUser({
                    name: data.name,
                    about: data.about,
                    avatar: data.avatar,
                    _id: data._id,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});
        setIsInfoTooltipPopupOpen(false);
    }

    function handleUpdateUser(userData) {
        setRenderLoading(true);
        api
            .editUser(userData)
            .then((res) => {
                setCurrentUser({
                    name: res.name,
                    about: res.about,
                    avatar: res.avatar,
                    _id: res._id,
                });
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setRenderLoading(false));
    }

    function handleUpdateAvatar(avatarLink) {
        setRenderLoading(true);
        api
            .editAvatar(avatarLink)
            .then((res) => {
                setCurrentUser({
                    name: res.name,
                    about: res.about,
                    avatar: res.avatar,
                    _id: res._id,
                });
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setRenderLoading(false));
    }

    return (
        <div className="App">
            <CurrentUserContext.Provider value={currentUser}>
                <div className="page">
                    <Header
                        loggedIn={loggedIn}
                        emailCurrentUser={emailCurrentUser}
                        onSingOut={handleSingOut}
                    />
                    <Switch>
                        <ProtectedRoute
                            exact
                            path="/"
                            loggedIn={loggedIn}
                            component={
                                <Main
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    onCardClick={handleCardClick}
                                    cards={cards}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                />
                            }
                        />
                        <Route path="/sign-up">
                            <Register
                                title="Регистрация"
                                buttonText="Зарегистрироваться"
                                onSingUp={handelSubmitSingUp}
                                isSingUp={isSingUp}
                            />
                        </Route>
                        <Route path="/sign-in">
                            <Login
                                title="Вход"
                                buttonText="Войти"
                                onLogin={handelSubmitLogin}
                                loggedIn={loggedIn}
                            />
                        </Route>
                    </Switch>
                    <Footer />
                </div>
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    renderLoading={renderLoading}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    renderLoading={renderLoading}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlace}
                    renderLoading={renderLoading}
                />
                <PopupWithForm
                    name="delete"
                    title="Вы уверены?"
                    buttonText="Да"
                    onClose={closeAllPopups}
                />
                <InfoTooltip
                    isOpen={isInfoTooltipPopupOpen}
                    onClose={closeAllPopups}
                    isSingUp={isSingUp}
                />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;