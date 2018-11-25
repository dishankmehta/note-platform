import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from  'redux';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import './SideBar.css';
import ProfilePage from "../ProfilePage/ProfilePage";

class SideBar extends Component {
  render(){
    return (
      <div className = "container" >
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
    );  
  }  
}

export default SideBar;