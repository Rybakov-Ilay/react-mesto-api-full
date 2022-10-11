function PopupWithForm({
  children,
  isOpen,
  name,
  title,
  buttonText = "Сохранить",
  onClose,
  onSubmit,
  renderLoading,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          aria-label="закрыть форму добавления"
          onClick={onClose}
        />
        <h3 className="popup__form-title">{title}</h3>
        <form
          className="popup__form"
          name={`${name}Form`}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__submit" type="submit">
            {renderLoading ? "Сохранение..." : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
