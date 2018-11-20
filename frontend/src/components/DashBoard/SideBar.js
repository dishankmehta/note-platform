import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from  'redux';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import './SideBar.css';

class SideBar extends Component {
  render(){
    return (
      <div className = "container" >
        <Menu>
          <Link className="menu-item" to ="/">
            Home  </Link>

          <Link className = "menu-item" to = "/cheatsheet"> 
            Cheat Sheet </Link>

          <Link className = "menu-item" to = '/trendingnotes'>
            Trending Notes </Link>

          <Link className = "menu-item" to = '/mynotes'>
            My Notes </Link>
          
          <Link className = "menu-item" to = '/privatenotes'>
            My Private Notes </Link>  
  
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