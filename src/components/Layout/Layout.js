import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '../AppBar/AppBar';

function Layout({ children }) {
  return (
    <>
      <AppBar />
      {children}
    </>
  );
}

Layout.protoTypes = {
  children: PropTypes.node,
};

export default Layout;
