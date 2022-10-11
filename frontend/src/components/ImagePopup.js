function ImagePopup(props) {
  return (
    <div
      className={`popup popup_view-image ${
        props.card.link ? "popup_opened" : ""
      }`}
    >
      <div className="popup__wrapper">
        <button
          className="popup__button-close"
          type="button"
          aria-label="закрыть форму добавления"
          onClick={props.onClose}
        />
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <p className="popup__image-caption">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
