import React, { useContext } from "react";
import Card from "./сard.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onCardDelete,
  onCardLike,
  onAddPlace,
  onEditProfile,
  onEditAvatar,
  onCardClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Портрет автора"
          />
          <div className="profile__avatar-edit" onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <div className="profile__title-container">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="редактировать профиль"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <div className="profile__form-add">
          <button
            className="profile__add-button"
            type="button"
            aria-label="добавить фотографию"
            onClick={onAddPlace}
          />
        </div>
      </section>

      <section className="cards" aria-label="Фотографии автора с подписями">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
