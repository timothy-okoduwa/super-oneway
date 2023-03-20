import React from 'react';
import './Pagination.css';
const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
const pageNumbers =
  nPages > 0 && Number.isInteger(nPages)
    ? [...Array(nPages + 1).keys()].slice(1)
    : [];

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <nav>
      <div class="pagination justify-content-center mt-5">
        <a className="twite" onClick={prevPage}>
          &laquo;
        </a>
        {pageNumbers.map((pgNumber) => (
          <a
            key={pgNumber}
            onClick={() => setCurrentPage(pgNumber)}
            className={` ${currentPage === pgNumber ? 'active' : 'null'} `}
          >
            <div>{pgNumber}</div>
          </a>
        ))}
        <a className="twite2" onClick={nextPage}>
          &raquo;
        </a>
      </div>
    </nav>
  );
};

export default Pagination;
