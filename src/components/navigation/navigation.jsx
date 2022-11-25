import { NavLink } from "react-router-dom";
import { PathLinks } from "../../const";
import s from "./navigation.module.css";

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <ul className={s.nav__list}>
        <li>
          <NavLink to={PathLinks.PROFILE} className={({isActive}) => (isActive ? `${s.active} ` : "") + s.nav__link}>Profile</NavLink>
        </li>
        <li>
          <NavLink to={PathLinks.DIALOGS} className={({isActive}) => (isActive ? `${s.active} ` : "") + s.nav__link}>Messages</NavLink>
        </li>
        <li>
          <NavLink to={PathLinks.USERS} className={({isActive}) => (isActive ? `${s.active} ` : "") + s.nav__link}>Users</NavLink>
        </li>
      </ul>
    </nav>
  )
};

export default Navigation;
