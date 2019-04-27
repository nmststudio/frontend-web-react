/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import { connect } from 'react-redux';

import { meFromToken, meFromTokenSuccess, meFromTokenFailure, resetToken } from '../../actions/users';

import HomePage from 'containers/HomePage/Loadable';
import Admin from 'containers/Admin/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  background-color: #fc0;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/admin" component={Admin} />
        <Route component={NotFoundPage} />
      </Switch>
      
      <GlobalStyle />
    </AppWrapper>
  );
}