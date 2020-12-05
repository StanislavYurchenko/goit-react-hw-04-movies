import React from 'react';
import { NavLink } from 'react-router-dom';
import { routesMain } from '../../routes';

const Navigation = () => (
  <nav>
    <ul>
      {routesMain.map(
        (route, index) =>
          index < 2 && (
            <li key={route.label}>
              <NavLink to={route.path} className="Nav-link" activeClassName="Nav-link-active" exact>
                {route.label}
              </NavLink>
            </li>
          ),
      )}
    </ul>
  </nav>
);

export default Navigation;
