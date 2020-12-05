import { lazy } from 'react';

const routesMain = [
  {
    path: '/',
    label: 'HomePage',
    exact: true,
    component: lazy(() =>
      import('./views/HomePage/HomePage' /* webpackChunkName: "HomePage" */),
    ),
  },
  {
    path: '/movies',
    label: 'MoviesPage',
    exact: true,
    component: lazy(() =>
      import(
        './views/MoviesPage/MoviesPage' /* webpackChunkName: "MoviesPage" */
      ),
    ),
  },
  {
    path: '/movies/:movieId',
    label: 'MovieDetailsPage',
    exact: false,
    component: lazy(() =>
      import(
        './views/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */
      ),
    ),
  },
  {
    path: null,
    label: 'NotFound',
    exact: false,
    component: lazy(() =>
      import('./views/NotFound/NotFound' /* webpackChunkName: "NotFound" */),
    ),
  },
];

const routesDetailPage = [
  {
    path: '/cast',
    label: 'Cast',
    exact: true,
    component: lazy(() =>
      import('./views/Cast/Cast' /* webpackChunkName: "Cast" */),
    ),
  },
  {
    path: '/reviews',
    label: 'Reviews',
    exact: true,
    component: lazy(() =>
      import('./views/Reviews/Reviews' /* webpackChunkName: "Reviews" */),
    ),
  },
];

export { routesMain, routesDetailPage };
