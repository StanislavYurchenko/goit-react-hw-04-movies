import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBox extends Component {
  state = {
    userQuery: '',
  };

  formReset = () => {
    this.setState({ userQuery: '' });
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = event => {
    event.preventDefault();
    const { userQuery } = this.state;
    const { onSubmit } = this.props;
    onSubmit(userQuery);
    this.setState({ userQuery: '' });
    this.formReset();
  };

  render() {
    const { userQuery } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="userQuery"
          onChange={this.onChange}
          value={userQuery}
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

SearchBox.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBox;
