import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../components/LoginPage/LoginPage';
import Register from '../components/RegisterPage/Register';
import DashBoard from '../components/DashBoard/DashBoard';
import AuthenticateUser from './AuthenticateUser';
import SideBar from '../components/DashBoard/SideBar';


const AppRoutes = () => (
	<div>
		<Switch>
			<Route exact path="/" component={LoginPage}/>
			<Route path="/register" component={Register}/>
			<Route path="/dashboard" component={DashBoard} onEnter={AuthenticateUser}/>
				<Route path={"/dashboard"} exact={true} component={SideBar}/>  
                <Route path={"/groupnotes"} exact={true} component={SideBar}/>  
                <Route path={"/profile"} exact={true} component={SideBar}/>  
		</Switch>
	</div>
);

export default AppRoutes;
