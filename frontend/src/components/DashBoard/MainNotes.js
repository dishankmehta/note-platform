import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import { getPublicNotes } from '../../actions/sessionActions'
import NotesPopup from '../NotesPopup/NotesPopup';
import { Card } from '../CustomComponents/Card';
import './MainNotes.css';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class MainNotes extends Component {
  constructor(props){
    super(props);
    this.arr = [
        {
          title: 'Title 1',
          content: 'My content in note 1 is unimportant.'
        },
        {
          title: 'Title 2',
          content: 'My content in note2 is really important.'
        },
        {
          title: 'Title 3',
          content: 'My content in note 3 is very very important.'
        }
      ]
  }

  componentDidMount() {
    this.props.getPublicNotes(this.props.session.currentUser);
  }

  render(){
    const username = this.props.session.currentUser;
    console.log(username);
    if(isEmpty(this.arr)){
    return (
      <div>
          <div className = "main-style">
            <span className = "span-style"> </span>
            <div className = "welcome-style">
              {`${username}`}, Welcome to Study Genie
            </div>
            <div className = "secondDiv-style">
              <span className = "secondSpan-style"> Note taking made easier! </span>
            </div>
            <div className = "divButtonStyle">
              <div className = "div2ButtonStyle">
                  <NotesPopup />
                </div>
            </div>
          </div>        
      </div>
    );  

    }
    else{

      return(
       <Card >
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="h2">
            {this.arr.title}
          </Typography>
          <Typography  color="textSecondary">
            adjective
          </Typography>
          <Typography component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
        </Card>
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
    return bindActionCreators({ getPublicNotes }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(MainNotes);