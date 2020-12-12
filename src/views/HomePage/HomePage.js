import React, { Component, useState, useEffect } from 'react';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // setCurrentPage(parseQueryString(location.search));

  const getPopularMovie = () => {
    popularFetch(+currentPage).then(({ results, total_pages }) => {
      setPopularList(results);
      setTotalPages(total_pages);
    });
  };

  const increaseCurrentPage = (number = 1) => {
    history.push({
      ...location,
      search: `currentPage=${+parseQueryString(currentPage) + number}`,
    });
  };

  const decreaseCurrentPage = (number = 1) => {
    history.push({
      ...location,
      search: `currentPage=${+parseQueryString(currentPage) + number}`,
    });
  };

  const pathToMoviePage = routesMain.find(route => route.label === 'MoviesPage')
    .path;

  useEffect(() => {
    getPopularMovie();

    history.push({
      ...location,
      search: `currentPage=${+currentPage ? +currentPage : 1}`,
    });
  }, []);

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
            currentPage={+currentPage}
            total_pages={totalPages}
          />
        </>
      )}
    </section>
  );
}

// class HomePage1 extends Component {
//   state = {
//     popularList: [],
//     error: false,
//     loading: false,
//     currentPage: 1,
//     total_pages: null,
//   };

//   componentDidMount = () => {
//     this.getPopularMovie();
//     const { history, location } = this.props;
//     const { currentPage } = parseQueryString(location.search);

//     history.push({
//       ...location,
//       search: `currentPage=${+currentPage ? +currentPage : 1}`,
//     });
//   };

//   componentDidUpdate = (prevProps, prevState) => {
//     const { location } = this.props;
//     const { currentPage: prevCurrentPage } = parseQueryString(
//       prevProps.location.search,
//     );
//     const { currentPage: nextCurrentPage } = parseQueryString(location.search);

//     if (prevCurrentPage !== nextCurrentPage) {
//       this.getPopularMovie();
//     }
//   };

//   getPopularMovie = () => {
//     const { location } = this.props;
//     const { currentPage } = parseQueryString(location.search);
//     popularFetch(+currentPage).then(({ results, total_pages }) =>
//       this.setState({ popularList: results, total_pages: total_pages }),
//     );
//   };

//   increaseCurrentPage = (number = 1) => {
//     const { history, location } = this.props;
//     const { currentPage } = parseQueryString(location.search);
//     history.push({
//       ...location,
//       search: `currentPage=${+currentPage + number}`,
//     });
//   };

//   decreaseCurrentPage = (number = 1) => {
//     const { history, location } = this.props;
//     const { currentPage } = parseQueryString(location.search);
//     history.push({
//       ...location,
//       search: `currentPage=${+currentPage + number}`,
//     });
//   };

//   setCurrentPage = (number = 1) => {
//     const { history, location } = this.props;
//     history.push({
//       ...location,
//       search: `currentPage=${number}`,
//     });
//   };

//   render() {
//     const { popularList } = this.state;
//     const { location } = this.props;
//     const { currentPage } = parseQueryString(location.search);

//     const pathToMoviePage = routesMain.find(
//       route => route.label === 'MoviesPage',
//     ).path;

//     return (
//       <section>
//         <h2>HomePage</h2>
//         {popularList.length > 0 && (
//           <>
//             <ul>
//               {popularList.map(({ id, original_title, original_name }) => {
//                 return (
//                   <li key={id}>
//                     <Link
//                       to={{
//                         pathname: `${pathToMoviePage}/${id}`,
//                         state: { from: location },
//                       }}
//                     >
//                       {original_title || original_name}
//                     </Link>
//                   </li>
//                 );
//               })}
//             </ul>
//             <MoviePagination
//               increaseCurrentPage={this.increaseCurrentPage}
//               decreaseCurrentPage={this.decreaseCurrentPage}
//               setCurrentPage={this.setCurrentPage}
//               currentPage={+currentPage}
//               total_pages={this.state.total_pages}
//             />
//           </>
//         )}
//       </section>
//     );
//   }
// }

// HOW TO DO THIS CORRECT??????????????
HomePage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default HomePage;
