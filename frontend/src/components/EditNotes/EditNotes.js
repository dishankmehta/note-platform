import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import { sendNoteData } from '../../actions/sessionActions';
import { sendEditedNoteData } from '../../actions/sessionActions';
import { getPublicNotes} from '../../actions/sessionActions'
import { getPrivateNotes } from '../../actions/sessionActions'
import Switch from '@material-ui/core/Switch';
import FieldText from '@atlaskit/field-text';
import Button from '@atlaskit/button';
import EditIcon from '@material-ui/icons/Edit';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import Popup from "reactjs-popup";
import { TwitterPicker } from 'react-color';
import '../NotesPopup/NotesPopup.css';


const contentStyle = {
  width: "60%"
};

class EditNotes extends Component{
  constructor(props){
		super(props);
		this.state = {
			user_id: this.props.session.currentUser,
			title: '',
			note_id: '',
			note_body: EditorState.createEmpty(),
			note_text: '',
			color: '',
			note_type: '2',
			tags: [],
			upvotes: 0,
			downvotes: 0,
			views: 0,
			tagInput : '',
			focused : false,
			checked: false,
			valuesInit : false,
		};
	}

	static getDerivedStateFromProps(props, state) {
		if(!state.valuesInit){
			return{
				...state,
				title : props.title,
				note_body : EditorState.createEmpty(),
				color : props.color,
				note_type : props.note_type,
				tags : props.tags,
				note_id : props.note_id,
				upvotes: 0,
				downvotes: 0,
				views: 0,
				valuesInit : true,
			}
		}
		return null;
	}

	handleTagInputChange = (evt) => {
    	this.setState({ tagInput: evt.target.value });
	}

	handleTagInputKeyDown = (evt) => {
	    if ( evt.keyCode === 13 ) {
	      const {value} = evt.target;
	      
	      this.setState(state => ({
	        tags: [...state.tags, value],
	        tagInput: ''
	      }));
	    }

	    // if ( this.state.tags.length && evt.keyCode === 8 && !this.state.tagInput.length ) {
	    //   this.setState(state => ({
	    //     tags: state.tags.slice(0, state.tags.length - 1)
	    //   }));
	    // }
	}

	handleRemoveTag = (index) => {
	    return () => {
	      this.setState(state => ({
	        tags: state.tags.filter((tag, i) => i !== index)
	      }));
	    }
	}

	onEditNote = () => {
    console.log("Note ID",this.state.note_id);
		const content = JSON.stringify(convertToRaw(this.state.note_body.getCurrentContent()));
		const noteText = this.state.note_body.getCurrentContent().getPlainText();
		let payload = {
			note_id: this.state.note_id,
			user_id: this.state.user_id,
			title: this.state.title,
			note_body: noteText,
			// note_text: noteText,
			color: this.state.color,
			note_type: parseInt(this.state.note_type, 10),
			tags: this.state.tags,
			upvotes: this.state.upvotes,
			downvotes: this.state.downvotes,
			views: this.state.views,
		}
    // this.props.sendNoteData(payload);
		this.props.sendEditedNoteData(payload);
		this.setState({
			title: '',
			note_id: '',
			note_body: EditorState.createEmpty(),
			note_text: '',
			color: '',
			note_type: '2',
			tags: [],
			upvotes: 0,
			downvotes: 0,
			views: 0,
			tagInput : '',
			focused : false,
			checked: false,
			valuesInit : false,
		});
	}

	onChangeColor = color => {
		this.setState ({
			color : color.hex
		})
	}

	handleOptionChange = name => event => {
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

	componentDidMount() {
    let data = {user_id:this.props.session.currentUser};
    this.props.getPrivateNotes(data);
    this.props.getPublicNotes(data);
	}

	onEditorTextChange = (editorState) => {
		this.setState({ note_body: editorState });
	}

	render(){
		// console.log(this.state);
		return(
			<Popup
    			trigger={<EditIcon style={{padding: "5px", cursor: "pointer"}}/>}
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
							<div style={{width: "276px", height: "96px", marginTop: "10px", 
								justifyContent: "center", textAlign: "center", fontSize: "1.5em"}}>
								Private?
								<Switch color="primary"  checked={this.state.checked} 
								onChange={this.handleOptionChange('checked')}/>
							</div>
						</div>
						<div>
							<label>
								<ul className = "tagContainer">
									<div>
										{this.state.tags.map((tag, i) => 
											<li key={i} className = "tagItems" onClick={this.handleRemoveTag(i)}>
												{tag}
												<span>(x)</span>
											</li>
										)}
									</div>
									<FieldText type="text" name="title" placeholder="Tag..." 
									shouldFitContainer value={this.state.tagInput}
									onChange={this.handleTagInputChange}
									onKeyDown={this.handleTagInputKeyDown}/>
								</ul>
							</label>		
						</div>
						<Button houldFitContainer appearance="primary" className="add-note-btn" 
							onClick = {() => {this.onEditNote(); close(); }}>
              {this.props.edit ? "Edit Note" : "Add Note"}
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
    sendNoteData,
    sendEditedNoteData,
    getPublicNotes,
    getPrivateNotes
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditNotes);
