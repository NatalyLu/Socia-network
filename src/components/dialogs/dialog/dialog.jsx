import { NavLink } from 'react-router-dom';
import s from '../dialogs.module.css';

const Dialog = (props) => {
  return (
    <ul className={s.dialogs__users}>
      {props.users.map((item) => {
        let path = "/dialogs/" + item.id;
        let classes = ({isActive}) => (isActive ? `${s.active } ` : '') + s.dialogs__name;
        return <li key={item.id}><NavLink className={classes} to={path}>{item.name}</NavLink></li>;
      })}
    </ul>
  );
};

export default Dialog;