import successIcon from "../images/success.svg";
import failIcon from "../images/fail.svg";

function InfoTooltip({ isSingUp, isOpen, onClose }) {
  const successText = "Вы успешно зарегистрировались!";
  const failText = "Что-то пошло не так!";
  return (
    <div className={`popup popup_info ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type__info">
        <button
          className="popup__button-close"
          type="button"
          aria-label="закрыть форму добавления"
          onClick={onClose}
        />
        <img
          className="popup__logo"
          src={isSingUp ? successIcon : failIcon}
          alt={"ответ по запросу"}
        />
        <h3 className="popup__form-title popup__form-title_type__info">
          {isSingUp ? successText : failText}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
