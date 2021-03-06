import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.js';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


import App from './pages/App';
import PostsIndex from './pages/PostsIndex';
import PostsNew from './pages/PostsNew';
import PostsShow from './pages/PostsShow';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPwd from './pages/ForgotPwd';
import ValidateEmail from './pages/ValidateEmail';

// Admin Routes
import StudioCreation from './pages/admin/StudioCreation';
import StudioEdit from './pages/admin/StudioEdit';
import Studio from './pages/admin/Studio';


import Profile from './pages/Profile';


const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
       <App>
        <Router>
       		<Switch>
			    <Route exact path="/" component={PostsIndex} /> 

			    // FrontStore Routes
			    <Route path = "/signup" component = { SignUp } /> 


			    // Admin Routes
			    <Route path = "/admin/studio/new" component = { StudioCreation } /> 
			    <Route path = "/admin/studio/edit/:id" component = { StudioEdit } /> 
			    <Route path = "/admin/studio/:id" component = { Studio } /> 

			    // Studio Site Routes
			    <Route path = "posts/:id" component = { PostsShow } />
			    <Route path = "/signin" component = { SignIn } /> 
			    <Route path = "/forgotPwd" component = { ForgotPwd } />
			    <Route path = "/validateEmail/:token" component = { ValidateEmail } />
			    <Route path = "/profile" component = { Profile }/>
			</Switch>
 	 	</Router>
 	 	</App>
 	</Provider>,
    document.getElementById('body'));