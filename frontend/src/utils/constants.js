export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export const BASE_URL = "https://auth.nomoreparties.co";


// Селекторы
export const USER_NAME_SELECTOR = ".profile__title";
export const USER_JOB_SELECTOR = ".profile__subtitle";
export const USER_AVATAR_SELECTOR = ".profile__avatar";
export const userData = {
  userNameSelector: USER_NAME_SELECTOR,
  userJobSelector: USER_JOB_SELECTOR,
  userAvatarSelector: USER_AVATAR_SELECTOR,
};

// параметры подключения к api сервера
export const optionsApi = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-41",
  headers: {
    authorization: "62c42d75-3174-484e-a374-431b449090d5",
    "Content-Type": "application/json",
  },
};
