import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import { sendNoteData } from '../../actions/sessionActions';
import { sendGroupNoteData } from '../../actions/sessionActions';

import Switch from '@material-ui/core/Switch';
import FieldText from '@atlaskit/field-text';
import Button from '@atlaskit/button';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';

import Popup from "reactjs-popup";
import { TwitterPicker } from 'react-color';

import './NotesPopup.css';

const contentStyle = {
  width: "60%"
};


class NotesPopup extends Component{
	constructor(props){
		super(props);
		this.state = {
			user_id: this.props.session.currentUser,
			title: '',
			note_body: EditorState.createEmpty(),
			note_text: '',
			color: '',
			note_type: this.props.cheatsheet? '3' : '2',
			tags: '',
			upvotes: 0,
			downvotes: 0,
			views: 0,
			emails: '',
			emailInput: '',
			tagInput : '',
			focused : false,
			checked: false,
		};
	}

	handleTagInputChange = (evt) => {
    	this.setState({ tagInput: evt.target.value });
	}

	handleEmailInputChange = (evt) => {
    	this.setState({ emailInput: evt.target.value });
	}

	handleEmailInputKeyDown = (evt) => {
	    if ( evt.keyCode === 13 ) {
			evt.preventDefault();
	      	const {value} = evt.target;
			
			let emails = this.state.emails;
			emails += value+",";
			this.setState(state => ({
				emails: emails,
				emailInput: ''
			}));
			evt.currentTarget.value = "";
		} 
	}

	handleRemoveEmailTag = (index) => {
	    return () => {
	      this.setState(state => ({
	        emails: state.emails.split(",").filter((tag, i) => i !== index).join(",")
	      }));
	    }
	}

	handleTagInputKeyDown = (evt) => {
	    if ( evt.keyCode === 13 ) {
			evt.preventDefault();
	      	const {value} = evt.target;
			
			let tags = this.state.tags;
			tags += value+",";
			this.setState(state => ({
				tags: tags,
				tagInput: ''
			}));
			evt.currentTarget.value = "";
		} 
	}

	handleRemoveTag = (index) => {
	    return () => {
	      this.setState(state => ({
	        tags: state.tags.split(",").filter((tag, i) => i !== index).join(",")
	      }));
	    }
	}


	onAddNote = () => {
		const content = JSON.stringify(convertToRaw(this.state.note_body.getCurrentContent()));
		const noteText = this.state.note_body.getCurrentContent().getPlainText();
		let payload = {
			user_id: this.state.user_id,
			title: this.state.title,
			note_body: content,
			note_text: noteText,
			color: this.state.color,
			note_type: this.state.note_type,
			tags: this.state.tags,
			upvotes: this.state.upvotes,
			downvotes: this.state.downvotes,
			views: this.state.views,
		}
		if(this.props.group){
			let new_payload = {...payload, group_user_emails: this.state.emails };
			this.props.sendGroupNoteData(new_payload);
		}else {
			this.props.sendNoteData(payload);
		}
		this.setState({
			title: '',
			note_body: EditorState.createEmpty(),
			note_text: '',
			color: '',
			note_type: this.props.cheatsheet? '3' : '2',
			tags: '',
			upvotes: 0,
			downvotes: 0,
			views: 0,
			tagInput : '',
			emails: '',
			emailInput: '',
			focused : false,
			checked: false,
		});
	}

	onChangeColor = color => {
		this.setState ({
			color : color.hex
		})
	}

	handleOptionChange = name => event => {
		console.log(event.target.checked);
  		if(event.target.checked){
			this.setState({
				note_type: '1',
				[name]: event.target.checked
			})
		}else {
			this.setState({
				note_type: '2',
				[name]: event.target.checked
			})
		}
	}


	onEditorTextChange = (editorState) => {
		this.setState({ note_body: editorState });
	}

	render(){
		console.log(this.state);
		return(
			<Popup
    			trigger={<Button houldFitContainer appearance="primary">{ 
					this.props.group ? "Create a Group Note" : this.props.cheatsheet ? "Create a Cheatsheet" : "Create a New Note" }</Button>}
    			modal
    			contentStyle={contentStyle}>

				{close => (
					<div className = "modal">
						<a className="close" onClick={close}> &times; </a>
						<div className="header"> </div>
						<div className={"title-div"}>
							<FieldText type="text" name="title" placeholder="Title..." 
								autoFocus shouldFitContainer value={this.state.title}
								onChange={e => this.setState({title: e.target.value})}/>
						</div>
						<Editor 
							className={"editor"}
							editorState={this.state.note_body}
          					wrapperClassName="demo-wrapper"
							editorClassName="demo-editor"
							toolbarClassName="toolbar-class"
							onEditorStateChange={this.onEditorTextChange}
						/>
						<div style={{width: "fit-content", display: "flex", marginLeft: "70px"}}>
							<TwitterPicker 
								style={{float: "left"}}
								color = {this.props.changeColor}
								onChangeComplete = {this.props.changeColor}
								onChange = {this.onChangeColor}
							/>
							{
								(!this.props.group ) ||
								(!this.props.cheatsheet)?
								<div style={{width: "276px", height: "96px", marginTop: "10px", 
									justifyContent: "center", textAlign: "center", fontSize: "1.5em"}}>
									Private?
									<Switch color="primary"  checked={this.state.checked} 
									onChange={this.handleOptionChange('checked')}/>
								</div>:null
							}
						</div>
						{
							!this.props.cheatsheet?
								<div>
								<label>
									<ul className = "tagContainer">
										<div>
											{this.state.tags.split(",").map((tag, i) => {
												if(tag !== ''){
													return <li key={i} className = "tagItems" onClick={this.handleRemoveTag(i)}>
														{tag}
														<span>(x)</span>
													</li>
												}
												return null
											})}
										</div>
										<FieldText type="text" name="title" placeholder="Tag..."
										shouldFitContainer value={this.state.tagInput || ""}
										onChange={this.handleTagInputChange}
										onKeyDown={this.handleTagInputKeyDown}/>
									</ul>
								</label>		
							</div>:null
						}
						{
							this.props.group ? 
							<div>
								<label>
									<ul className = "tagContainer">
										<div>
											{this.state.emails.split(",").map((email, i) => {
												if(email !== ''){
													return <li key={i} className = "tagItems" onClick={this.handleRemoveEmailTag(i)}>
														{email}
														<span>(x)</span>
													</li>
												}
												return null
											})}
										</div>
										<FieldText type="text" name="title" placeholder="Email of Users to share..."
										shouldFitContainer value={this.state.emailInput || ""}
										onChange={this.handleEmailInputChange}
										onKeyDown={this.handleEmailInputKeyDown}/>
									</ul>
								</label>		
							</div>:null
						}
						<Button shouldFitContainer appearance="primary" className="add-note-btn" 
							onClick = {() => {this.onAddNote(); close(); }}>
							{this.props.cheatsheet? "Add Cheatsheet" : "Add Note"}
						</Button>
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
		sendNoteData, sendGroupNoteData
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesPopup);
