import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';

import NotesPopup from '../NotesPopup/NotesPopup';
import EditNotes from '../EditNotes/EditNotes';
import { getGroupNotes } from '../../actions/sessionActions'
import { sendUpVoteNoteData } from '../../actions/sessionActions';
import { sendDownVoteNoteData } from '../../actions/sessionActions';
import { sendDeleteNoteData } from '../../actions/sessionActions';
import { Card } from '../CustomComponents/Card';


import isEmpty from 'lodash/isEmpty';

import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import LikeIcon from '@material-ui/icons/ThumbUp';
import DisLikeIcon from '@material-ui/icons/ThumbDown';

import '../DashBoard/MainNotes.css';



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
    this.props.getGroupNotes(data);
  }

  onUpVoteNote = (note_id) => {
    let data = { note_id  }
    this.props.sendUpVoteNoteData(data);
  };

  onDownVoteNote = (note_id) => {
    let data = { note_id }
    this.props.sendDownVoteNoteData(data);
  };

  onDeleteNote = (note_id, note_type_data, user_id) => {
    const note_type = parseInt(note_type_data,10)
    let data = { user_id, note_id, note_type }
    this.props.sendDeleteNoteData(data);
  };

  renderAllNotes = (notes) => {
    let noteArr = [];
    if(Object.keys(notes).length === 1 && notes['0']['id'] === 15){
        return noteArr;
    }
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
                tags.map((tag, index) => {
                  if(index+1 === tags.length){
                    return <span key={index}>{tag}</span>  
                  }
                  return <span key={index}>{tag+","}</span>
                })
              }
            </div>
            <br />
            <div style={{float: "right", marginTop: "5px"}}>
              <LikeIcon  onClick = {() => {this.onUpVoteNote(note_item.id)}} 
              style={{marginLeft: "7px", marginRight: "7px", padding: "5px", cursor: "pointer"}}/>
              <TextField style = {{marginTop: 7, width: 20, height: 20, cursor:"none", pointerEvents:"none"}} value={note_item.upvotes}/>
              <DisLikeIcon onClick = {() => {this.onDownVoteNote(note_item.id)}} 
              style={{marginLeft: "7px", marginRight: "7px", padding: "5px", cursor: "pointer"}}/>
              <TextField style = {{ marginTop: 7, height: 20, width: 20, cursor:"none", pointerEvents:"none"}} value={note_item.downvotes}/>
              <EditNotes 
                  style={{marginLeft: "7px", marginRight: "7px", padding: "5px", cursor: "pointer"}}
                  edit={true}
                  group={true}
                  title={note_item.title}
                  note_body={note_item.note_body}
                  note_text={note_item.note_text}
                  color={note_item.color}
                  note_type={note_item.note_type}
                  tags={[note_item.tags]}
                  note_id={note_item.id}
                  upvotes={note_item.upvotes}
                  downvotes={note_item.downvotes}
                //   emails={note_item.emails}
                  views={note_item.views} />
              <DeleteIcon onClick={() => this.onDeleteNote(note_item.id, note_item.note_type, this.props.session.currentUser)}
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
    const groupNotes = this.props.session.groupNotes;
    if(isEmpty(groupNotes)){
      return (
        <div>
            <div className = "main-style">
              {/* <div className = "welcome-style">
                { this.props.session.currentUser.toUpperCase()} , Welcome to Study Genie
              </div>
              <div className = "secondDiv-style">
                <span> Note taking made easier! </span>
              </div> */}
              <div className = "create-new-note">
                <NotesPopup group={true} />
              </div>
            </div>        
        </div>
      ); 
    } else {
      return(
        <div>
            <div className="col-xs-12" style={{float: "right", marginTop: "5px", marginRight: "10px"}}>
              <NotesPopup group={true} />
            </div>
            {!isEmpty(groupNotes) ? <h2 className = "notesheadingstyle">My Group Notes</h2>: null}
            <div style={{overflowY: "auto", overflowX: "hidden", marginTop: "5%", marginBottom: "5%"}}>
              {!isEmpty(groupNotes) ? this.renderAllNotes(groupNotes) : null}
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
    return bindActionCreators({ getGroupNotes,  sendUpVoteNoteData, sendDownVoteNoteData, sendDeleteNoteData }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(MainNotes);