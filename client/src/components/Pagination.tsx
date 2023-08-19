import React, { useEffect, useState } from 'react';
import { RightArrowIcon } from '../assets';

interface IProps {
  currentPage: number;
  totalPages: number;
  changeCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function Pagination(props: IProps) {
  const { currentPage, totalPages, changeCurrentPage } = props;
  const [pages, setPages] = useState<number[]>([]);

  const PAGE_LIMIT = 10;

  useEffect(() => {
    setPages([]);
    if (currentPage < 5) {
      for (let i = 1; i <= PAGE_LIMIT; i += 1) {
        setPages((prevPages) => [...prevPages, i]);
      }
    }

    if (currentPage >= 5 && currentPage <= totalPages - 5) {
      for (let i = currentPage - 4; i <= currentPage + 5; i += 1) {
        setPages((prevPages) => [...prevPages, i]);
      }
    }

    if (currentPage > totalPages - 5) {
      for (let i = totalPages - 9; i <= totalPages; i += 1) {
        setPages((prevPages) => [...prevPages, i]);
      }
    }
  }, [currentPage, totalPages]);

  const leftArrowButtons = <li />;

  const rightArrowButtons = (
    <li>
      <RightArrowIcon />
    </li>
  );

  const showPageButtons = pages.map((page) => {
    return (
      <li key={page} onClick={() => changeCurrentPage(page)}>
        {page}
      </li>
    );
  });

  return (
    <nav role="navigation" aria-label="Pagination Navigation">
      <ul className="flex gap-x-1">
        {pages.includes(1) ? null : leftArrowButtons}
        {showPageButtons}
        {pages.includes(totalPages) ? null : rightArrowButtons}
      </ul>
    </nav>
  );
}

export default Pagination;
