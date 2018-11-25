import React, { Component } from 'react';
// // import { connect } from 'react-redux';
// import { bindActionCreators } from  'redux';
import NotesPopup from '../NotesPopup/NotesPopup';
import { Card } from '../CustomComponents/Card';
import './MainNotes.css';
import isEmpty from 'lodash/isEmpty';

class MainNotes extends Component {
  constructor(props){
    super(props);
    this.arr = [
        {
          title: 'Title 1',
          content: 'My content in note 1 is unimportant.'
        },
        {
          title: 'Title 2',
          content: 'My content in note2 is really important.'
        },
        {
          title: 'Title 3',
          content: 'My content in note 3 is very very important.'
        }
      ]
  }

  render(){
    if(!isEmpty(this.arr)){
    return (
      <div>
          <div className = "main-style">
            <span className = "span-style"> </span>
            <div className = "welcome-style">
              Welcome to Study Genie
            </div>
            <div className = "secondDiv-style">
              <span className = "secondSpan-style"> Note taking made easier! </span>
            </div>
            <div className = "divButtonStyle">
              <div className = "div2ButtonStyle">
                  <NotesPopup />
                </div>
            </div>
          </div>        
      </div>
    );  

    }
    else{
      return(
        <div> hi </div>
      );
      
  }  
    }
}

export default MainNotes;