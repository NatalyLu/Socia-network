import React, { useState } from "react";
import s from "./paginator.module.css";
import { PORTION_OF_PAGES } from "../../../const";

let pages = [];

const Paginator = ({currentPage, pageClickHandler, itemsCount, pageSize, portionSize = PORTION_OF_PAGES}) => {

  const pagesCount = Math.ceil(itemsCount / pageSize);
  const portionCount = Math.ceil(pagesCount / portionSize);

  let [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;
  
  React.useMemo(() => {
    pages = [];
    for (let i=1; i <=pagesCount; i++) {
      pages.push({id: i, number: i});
    }
  }, [pagesCount]);
  
  

  return(
    <ul className={s.pagination}>
        <button className="primary" type="button" onClick={() => {setPortionNumber(portionNumber - 1)}} disabled={!(portionNumber > 1)}>Prev</button>

      {pages.filter(p => p.number >= leftPortionPageNumber && p.number <= rightPortionPageNumber).map(page =>
        <li 
          key={page.id}
          className={`${s.pagination__item} ${ page.number === currentPage ? s.current : ""}`}
          onClick={() => pageClickHandler(page.number)}
        >{page.number}</li>)}

        <button className="primary" type="button" onClick={() => {setPortionNumber(portionNumber + 1)}} disabled={!(portionNumber < portionCount)}>Next</button>
    </ul>
  ) 
};

export default Paginator;