import PopupWithForm from "./PopupWithForm";
import React, { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, renderLoading }) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      renderLoading={renderLoading}
    >
      <div className="popup__input-wrapper">
        <input
          className="popup__input popup__input_type_name"
          type="text"
          name="userName"
          placeholder="Ваше имя"
          required
          minLength="2"
          maxLength="40"
          id="userName-input"
          value={name || ""}
          onChange={handleNameChange}
        />
        <span className="userName-input-error popup__input-error" />
      </div>
      <div className="popup__input-wrapper">
        <input
          className="popup__input popup__input_type_job"
          type="text"
          name="userJob"
          placeholder="Ваше призвание"
          required
          minLength="2"
          maxLength="200"
          id="userJob-input"
          value={about || ""}
          onChange={handleDescriptionChange}
        />
        <span className="userJob-input-error popup__input-error" />
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
