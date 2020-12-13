import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import PropTypes from 'prop-types';

function MoviePagination(props) {
  const {
    increaseCurrentPage,
    currentPage,
    decreaseCurrentPage,
    totalPages,
    setCurrentPage,
  } = props;

  const firstPaginationItemNumber = () => {
    return (
      (currentPage < 3 && 1) ||
      (currentPage > totalPages - 2 && totalPages - 2) ||
      currentPage - 1
    );
  };

  const secondPaginationItemNumber = () => {
    return (
      (currentPage < 3 && 2) ||
      (currentPage > totalPages - 2 && totalPages - 1) ||
      currentPage
    );
  };

  const thirdPaginationItemNumber = () => {
    return (
      (currentPage > totalPages - 2 && totalPages) ||
      (currentPage < 2 && 3) ||
      currentPage + 1
    );
  };

  return (
    <div>
      <Pagination>
        {totalPages >= 2 && (
          <Pagination.Prev
            onClick={() => decreaseCurrentPage(1)}
            disabled={currentPage === 1}
          />
        )}

        {totalPages > 3 && (
          <Pagination.Item
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            {1}
          </Pagination.Item>
        )}

        {totalPages > 3 && (
          <Pagination.Ellipsis
            disabled={currentPage - 3 < 1}
            onClick={() => decreaseCurrentPage(3)}
          />
        )}

        {totalPages >= 1 && (
          <Pagination.Item
            active={currentPage === 1}
            onClick={() => setCurrentPage(firstPaginationItemNumber())}
          >
            {firstPaginationItemNumber()}
          </Pagination.Item>
        )}

        {totalPages >= 2 && (
          <Pagination.Item
            active={
              (currentPage > 1 && currentPage < totalPages) || currentPage === 2
            }
            onClick={() => setCurrentPage(secondPaginationItemNumber())}
          >
            {secondPaginationItemNumber()}
          </Pagination.Item>
        )}

        {totalPages >= 3 && (
          <Pagination.Item
            active={currentPage === totalPages}
            onClick={() => setCurrentPage(thirdPaginationItemNumber())}
          >
            {thirdPaginationItemNumber()}
          </Pagination.Item>
        )}

        {totalPages > 3 && (
          <Pagination.Ellipsis
            onClick={() => increaseCurrentPage(3)}
            disabled={currentPage + 3 > totalPages}
          />
        )}

        {totalPages > 3 && (
          <Pagination.Item
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            {totalPages}
          </Pagination.Item>
        )}

        {totalPages >= 2 && (
          <Pagination.Next
            onClick={() => increaseCurrentPage(1)}
            disabled={currentPage === totalPages}
          />
        )}
      </Pagination>
    </div>
  );
}

MoviePagination.propTypes = {
  increaseCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  decreaseCurrentPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default MoviePagination;
