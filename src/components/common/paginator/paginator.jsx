import React from "react";
import s from "./paginator.module.css";
import { MAX_PAGES_COUNT } from "../../../const";

const Paginator = ({currentPage, pageClickHandler, usersCount, pageSize}) => {
  let pagesCount = Math.ceil(usersCount / pageSize);
  let pages = [];
  let maxPageValue = pagesCount > MAX_PAGES_COUNT ? MAX_PAGES_COUNT : pagesCount;

  for (let i=1; i <=maxPageValue; i++) {
    pages.push({id: i, number: i});
  }

  return(
    <ul className={s.pagination}>
      {pages.map(page =>
        <li 
          key={page.id}
          className={`${s.pagination__item} ${ page.number === currentPage ? s.current : ""}`}
          onClick={() => pageClickHandler(page.number)}
        >{page.number}</li>)}
    </ul>
  ) 
};

export default Paginator;