import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.js';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


import App from './pages/App';
import PostsIndex from './pages/PostsIndex';
import PostsNew from './pages/PostsNew';
import StudioCreation from './pages/StudioCreation';
import PostsShow from './pages/PostsShow';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPwd from './pages/ForgotPwd';
import ValidateEmail from './pages/ValidateEmail';

import Profile from './pages/Profile';


const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
       <App>
        <Router>
       		<Switch>
			    <Route exact path="/" component={PostsIndex} /> 
			    < Route path = "/studios/new" component = { StudioCreation } /> 
			    < Route path = "posts/:id"
				component = { PostsShow }
				/> <
				Route path = "/signin"
				component = { SignIn }
				/> <
				Route path = "/signup"
				component = { SignUp }
				/> <
				Route path = "/forgotPwd"
				component = { ForgotPwd }
				/> <
				Route path = "/validateEmail/:token"
				component = { ValidateEmail }
				/> <
				Route path = "/profile"
				component = { Profile }
				/>
			</Switch>
 	 	</Router>
 	 	</App>
 	</Provider>,
    document.getElementById('body'));