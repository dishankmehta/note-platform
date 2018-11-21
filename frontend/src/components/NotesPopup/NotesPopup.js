import React, { Component } from 'react';
import Popup from "reactjs-popup";
import { TwitterPicker } from 'react-color';
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';
// // import TagsInput from 'react-tagsinput';
// import { WithContext as ReactTags } from 'react-tag-input';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import { sendNoteData } from '../../actions/sessionActions';
import './NotesPopup.css';

const contentStyle = {
  maxWidth: "600px",
  width: "90%"
};

class NotesPopup extends Component{
	constructor(props){
		super(props);
		this.state = {
			title: '',
			note_body: '',
			color: '',
			note_type: '',
			tags: [],
			focused : false,
			tagInput : '',
			upvotes: 0,
			downvotes: 0,
			views: 0
		};
		this.handleTagInputChange = this.handleTagInputChange.bind(this);
    	this.handleTagInputKeyDown = this.handleTagInputKeyDown.bind(this);
    	this.handleRemoveTag = this.handleRemoveTag.bind(this);
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

	onAddNote = () => {
		this.props.sendNoteData(this.state);
	}

	onChangeColor = color => {
		console.log(color.hex);
		this.setState ({
			color : color.hex
		})
	}

	handleOptionChange = changeEvent => {
  		this.setState({
    		note_type: changeEvent.target.value
  		})
	}

	render(){
		console.log("title" ,this.state.title);
		console.log("note_body", this.state.note_body);
		console.log("color", this.state.color);
		console.log("type" , this.state.note_type);
		console.log("tags", this.state.tags);
		// console.log("tag", this.state.tag);
		return(
			<Popup
    			trigger={<button className="ButtonStyle insideButtonStyle"> Create a Note here </button>}
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
            	<input className = "titleStyle" placeholder = "Title..." type="text" onChange={(e) => this.setState({ title: e.target.value })} /> <br />
     	  	</div>
          	<div>
            	<textarea className = "DescriptionStyle" placeholder="Enter Description ..." type="text" onChange={(e) => this.setState({ note_body: e.target.value })} /> <br />
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
		    <div>
            	<label>
			        <ul className = "tagContainer">
			          {this.state.tags.map((tag, i) => 
			            <li key={i} className = "tagItems" onClick={this.handleRemoveTag(i)}>
			              {tag}
			              <span>(x)</span>
			            </li>
			          )}
			          <input className = "inputStyle"
			            value={this.state.tagInput}
			            onChange={this.handleTagInputChange}
			            onKeyDown={this.handleTagInputKeyDown} />
			        </ul>
			      </label>		
     	  	</div>
          	<div className="col-xs-12">
            	<button className="ButtonStyle insideButtonStyle" onClick = {this.onAddNote}  value = "Submit"> Add Note </button>  
          	</div>
        </div>
    )}
    </Popup>
    );
}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		sendNoteData
	}, dispatch);
}
 
export default connect(null, mapDispatchToProps)(NotesPopup);
