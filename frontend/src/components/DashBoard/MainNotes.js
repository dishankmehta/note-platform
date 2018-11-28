import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import { getPublicNotes } from '../../actions/sessionActions'

import NotesPopup from '../NotesPopup/NotesPopup';
import EditNotes from '../EditNotes/EditNotes';
import DeleteNotes from '../DeleteNotes/DeleteNotes';
import { Card } from '../CustomComponents/Card';


import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import DeleteIcon from '@material-ui/icons/Delete';
import LikeIcon from '@material-ui/icons/ThumbUp';
import DisLikeIcon from '@material-ui/icons/ThumbDown';
import Button from '@atlaskit/button';

import './MainNotes.css';


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
    this.props.getPublicNotes(data);
  }

  renderAllNotes = (notes) => {
    let noteArr = [];
    noteArr.push(
      Object.keys(notes).map((item) => {
        const note_item = notes[item];
        return <Card key={item} color={note_item.color}>
          <div style={{fontSize: "1.2em"}}>
            {note_item.title}
          </div>
          <br />
          <div>
            <div style={{height: "140px", overflow: "auto"}}>
              {note_item.note_body}
            </div>
            <br />
            {/* <EditNotes 
              title = {note_item.title}
              note_body = {note_item.note_body}
              color = {note_item.color}
              note_type = {note_item.note_type}
              tags = {note_item.tags}
              note_id = { note_item.id }
              show={this.state.isEditOpen}
              onClose={this.toggleEditModal}>
              `Here's some content for the modal`
            </EditNotes> */}
            <div style={{float: "right", marginTop: "5px"}}>
              <LikeIcon style={{padding: "5px", cursor: "pointer"}}/>
              <DisLikeIcon style={{padding: "5px", cursor: "pointer"}}/>
              <EditNotes 
                  edit={true}
                  title={note_item.title}
                  note_body={note_item.note_body}
                  color={note_item.color}
                  note_type={note_item.note_type}
                  tags={[note_item.tags]}
                  note_id={note_item.note_id}
                  upvotes={note_item.upvotes}
                  downvotes={note_item.downvotes}
                  views={note_item.views} />
              <DeleteIcon style={{padding: "5px", cursor: "pointer"}}/>
            </div>
            {/* <DeleteNotes
                title = {note_item.title}
                note_body = {note_item.note_body}
                color = {note_item.color}
                note_type = {note_item.note_type}
                tags = {note_item.tags}
                note_id = { note_item.id }>
                `Here's some content for the modal`
            </DeleteNotes> */}
          </div>
        </Card>
        }
      ));
    return noteArr;
  }

  render(){
    const username = this.props.session.currentUser;
    const notes = this.props.session.notes;
    if(isEmpty(notes)){
      return (
        <div>
            <div className = "main-style">
              <div className = "welcome-style">
                { this.props.session.currentUser.toUpperCase()} , Welcome to Study Genie
              </div>
              <div className = "secondDiv-style">
                <span> Note taking made easier! </span>
              </div>
              <div className = "create-new-note">
                <NotesPopup />
              </div>
            </div>        
        </div>
      );  
    }
    else if(!isEmpty(notes)){
      return(
        <div>
          <div className="col-xs-12" style={{float: "right", marginTop: "5px"}}>
            <NotesPopup />
          </div>
          <h2 className = "notesheadingstyle"> My Public Notes </h2>
          <div style={{display: "inline"}}>
            {this.renderAllNotes(notes)}
          </div>
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