import React, { Component } from 'react';
import Popup from "reactjs-popup";
import { TwitterPicker } from 'react-color';
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';
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
			content: '',
			color: '',
			selectedTypeofNote: ''
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
    		selectedTypeofNote: changeEvent.target.value
  	})
}


	render(){
		console.log("title" ,this.state.title);
		console.log("content", this.state.content);
		console.log("color", this.state.color);
		console.log("type" , this.state.selectedTypeofNote);
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
            	<textarea className = "DescriptionStyle" placeholder="Enter Description ..." type="text" onChange={(e) => this.setState({ content: e.target.value })} /> <br />
          	</div>
          	<div className="col-xs-12">
            	<TwitterPicker
				color = {this.props.changeColor}
				onChangeComplete = {this.props.changeColor}
				onChange = {this.onChangeColor}
				/>
			</div>
			<div className = "radioButtonStyle">
				<label>
		        <input type="radio" value="private" 
		                      checked={this.state.selectedTypeofNote === 'private'} 
		                      onChange={this.handleOptionChange} />
		        Private
		      	</label>
		    </div>
		    <div className="radioButtonStyle">
		        <label>
		        <input type="radio" value="public" 
		                      checked={this.state.selectedTypeofNote === 'public'} 
		                      onChange={this.handleOptionChange} />
		        Public
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
