import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../components/LoginPage/LoginPage';
import Register from '../components/RegisterPage/Register';
import Demo from '../components/Note/Demo';
import Note from '../components/Note/Note';

const AppRoutes = () => (
	<div>
		<Switch>
			<Route exact path="/" component={LoginPage}/>
			<Route path="/register" component={Register}/>
			<Route path="/dashboard" component={null}/>
			<Route path="/demo/:note_id" component={Note}/>
			<Route path="/demo" component={Demo}/>
		</Switch>
	</div>

);

export default AppRoutes;
