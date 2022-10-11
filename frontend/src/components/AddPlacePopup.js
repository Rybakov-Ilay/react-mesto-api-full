import PopupWithForm from "./PopupWithForm";
import React, { useRef, useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace, renderLoading }) {
  const placeNameRef = useRef();
  const placeLinkRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: placeNameRef.current.value,
      link: placeLinkRef.current.value,
    });
  }

  useEffect(() => {
    placeNameRef.current.value = "";
    placeLinkRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      renderLoading={renderLoading}
    >
      <div className="popup__input-wrapper">
        <input
          className="popup__input popup__input_type_place-name"
          type="text"
          name="placeName"
          placeholder="название"
          required
          minLength="2"
          maxLength="30"
          id="placeName-input"
          ref={placeNameRef}
        />
        <span className="placeName-input-error popup__input-error" />
      </div>
      <div className="popup__input-wrapper">
        <input
          className="popup__input popup__input_type_place-link"
          type="url"
          name="placeLink"
          placeholder="ссылка на картинку"
          required
          id="placeLink-input"
          ref={placeLinkRef}
        />
        <span className="placeLink-input-error popup__input-error" />
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
