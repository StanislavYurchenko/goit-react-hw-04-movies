import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getCastsByMovieId,
  BASE_URL_POSTER,
} from '../../services/themoviedbApi';

function Cast({ match }) {
  const { movieId } = match.params;

  const [cast, setCast] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getCastsByMovieId(movieId)
      .then(res => setCast(res.cast))
      .catch(setError(true))
      .finally(setLoading(false));
  }, [movieId]);

  return (
    <>
      <h2> Cast </h2>
      {loading && <div>Loading....</div>}
      {cast.length > 0 && (
        <ul>
          {cast.map((actor, id) => {
            return (
              <li key={actor.id + id}>
                <h4>{actor.name}</h4>
                <img
                  src={`${BASE_URL_POSTER}${actor.profile_path}`}
                  alt={actor.name}
                  width={100}
                />
              </li>
            );
          })}
        </ul>
      )}
      {cast.length === 0 && <div>List is empty!</div>}
    </>
  );
}

// HOW TO DO THIS CORRECT??????????????
Cast.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default Cast;
