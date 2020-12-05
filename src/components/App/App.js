import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { routesMain } from '../../routes';
import Layout from '../Layout/Layout';

const App = () => {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {routesMain.map(route => (
            <Route key={route.label} {...route} />
          ))}
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default App;
