import React from "react";
import styles from "./users.module.css";
import user from "../../images/user.jpg";
import { MAX_PAGES_COUNT } from "../../const";
import { NavLink } from "react-router-dom";

const Users = (props) => {

  const followClickHandler = (status, id) => {
    if(status) {
      props.unfollow(id);
    } else {
      props.follow(id);
    }
  }

  let pagesCount = Math.ceil(props.usersCount / props.pageSize);
  let pages = [];
  let maxPageValue = pagesCount > MAX_PAGES_COUNT ? MAX_PAGES_COUNT : pagesCount;

  for (let i=1; i <=maxPageValue; i++) {
    pages.push({id: i, number: i});
  }
  return(
    <div className={styles.users}>
      <ul className={`pagination ${styles.users__paginaion}`}>
        {pages.map(page => <li 
                              key={page.id}
                              className={`pagination__item ${ page.number === props.currentPage ? "pagination__item--current" : ""}`}
                              onClick={() => props.pageClickHandler(page.number)}
                            >{page.number}</li>)}
      </ul>
      <ul className={styles.users__list}>
        {props.users.map(u => 
        <li className={styles.user} key={u.id}>
          <div>
            <NavLink to={"/profile/" + u.id}>
              <img
                className={styles.user__img}
                src={u.photos.small != null ? u.photos.small : user}
                alt="User"
                width="50"
                height="50"
              ></img>
            </NavLink>
            <button className="secondary" onClick={() => followClickHandler(u.followed, u.id)} disabled={props.followingInProgress.some(id => id === u.id)} >{u.followed ? "Followed" : "Unfollowed"}</button>
          </div>
          <div>
            <span>{u.name}</span>
            <span>{"u.location.country"}</span>
            <span>{u.status}</span>
            <span>{"u.location.city"}</span>
          </div>
        </li>)}
      </ul>
    </div>
  ) 
};

export default Users;