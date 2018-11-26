import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import { getPublicNotes } from '../../actions/sessionActions'
import CheatsPopup from '../CheatsPopup/CheatsPopup';
import { Card } from '../CustomComponents/Card';
import './CheatSheet.css';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class CheatSheet extends Component {
  constructor(props){
    super(props);
    this.arr = []
  }

  componentDidMount() {
    let data = {user_id:this.props.session.currentUser};
    this.props.getPublicNotes(data);
    // console.log(this.props.session.currentUser);
  }

  renderAllNotes = (notes) => {
    let noteArr = [];
    noteArr.push(
      Object.keys(notes).map((item) => {
        const note_item = notes[item];
        return <Card key={item} color={note_item.color}>
            {note_item.title}
            {note_item.note_body}
          </Card>
        }
      ));
    return noteArr;
  };

  render(){
    // const username = this.props.session.currentUser;
      const username = "naitik0212";

      console.log('NOTIFY', this.props.session.notes);
    const notes = this.props.session.notes;
    console.log('NOTIFY 2', notes);
    if(isEmpty(notes)){
      console.log('NOTIFY 3', notes);
    return (
      <div>
          <div className = "main-style">
            <span className = "span-style"> </span>
            <div className = "welcome-style">
              {`${username}`}, Welcome to CheatSheets
            </div>
            <div className = "secondDiv-style">
              <span className = "secondSpan-style"> Share knowlegde, share Cheats, Excel Subject! </span>
            </div>
            <div className = "divButtonStyle">
              <div className = "div2ButtonStyle">
                  <CheatsPopup />
                </div>
            </div>
          </div>        
      </div>
    );  

    }
    else if(!isEmpty(notes)){
      // console.log("notes",notes);

      return(

        <div>
          {this.renderAllNotes(notes)}
        </div>
        
      );  
    }      
  }  
}


const mapStateToProps = (state) =>{
    return{
        session: {...state.session}
    }; 
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getPublicNotes }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(CheatSheet);