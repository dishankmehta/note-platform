import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';

import NotesPopup from '../NotesPopup/NotesPopup';
import EditNotes from '../EditNotes/EditNotes';
import { getCheatSheets } from '../../actions/sessionActions'
import { sendDeleteNoteData } from '../../actions/sessionActions';
import { Card } from '../CustomComponents/Card';


import isEmpty from 'lodash/isEmpty';

import DeleteIcon from '@material-ui/icons/Delete';
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
    this.props.getCheatSheets(data);
  }

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
            <br />
            <div style={{float: "right", marginTop: "5px"}}>
              <EditNotes 
                  style={{marginLeft: "7px", marginRight: "7px", padding: "5px", cursor: "pointer"}}
                  edit={true}
                  cheatsheet={true}
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
    const cheatsheets = this.props.session.cheatsheets;
    if(isEmpty(cheatsheets)){
      return (
        <div>
            <div className = "main-style">
              <div className = "create-new-note">
                <NotesPopup cheatsheet={true}/>
              </div>
            </div>        
        </div>
      ); 
    } else {
      return(
        <div>
            <div className="col-xs-12" style={{float: "right", marginTop: "5px", marginRight: "10px"}}>
              <NotesPopup cheatsheet={true}/>
            </div>
            {!isEmpty(cheatsheets) ? <h2 className = "notesheadingstyle">Cheatsheets</h2>: null}
            <div style={{overflowY: "auto", overflowX: "hidden", marginTop: "5%", marginBottom: "5%"}}>
              {!isEmpty(cheatsheets) ? this.renderAllNotes(cheatsheets) : null}
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
    return bindActionCreators({ getCheatSheets, sendDeleteNoteData }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(MainNotes);