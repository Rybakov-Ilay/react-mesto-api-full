import logoMesto from "../images/logo-mesto.svg";
import { Link, useLocation } from "react-router-dom";

function Header({ loggedIn, emailCurrentUser, onSingOut }) {
  const location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={logoMesto} alt="логотип mesto" />
      {loggedIn ? (
        <div className="header__auth">
          <div className="header__email">{emailCurrentUser}</div>
          <Link to="/sign-in" className="header__link" onClick={onSingOut}>
            Выйти
          </Link>
        </div>
      ) : (
        <>
          {location.pathname === "/sign-in" && (
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          )}
          {location.pathname === "/sign-up" && (
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          )}
        </>
      )}
    </header>
  );
}

export default Header;
