import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import { sendDeleteNoteData } from '../../actions/sessionActions';


class UpVote extends Component{
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


  onUpVoteNote = () => {
    console.log("reached");
    this.props.sendUpVoteNoteData(this.state);
  };


  render(){
    return(
          <div className="col-xs-12">
              <button onClick = {() => {this.onUpVoteNote(); }}  value = "Submit"> Up Vote </button>
          </div>
    );
}
}

  const mapStateToProps = (state) =>{
      return{
          session: {...state.session}
      };
  };

  function mapDispatchToProps(dispatch){
    return bindActionCreators({
        sendDeleteNoteData,
    }, dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(UpVote);
