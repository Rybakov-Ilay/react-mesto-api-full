import PopupWithForm from "./PopupWithForm";
import React, { useRef, useEffect } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, renderLoading}) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      renderLoading={renderLoading}
    >
      <div className="popup__input-wrapper">
        <input
          className="popup__input popup__input_type_place-link"
          type="url"
          name="avatarLink"
          placeholder="ссылка на картинку"
          required
          id="avatarLink-input"
          ref={avatarRef}
        />
        <span className="avatarLink-input-error popup__input-error" />
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
