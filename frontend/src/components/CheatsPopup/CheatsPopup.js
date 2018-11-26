import React, { Component } from 'react';
import Popup from "reactjs-popup";
import Note from '../Note/Note';
import { TwitterPicker } from 'react-color';
// import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import { sendNoteData } from '../../actions/sessionActions';
import './CheatsPopup.css';
import ExpansionList from './ExpansionList'


const contentStyle = {
    maxWidth: "600px",
    width: "90%"
};

const twitterStyle = {
    width: "90%"
};

class CheatsPopup extends Component{
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
			views: 0
		};

	}



	onAddNote = () => {
		this.props.sendNoteData(this.state);


    };

	onChangeColor = color => {
		this.setState ({
			color : color.hex
		})
	};


	render(){
		return(
			<Popup
    			trigger={<button className="ButtonStyle insideButtonStyle"> Create a CheatSheet here </button>}
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
            	<input className = "titleStyle" placeholder = "Subject" type="text" onChange={(e) => this.setState({ title: e.target.value })} /> <br />
     	  	</div>
          	{/*<div>*/}
            	{/*<textarea className = "DescriptionStyle" placeholder="Enter Description ..." type="text" onChange={(e) => this.setState({ note_body: e.target.value })} /> <br />*/}

          	{/*</div>*/}
        		{/*<textarea id="todolist" className="todolist" name="todolist" rows="30"*/}
                  {/*placeholder="Maintain your pending tasks">Add importants</textarea>*/}
                  <ExpansionList/>
          	{/*<div className="tagContainer">*/}
            	<TwitterPicker
				color = {this.props.changeColor}
				onChangeComplete = {this.props.changeColor}
				onChange = {this.onChangeColor}
				/>
			{/*</div>*/}

          	<div className="col-xs-12">
            	<button className="ButtonStyle insideButtonStyle" onClick = {() => {this.onAddNote(); close(); }}  value = "Submit"> Add Note </button>  
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
		sendNoteData
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheatsPopup);
