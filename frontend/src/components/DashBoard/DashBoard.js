import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from  'redux';
import SideBar from './SideBar';
import MainNotes from './MainNotes'; 

class DashBoard extends Component {
    render() {
      return(
      <div>
          <SideBar />
          <MainNotes />   
      </div>
    );  
  }  
}

export default DashBoard;