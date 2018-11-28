import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import { getPublicNotes } from '../../actions/sessionActions'
import { getPrivateNotes } from '../../actions/sessionActions'
import NotesPopup from '../NotesPopup/NotesPopup';
import EditNotes from '../EditNotes/EditNotes';
import DeleteNotes from '../DeleteNotes/DeleteNotes';

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

    this.state = {
      isEditOpen : false
    }
  }

  toggleEditModal = () => {
    this.setState({
      isEditOpen: !this.state.isEditOpen
    });
  }



  componentDidMount() {
    let data = {user_id:this.props.session.currentUser};
    this.props.getPrivateNotes(data);
    this.props.getPublicNotes(data);
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
            <a> Delete </a>
            </div>
            <EditNotes 
              title = {note_item.title}
              note_body = {note_item.note_body}
              color = {note_item.color}
              note_type = {note_item.note_type}
              tags = {note_item.tags}
              note_id = { note_item.id }
              show={this.state.isEditOpen}
              onClose={this.toggleEditModal}>
              `Here's some content for the modal`
          </EditNotes>

                <DeleteNotes
                    title = {note_item.title}
                    note_body = {note_item.note_body}
                    color = {note_item.color}
                    note_type = {note_item.note_type}
                    tags = {note_item.tags}
                    note_id = { note_item.id }>
                    `Here's some content for the modal`
                </DeleteNotes>

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
    const privateNotes = this.props.session.privateNotes;
    const publicNotes = this.props.session.publicNotes;
    if(isEmpty(privateNotes) && isEmpty(publicNotes)){
      console.log('NOTIFY 3', privateNotes);
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
    }else if(!isEmpty(privateNotes) && !isEmpty(publicNotes)){
      return(
        <div className = "welcome-style">
        <div>
          <h1>Public Notes</h1>
          {this.renderAllNotes(publicNotes)}
        </div>
        <div>
          <h1>Private Notes</h1>
          {this.renderAllNotes(privateNotes)}
        </div>
        </div>
      );  
    }else if(!isEmpty(privateNotes)){
      return(
        <div className = "welcome-style">
          <h1>Private Notes</h1>
          {this.renderAllNotes(privateNotes)}
        </div>);
    }
    else{
      return(
        <div>
          <h1>Public Notes</h1>
          {this.renderAllNotes(publicNotes)}
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
    return bindActionCreators({ getPrivateNotes, getPublicNotes }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(MainNotes);