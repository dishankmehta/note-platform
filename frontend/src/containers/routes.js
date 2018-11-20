import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../components/LoginPage/LoginPage';
import DashBoard from '../components/DashBoard/DashBoard';
//import ColorPicker from '../components/ColorPicker/ColorPicker';

const AppRoutes = () => (
	<div>
		<Switch>
			<Route exact path="/" component={LoginPage}/>
			<Route path="/dashboard" component={DashBoard}/>
		</Switch>
	</div>



);

export default AppRoutes;
