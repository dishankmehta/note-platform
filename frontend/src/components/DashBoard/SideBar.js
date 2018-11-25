import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu';
import history from '../../history';
import MainNotes from './MainNotes';

import './SideBar.css';
import ProfilePage from "../ProfilePage/ProfilePage";

class SideBar extends Component {
  render(){
    return (
      <Router>
        <div className="container">
            <div style={{width: "5%"}}>
              <Menu>
                <Link className="menu-item" to ="/dashboard">
                  My Notes  </Link>

                <Link className = "menu-item" to = "/cheatsheet"> 
                  Cheat Sheets </Link>

                <Link className = "menu-item" to = '/recommendednotes'>
                  Recommended Notes </Link>

                <Link className = "menu-item" to = '/groupnotes'>
                  Collaborative Notes </Link>
        
                <Link className = "menu-item" to = '/profile'>
                  Profile </Link>

                <Link className = "menu-item" to = '/'>
                  Logout </Link>      
            </Menu>
          </div>
          
          <div style={{width: "95%"}}>
            <nav className={"app-nav"}>
              <Route path={"/dashboard"} exact={true} component={MainNotes}/>
            </nav>
          </div>
        </div>
      </Router>
      
    );  
  }  
}

export default SideBar;