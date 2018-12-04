import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../components/LoginPage/LoginPage';
import Register from '../components/RegisterPage/Register';
import DashBoard from '../components/DashBoard/DashBoard';
import AuthenticateUser from './AuthenticateUser';


const AppRoutes = () => (
	<div>
		<Switch>
			<Route exact path="/" component={LoginPage}/>
			<Route path="/register" component={Register}/>
			<Route path="/dashboard" component={DashBoard} onEnter={AuthenticateUser}/>
		</Switch>
	</div>
);

export default AppRoutes;
