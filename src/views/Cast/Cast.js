import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCastsByMovieId, BASE_URL_POSTER } from '../../services/themoviedbApi';

class Cast extends Component {
  state = {
    cast: null,
    error: false,
    loading: false,
  };
  componentDidMount = () => {
    const { match } = this.props;
    const { movieId } = match.params;
    getCastsByMovieId(movieId).then(res => this.setState({ cast: res.cast }));
  };

  render() {
    const { cast } = this.state;
    return (
      <>
        <h2> Cast </h2>
        {cast && (
          <ul>
            {cast.map((actor, id) => {
              return (
                <li key={actor.id + id}>
                  <h4>{actor.name}</h4>
                  <img src={`${BASE_URL_POSTER}${actor.profile_path}`} alt={actor.name} width={100} />
                </li>
              );
            })}
          </ul>
        )}
      </>
    );
  }
}

// HOW TO DO THIS CORRECT??????????????
Cast.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default Cast;
