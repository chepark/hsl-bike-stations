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
  const PAGE_LIMIT = 10;

  const generatePageNumbers = () => {
    const pages = [];
    const maxPage = Math.min(totalPages, PAGE_LIMIT);

    // Calculate the starting page number based on current page and total pages
    let startPage = Math.max(currentPage - Math.floor(PAGE_LIMIT / 2), 1);
    if (startPage + PAGE_LIMIT > totalPages) {
      startPage = 1;
    }

    for (let i = startPage; i <= startPage + maxPage - 1; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageButtons = generatePageNumbers().map((page) => (
    <li key={page} className="px-2">
      <button
        type="button"
        className={currentPage === page ? 'font-bold' : ''}
        onClick={() => {
          changeCurrentPage(page);
          setSearchParams({ page: String(page) });
        }}
      >
        {page}
      </button>
    </li>
  ));

  return (
    <nav className="mt-5" role="navigation" aria-label="Pagination Navigation">
      <ul className="flex flex-row justify-center gap-x-1">
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
        {pageButtons}
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
      </ul>
    </nav>
  );
}

export default Pagination;
