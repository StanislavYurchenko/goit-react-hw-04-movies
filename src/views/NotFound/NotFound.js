import React from 'react';
import { Link } from 'react-router-dom';
import { routesMain } from '../../routes';

function NotFound() {
  const pathToHomePage = routesMain.find(route => route.label === 'HomePage').path;
  return (
    <section>
      <h2> page not found </h2>
      <p>
        <Link to={pathToHomePage}>link</Link>
        to main screen
      </p>
    </section>
  );
}

export default NotFound;
