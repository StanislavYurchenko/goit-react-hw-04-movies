import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import PropTypes from 'prop-types';

function MoviePagination(props) {
  const {
    increaseCurrentPage,
    currentPage,
    decreaseCurrentPage,
    total_pages,
    setCurrentPage,
  } = props;

  //disabled={currentPage - 1 <= 0}

  const firstPaginationItemNumber = () => {
    return (
      (currentPage < 3 && 1) ||
      (currentPage > total_pages - 2 && total_pages - 2) ||
      currentPage - 1
    );
  };

  const secondPaginationItemNumber = () => {
    return (
      (currentPage < 3 && 2) ||
      (currentPage > total_pages - 2 && total_pages - 1) ||
      currentPage
    );
  };

  const thirdPaginationItemNumber = () => {
    return (
      (currentPage > total_pages - 2 && total_pages) ||
      (currentPage < 2 && 3) ||
      currentPage + 1
    );
  };

  return (
    <div>
      <Pagination>
        {total_pages >= 2 && (
          <Pagination.Prev
            onClick={() => decreaseCurrentPage(1)}
            disabled={currentPage === 1}
          />
        )}
        {total_pages > 3 && (
          <Pagination.Item
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            {1}
          </Pagination.Item>
        )}
        {total_pages > 3 && (
          <Pagination.Ellipsis
            disabled={currentPage - 3 < 1}
            onClick={() => decreaseCurrentPage(3)}
          />
        )}

        {total_pages >= 1 && (
          <Pagination.Item
            active={currentPage === 1}
            onClick={() => setCurrentPage(firstPaginationItemNumber())}
          >
            {firstPaginationItemNumber()}
          </Pagination.Item>
        )}

        {total_pages >= 2 && (
          <Pagination.Item
            active={
              (currentPage > 1 && currentPage < total_pages) ||
              currentPage === 2
            }
            onClick={() => setCurrentPage(secondPaginationItemNumber())}
          >
            {secondPaginationItemNumber()}
          </Pagination.Item>
        )}

        {total_pages >= 3 && (
          <Pagination.Item
            active={currentPage === total_pages}
            onClick={() => setCurrentPage(thirdPaginationItemNumber())}
          >
            {thirdPaginationItemNumber()}
          </Pagination.Item>
        )}

        {total_pages > 3 && (
          <Pagination.Ellipsis
            onClick={() => increaseCurrentPage(3)}
            disabled={currentPage + 3 > total_pages}
          />
        )}
        {total_pages > 3 && (
          <Pagination.Item
            onClick={() => setCurrentPage(total_pages)}
            disabled={currentPage === total_pages}
          >
            {total_pages}
          </Pagination.Item>
        )}
        {total_pages >= 2 && (
          <Pagination.Next
            onClick={() => increaseCurrentPage(1)}
            disabled={currentPage === total_pages}
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
  total_pages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default MoviePagination;
