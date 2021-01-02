import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { searchMoviesByKeyword } from '../../services/themoviedbApi';
import SearchBox from '../../components/SearchBox/SearchBox';
import MoviePagination from '../../components/MoviePagination/MoviePagination';
import parseQueryString from '../../utils/parseQueryString';

class MoviesPage extends Component {
  state = {
    searchList: [],
    error: false,
    loading: false,
    totalPages: 1,
  };

  componentDidMount = () => {
    const { location } = this.props;
    const { userQuery } = parseQueryString(location.search);
    if (userQuery) {
      this.searchMovie(userQuery, 1);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { location } = this.props;

    const { userQuery: prevQuery } = parseQueryString(
      prevProps.location.search,
    );
    const { userQuery: nextQuery } = parseQueryString(location.search);

    const { currentPage: prevCurrentPage } = parseQueryString(
      prevProps.location.search,
    );
    const { currentPage: nextCurrentPage } = parseQueryString(location.search);

    if (prevQuery !== nextQuery) {
      this.searchMovie(nextQuery, 1);
    }

    if (prevCurrentPage !== nextCurrentPage) {
      this.searchMovie(nextQuery, nextCurrentPage);
      console.log('current page was change');
    }
  };

  searchMovie = (query, page) => {
    searchMoviesByKeyword(query, page).then(({ results, total_pages }) =>
      this.setState({ searchList: results, totalPages: total_pages }),
    );
  };

  onChangeQuery = query => {
    const { history, location } = this.props;
    const currentPage =
      Number(parseQueryString(location.search).currentPage) || 1;

    history.push({
      ...location,
      search: `currentPage=${currentPage}&userQuery=${query}`,
    });
  };

  setCurrentPage = pageNumber => {
    const { history, location } = this.props;
    const { userQuery } = parseQueryString(location.search);

    history.push({
      ...location,
      search: `currentPage=${pageNumber}&userQuery=${userQuery}`,
    });
  };

  increaseCurrentPage = (pageNumber = 1) => {
    const { history, location } = this.props;
    const { userQuery } = parseQueryString(location.search);
    const currentPage =
      Number(parseQueryString(location.search).currentPage) || 1;

    history.push({
      ...location,
      search: `currentPage=${currentPage + pageNumber}&userQuery=${userQuery}`,
    });
  };

  decreaseCurrentPage = (pageNumber = 1) => {
    const { history, location } = this.props;
    const currentPage =
      Number(parseQueryString(location.search).currentPage) || 1;
    const { userQuery } = parseQueryString(location.search);

    history.push({
      ...location,
      search: `currentPage=${currentPage - pageNumber}&userQuery=${userQuery}`,
    });
  };

  render() {
    const { searchList, totalPages } = this.state;
    const { match, location } = this.props;
    const { userQuery } = parseQueryString(location.search);

    const currentPage =
      Number(parseQueryString(location.search).currentPage) || 1;

    return (
      <>
        <SearchBox onSubmit={this.onChangeQuery} />
        <h2>MoviesPage</h2>
        {searchList.length > 0 && userQuery && (
          <>
            <ul>
              {searchList.map(({ id, original_title, original_name }) => {
                return (
                  <li key={id}>
                    <Link
                      to={{
                        pathname: `${match.url}/${id}`,
                        state: { from: this.props.location },
                      }}
                    >
                      {original_title || original_name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <MoviePagination
              increaseCurrentPage={this.increaseCurrentPage}
              decreaseCurrentPage={this.decreaseCurrentPage}
              setCurrentPage={this.setCurrentPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </>
        )}
      </>
    );
  }
}

// HOW TO DO THIS CORRECT??????????????
MoviesPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default MoviesPage;
