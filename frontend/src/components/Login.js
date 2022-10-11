import React, { useState, useEffect } from "react";

export default function Login({ title, buttonText, onLogin, loggedIn }) {
  const [values, setValues] = useState({ email: "", password: "" });

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({
      email: values.email,
      password: values.password,
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    setValues({ email: "", password: "" });
  }, [loggedIn]);

  return (
    <section className="auth">
      <h3 className="auth__title">{title}</h3>
      <form onSubmit={handleSubmit} className="auth__form" name="loginForm">
        <input
          className="auth__input"
          type="email"
          id="email-input"
          name="email"
          placeholder="Email"
          required
          value={values.email || ""}
          onChange={handleChange}
        />
        <input
          className="auth__input"
          type="password"
          id="password-input"
          name="password"
          placeholder="Пароль"
          required
          value={values.password || ""}
          onChange={handleChange}
        />
        <button
          className="popup__submit popup__submit_theme__dark auth__button-margin"
          type="submit"
        >
          {buttonText}
        </button>
      </form>
    </section>
  );
}
