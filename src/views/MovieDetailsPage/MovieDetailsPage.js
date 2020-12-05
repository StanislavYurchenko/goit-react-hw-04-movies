import React, { Component, Suspense } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import isImage from 'is-image';
import NotFound from '../../views/NotFound/NotFound';
import { routesMain, routesDetailPage } from '../../routes';
import {
  gethMovieDetailsById,
  BASE_URL_POSTER,
} from '../../services/themoviedbApi';
import noImage from './no-img.jpg';

class MovieDetailsPage extends Component {
  state = {
    movie: null,
    error: false,
    loading: false,
    imagePath: noImage,
  };

  componentDidMount = () => {
    const { match } = this.props;

    if (match) {
      const { movieId } = match.params;
      gethMovieDetailsById(movieId)
        .then(res => {
          this.setState({ movie: res, error: false });
        })
        .catch(error => {
          console.log('error', error);
          this.setState({ error: true });
        });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const prevMovie = prevState.movie;
    const { movie, error } = this.state;

    if (prevMovie !== movie && !error) {
      const path = `${BASE_URL_POSTER}${movie.poster_path}`;
      const imgPath = isImage(path) ? path : noImage;
      this.setState({ imagePath: imgPath });
    }
  };

  onGoBack = () => {
    const {
      history,
      location: { state },
    } = this.props;

    if (state && state.from) {
      history.push(state.from);
      return;
    }

    const pathToMoviePage = routesMain.find(
      route => route.label === 'MoviesPage',
    ).path;
    history.push(pathToMoviePage);
  };

  render() {
    const { match } = this.props;
    const { movie, error, imagePath } = this.state;

    return movie && !error ? (
      <section>
        <h2> MovieDetailsPage</h2>
        <h2>{movie.title}</h2>
        <div>{movie.release_date}</div>
        <img src={imagePath} alt={movie.title} width="150" />
        <br></br>
        {routesDetailPage.map(route => (
          <Link key={route.label} to={`${match.url}${route.path}`}>
            {route.label}
          </Link>
        ))}
        <br></br>
        <button type="button" onClick={this.onGoBack}>
          Go back
        </button>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {routesDetailPage.map(route => (
              <Route
                key={route.label}
                {...route}
                path={`${match.path}${route.path}`}
              />
            ))}
          </Switch>
        </Suspense>
      </section>
    ) : (
      <NotFound />
    );
  }
}

// HOW TO DO THIS CORRECT??????????????
MovieDetailsPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default MovieDetailsPage;
