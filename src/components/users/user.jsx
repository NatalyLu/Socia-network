import React from "react";
import { NavLink } from "react-router-dom";
import s from "./users.module.css";
import userImg from "../../images/user.jpg";
import { PathLinks } from "../../const";

const User = ({user, follow, unfollow, followingInProgress}) => {

  const followClickHandler = (status, id) => {
    if(status) {
      unfollow(id);
    } else {
      follow(id);
    }
  }

  return(
    <li className={s.user}>
      <div>
        <NavLink to={PathLinks.PROFILE + "/" + user.id}>
          <img
            className={s.user__img}
            src={user.photos.small != null ? user.photos.small : userImg}
            alt="User"
            width="50"
            height="50"
          ></img>
        </NavLink>
        <button
          className="secondary"
          onClick={() => followClickHandler(user.followed, user.id)}
          disabled={followingInProgress.some(id => id === user.id)}
        >{user.followed ? "Followed" : "Unfollowed"}</button>
      </div>
      <div>
        <span>{user.name}</span>
        <span>{user.status}</span>
      </div>
    </li>
  ) 
};

export default User;