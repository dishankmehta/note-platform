import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';

import NotesPopup from '../NotesPopup/NotesPopup';
import EditNotes from '../EditNotes/EditNotes';
import { getRecommendedNotes } from '../../actions/sessionActions'
import { sendUpVoteNoteData } from '../../actions/sessionActions';
import { sendDownVoteNoteData } from '../../actions/sessionActions';
import { sendDeleteNoteData } from '../../actions/sessionActions';
import { Card } from '../CustomComponents/Card';


import isEmpty from 'lodash/isEmpty';

import DeleteIcon from '@material-ui/icons/Delete';
import LikeIcon from '@material-ui/icons/ThumbUp';
import DisLikeIcon from '@material-ui/icons/ThumbDown';

import '../DashBoard/MainNotes.css';



class RecommendedNotes extends Component {
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
    this.props.getRecommendedNotes(data);
  }

  onUpVoteNote = (note_id) => {
    let data = { note_id  }
    console.log("reached on upvote", data);
    this.props.sendUpVoteNoteData(data);
  };

  onDownVoteNote = (note_id) => {
    let data = { note_id }
    console.log("reached on downvote", data);
    this.props.sendDownVoteNoteData(data);
  };


  renderAllNotes = (notes) => {
    let noteArr = [];
    // if(Object.keys(notes).length === 1 && notes['0']['id'] === 15){
    //     return noteArr;
    // }
    noteArr.push(
      Object.keys(notes).map((item) => {
        const note_item = notes[item];
        const tags = note_item.tags.split(",");
        tags.splice(-1, 1);
        return <Card key={item} color={note_item.color}>
          <div style={{fontSize: "1.2em"}}>
            {note_item.title}
          </div>
          <br />
          <div>
            <div style={{height: "140px", overflow: "auto"}}>
              {note_item.note_text}
            </div>
            <div>
              Tags:&nbsp;
              {
                tags.map((tag) => {
                  return <span>{tag}</span>
                })
              }
            </div>
            <br />
            <div style={{float: "right", marginTop: "5px"}}>
              <LikeIcon  onClick = {() => {this.onUpVoteNote(note_item.id)}} 
              style={{marginLeft: "7px", marginRight: "7px", padding: "5px", cursor: "pointer"}}/>
              <DisLikeIcon onClick = {() => {this.onDownVoteNote(note_item.id)}} 
              style={{marginLeft: "7px", marginRight: "7px", padding: "5px", cursor: "pointer"}}/>
            </div>
          </div>
        </Card>
        }
      ));
    return noteArr;
  }

  render(){
    const username = this.props.session.currentUser;
    const recommendedNotes = this.props.session.recommendedNotes;
    if(isEmpty(recommendedNotes)){
      return (
        <div>
            <div className = "main-style">
              <div className = "create-new-note">
                <span style={{fontWeight: "700"}}>No Recommended Notes Yet!</span>
              </div>
            </div>        
        </div>
      ); 
    } else {
      return(
        <div>
            {!isEmpty(recommendedNotes) ? <h2 className = "notesheadingstyle">Recommended Notes</h2>: null}
            <div style={{overflowY: "auto", overflowX: "hidden", marginTop: "5%", marginBottom: "5%"}}>
              {!isEmpty(recommendedNotes) ? this.renderAllNotes(recommendedNotes) : null}
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
    return bindActionCreators({ getRecommendedNotes,  sendUpVoteNoteData, sendDownVoteNoteData, sendDeleteNoteData }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(RecommendedNotes);