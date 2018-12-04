import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import { getPublicNotes } from '../../actions/sessionActions'
import NotesPopup from '../NotesPopup/NotesPopup';
import EditNotes from '../EditNotes/EditNotes';
import DeleteNotes from '../DeleteNotes/DeleteNotes';
import { getPrivateNotes } from '../../actions/sessionActions'
import { sendUpVoteNoteData } from '../../actions/sessionActions';
import { sendDownVoteNoteData } from '../../actions/sessionActions';
import { sendDeleteNoteData } from '../../actions/sessionActions';
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
    this.props.getPrivateNotes(data);
    this.props.getPublicNotes(data);
  }

  onUpVoteNote = (note_id,user_id) => {
    let data = { note_id , user_id }
    console.log("reached on upvote", data);
    this.props.sendUpVoteNoteData(data);
  };

  onDownVoteNote = (note_id, user_id) => {
    let data = { note_id, user_id }
    console.log("reached on downvote", data);
    this.props.sendDownVoteNoteData(data);
  };

  onDeleteNote = (note_id, note_type_data, user_id) => {
    const note_type = parseInt(note_type_data,10)
    let data = { user_id, note_id, note_type }
    console.log("reached on delete", data);
    this.props.sendDeleteNoteData(data);
  };

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
            <div style={{height: "20px"}}>
              {note_item.upvotes}
            </div>
            <div style={{height: "20px"}}>
              {note_item.downvotes}
            </div>
            <br />
            </div>
            <br />
            <div style={{float: "right", marginTop: "5px"}}>
              <LikeIcon  onClick = {() => {this.onUpVoteNote(note_item.id, this.props.session.currentUser)}} 
              style={{marginLeft: "7px", marginRight: "7px", padding: "5px", cursor: "pointer"}}/>

              <DisLikeIcon onClick = {() => {this.onDownVoteNote(note_item.id, this.props.session.currentUser)}} 
              style={{marginLeft: "7px", marginRight: "7px", padding: "5px", cursor: "pointer"}}/>
              <EditNotes 
                  style={{marginLeft: "7px", marginRight: "7px", padding: "5px", cursor: "pointer"}}
                  edit={true}
                  title={note_item.title}
                  note_body={note_item.note_body}
                  color={note_item.color}
                  note_type={note_item.note_type}
                  tags={[note_item.tags]}
                  note_id={note_item.id}
                  upvotes={note_item.upvotes}
                  downvotes={note_item.downvotes}
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
    const privateNotes = this.props.session.privateNotes;
    const publicNotes = this.props.session.publicNotes;
    if(isEmpty(privateNotes) && isEmpty(publicNotes)){
      return (
        <div>
            <div className = "main-style">
              <div className = "welcome-style">
                { this.props.session.currentUser} , Welcome to Study Genie
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
    } else {
      return(
        <div>
            <div className="col-xs-12" style={{float: "right", marginTop: "5px", marginRight: "10px"}}>
              <NotesPopup />
            </div>
            {!isEmpty(publicNotes) ? <h2 className = "notesheadingstyle">My Public Notes</h2>: null}
            <div style={{overflowY: "auto", overflowX: "hidden"}}>
              {!isEmpty(publicNotes) ? this.renderAllNotes(publicNotes) : null}
            </div>
            {!isEmpty(privateNotes) ? <h2 className = "notesheadingstyle">My Private Notes</h2>: null}
            <div style={{overflowY: "auto", overflowX: "hidden"}}>
              {!isEmpty(privateNotes) ? this.renderAllNotes(privateNotes) : null}
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
    return bindActionCreators({ getPublicNotes,getPrivateNotes,  sendUpVoteNoteData, sendDownVoteNoteData, sendDeleteNoteData }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(MainNotes);