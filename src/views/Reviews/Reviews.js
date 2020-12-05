import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUserReviewsAboutFilmById } from '../../services/themoviedbApi';

class Reviews extends Component {
  state = {
    reviews: [],
    page: 1,
    error: false,
    loading: false,
  };

  componentDidMount = () => {
    const { match } = this.props;
    const { movieId } = match.params;
    const { page } = this.state;

    getUserReviewsAboutFilmById(movieId, page).then(res => {
      this.setState({ reviews: res.results });
    });
  };

  render() {
    const { reviews } = this.state;

    return (
      <>
        <h2> Reviews</h2>

        {reviews.length > 0 && (
          <ul>
            {reviews.map(({ author, content, id }) => {
              return (
                <li key={id}>
                  <h3>{author}</h3>
                  <p>{content}</p>
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
Reviews.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default Reviews;
