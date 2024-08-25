import React from "react";

function Pagination({ currentPage, totalItems, itemsPerPage, setCurrentPage }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="pagination">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {[...Array(totalPages).keys()].map((number) => (
        <button
          key={number}
          onClick={() => setCurrentPage(number + 1)}
          className={currentPage === number + 1 ? "active" : ""}
        >
          {number + 1}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
