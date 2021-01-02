import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { popularFetch } from '../../services/themoviedbApi';
import { routesMain } from '../../routes';
import MoviePagination from '../../components/MoviePagination/MoviePagination';
import parseQueryString from '../../utils/parseQueryString';

function HomePage({ history, location }) {
  const [popularList, setPopularList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const currentPage =
    Number(parseQueryString(location.search).currentPage) || 1;

  const setCurrentPage = pageNumber => {
    history.push({
      ...location,
      search: `currentPage=${pageNumber}`,
    });
  };

  const increaseCurrentPage = (pageNumber = 1) => {
    history.push({
      ...location,
      search: `currentPage=${currentPage + pageNumber}`,
    });
  };

  const decreaseCurrentPage = (pageNumber = 1) => {
    history.push({
      ...location,
      search: `currentPage=${currentPage - pageNumber}`,
    });
  };

  const pathToMoviePage = routesMain.find(route => route.label === 'MoviesPage')
    .path;

  useEffect(() => {
    const getPopularMovie = () => {
      popularFetch(currentPage).then(({ results, total_pages }) => {
        setPopularList(results);
        setTotalPages(total_pages);
      });
    };

    getPopularMovie();
  }, [currentPage, history, location]);

  return (
    <section>
      <h2>HomePage</h2>
      {popularList.length > 0 && (
        <>
          <ul>
            {popularList.map(({ id, original_title, original_name }) => {
              return (
                <li key={id}>
                  <Link
                    to={{
                      pathname: `${pathToMoviePage}/${id}`,
                      state: { from: location },
                    }}
                  >
                    {original_title || original_name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <MoviePagination
            increaseCurrentPage={increaseCurrentPage}
            decreaseCurrentPage={decreaseCurrentPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </section>
  );
}

// HOW TO DO THIS CORRECT??????????????
HomePage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default HomePage;
