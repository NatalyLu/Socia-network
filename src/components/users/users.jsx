import React from "react";
import s from "./users.module.css";
import Paginator from "../common/paginator/paginator";
import User from "./user";

const Users = ({currentPage, pageClickHandler, usersCount, pageSize, follow, unfollow, users, followingInProgress}) => {
  return(
    <div className={s.users}>
      <Paginator currentPage={currentPage} pageClickHandler={pageClickHandler} itemsCount={usersCount} pageSize={pageSize} />
    
      <ul className={s.users__list}>
        {users.map(u => 
          <User key={u.id} user={u} follow={follow} unfollow={unfollow} followingInProgress={followingInProgress} />
        )}
      </ul>
    </div>
  ) 
};

export default Users;