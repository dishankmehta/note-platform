import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import { getPublicNotes } from '../../actions/sessionActions'
import NotesPopup from '../NotesPopup/NotesPopup';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Card } from '../CustomComponents/Card';
import './MainNotes.css';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class MainNotes extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    let data = {user_id:this.props.session.currentUser};
    this.props.getPublicNotes(data);
    // console.log(this.props.session.currentUser);
  }

  renderAllNotes = (notes) => {
    let noteArr = [];
    noteArr.push(
      Object.keys(notes).map((item) => {
        const note_item = notes[item];
        return <Card key={item} color={note_item.color}>
          <div>
            {note_item.title}
            </div>
            <br />
            <div>
            {note_item.note_body}
            <br />
            <div>
              <button onClick = { () => {{this.onEditNotes();}} }> Edit </button>
              <a> Delete </a>
            </div>
         </div>
          </Card>
        }
      ));
    return noteArr;
  }

  onEditNotes = () => {
        console.log("hello")

    return(
    <div className = "div2ButtonStyle">

                  <NotesPopup />
                </div>
                 );
  }


  render(){
    const username = this.props.session.currentUser;
    console.log('NOTIFY', this.props.session.notes);
    const notes = this.props.session.notes;
    console.log('NOTIFY 2', notes);
    if(isEmpty(notes)){
      console.log('NOTIFY 3', notes);
    return (
      <div>
          <div className = "main-style">
            <span className = "span-style"> </span>
            <div className = "welcome-style">
              {`${this.props.session.currentUser}`}, Welcome to Study Genie
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
    else if(!isEmpty(notes)){
      return(
        <div>
          <div className="col-xs-12">
            <NotesPopup />
          </div>
          <h2 className = "notesheadingstyle"> My Public Notes </h2>
          {this.renderAllNotes(notes)}
        </div>    
      );  
    }      
  }  
}


const mapStateToProps = (state) =>{
    return{
        session: {...state.session}
    }; 
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getPublicNotes }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(MainNotes);