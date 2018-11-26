import React, { Component } from 'react';
import Popup from "reactjs-popup";
import Note from '../Note/Note';
import { TwitterPicker } from 'react-color';
// import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import { sendNoteData } from '../../actions/sessionActions';
import { sendEditedNoteData } from '../../actions/sessionActions';
//import './NotesPopup.css';

const contentStyle = {
  maxWidth: "600px",
  width: "90%"
};

class EditNotes extends Component{
  constructor(props){
    super(props);
    this.state = {
      user_id: this.props.session.currentUser,
      title: '',
      note_body: '',
      color: '',
      note_type: '',
      tags: [],
      focused : false,
      tagInput : '',
      upvotes: 0,
      downvotes: 0,
      views: 0,
      valuesInit : false,
      note_id : ''
    };
      // this.onEditNote = this.onEditNote.bind(this);
      this.handleTagInputChange = this.handleTagInputChange.bind(this);
      this.handleTagInputKeyDown = this.handleTagInputKeyDown.bind(this);
      this.handleRemoveTag = this.handleRemoveTag.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
  	console.log("Title",props.title);
  	console.log("ID", props.note_id);
  	if(!state.valuesInit){
  		return{
	  		...state,
	  		title : props.title,
	  		note_body : props.note_body,
	  		note_type : props.note_type,
	  		tags : props.tags,
	  		color : props.color,
	  		valuesInit : true,
	  		note_id : props.note_id
  	}
  }
  return null;
  }

  handleTagInputChange = evt => {
    this.setState({ tagInput: evt.target.value });
  }

  handleTagInputKeyDown = evt => {
      if ( evt.keyCode === 13 ) {
        const {value} = evt.target;
        
        this.setState(state => ({
          tags: [...state.tags, value],
          tagInput: ''
        }));
      }

      if ( this.state.tags.length && evt.keyCode === 8 && !this.state.tagInput.length ) {
        this.setState(state => ({
          tags: state.tags.slice(0, state.tags.length - 1)
        }));
      }
  }

  handleRemoveTag = index => {
      return () => {
        this.setState(state => ({
          tags: state.tags.filter((tag, i) => i !== index)
        }));
      }
  }

  onEditNote = () => {
    console.log("reached");
    this.props.sendEditedNoteData(this.state);
  }

  onChangeColor = color => {
    this.setState ({
      color : color.hex
    })
  }

  handleOptionChange = changeEvent => {
      if(changeEvent.target.value === 'private'){
      this.setState({
        note_type: '1'
      })
    }else if(changeEvent.target.value === 'public'){
      this.setState({
        note_type: '2'
      })
    }
  }

  render(){
    return(
      <Popup
          trigger={<button className="ButtonStyle insideButtonStyle"> Edit </button>}
          modal
          contentStyle={contentStyle}
        >
  {close => (
    <div className = "modal">
      <a className="close" onClick={close}>
          &times;
        </a>
        <div className="header"> </div>
          <div>
              <input className = "titleStyle" value = {this.state.title} type="text" onChange={(e) => this.setState({ title: e.target.value })} /> <br />
          </div>
            <div>
              <textarea className = "DescriptionStyle" value = { this.state.note_body } type="text" onChange={(e) => this.setState({ note_body: e.target.value })} /> <br />
            </div>
            <div >
              <TwitterPicker 
              color = {this.props.changeColor}
              onChangeComplete = {this.props.changeColor}
              onChange = {this.onChangeColor}
        />
        </div>
       <div className = "radioButtonStylePrivate">
        <label>
            <input type="radio" value="private" 
                          checked={this.state.note_type === 'private'} 
                          onChange={this.handleOptionChange} />
            Private
            </label>
        </div>
        <div className="radioButtonStylePublic">
            <label>
            <input type="radio" value="public" 
                          checked={this.state.note_type === 'public'} 
                          onChange={this.handleOptionChange} />
            Public
            </label>
        </div>
          <div className="col-xs-12">
              <button className="ButtonStyle insideButtonStyle" onClick = {() => {this.onEditNote(); close(); }}  value = "Submit"> Edit Note </button>  
          </div>
      </div>     
    )}
    </Popup>
    );
}
}

const mapStateToProps = (state) =>{
    return{
        session: {...state.session}
    }; 
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    sendNoteData,
    sendEditedNoteData
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditNotes);
