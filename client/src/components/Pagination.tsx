import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RightArrowIcon, LeftArrowIcon } from '../assets';

interface IProps {
  currentPage: number;
  totalPages: number;
  changeCurrentPage: (value: number) => void;
}

function Pagination(props: IProps) {
  const { currentPage, totalPages, changeCurrentPage } = props;
  const [_, setSearchParams] = useSearchParams();
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

  const leftArrowButtons = (
    <li>
      {currentPage === 1 ? null : (
        <button
          type="button"
          onClick={() => {
            changeCurrentPage(currentPage - 1);
            setSearchParams({ page: String(currentPage - 1) });
          }}
        >
          <LeftArrowIcon />
        </button>
      )}
    </li>
  );

  const rightArrowButton = (
    <li>
      {currentPage === totalPages ? null : (
        <button
          type="button"
          onClick={() => {
            changeCurrentPage(currentPage + 1);
            setSearchParams({ page: String(currentPage + 1) });
          }}
        >
          <RightArrowIcon />
        </button>
      )}
    </li>
  );

  const pageButtons = pages.map((page) => {
    return (
      <li key={page} className="px-2">
        <button
          type="button"
          className={currentPage === page ? 'font-bold' : ''}
          onClick={(e) => {
            changeCurrentPage(Number(e.currentTarget.textContent));
            setSearchParams({ page: String(page) });
          }}
        >
          {page}
        </button>
      </li>
    );
  });

  return (
    <nav className="mt-5" role="navigation" aria-label="Pagination Navigation">
      <ul className="flex gap-x-1">
        {leftArrowButtons}
        {pageButtons}
        {rightArrowButton}
      </ul>
    </nav>
  );
}

export default Pagination;
