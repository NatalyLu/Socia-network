import { NavLink } from "react-router-dom";
import s from "./navigation.module.css";

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <ul className={s.nav__list}>
        <li>
          <NavLink to="/profile" className={({isActive}) => (isActive ? `${s.active} ` : "") + s.nav__link}>Profile</NavLink>
        </li>
        <li>
          <NavLink to="/dialogs" className={({isActive}) => (isActive ? `${s.active} ` : "") + s.nav__link}>Messages</NavLink>
        </li>
        <li>
          <NavLink to="/users" className={({isActive}) => (isActive ? `${s.active} ` : "") + s.nav__link}>Users</NavLink>
        </li>
        {/* <li>
          <NavLink to="#link" className={({isActive}) => (isActive ? `${s.active} ` : "") + s.nav__link}>News</NavLink>
        </li>
        <li>
          <NavLink to="#link" className={({isActive}) => (isActive ? `${s.active} ` : "") + s.nav__link}>Settings</NavLink>
        </li> */}
      </ul>
    </nav>
  )
};

export default Navigation;
