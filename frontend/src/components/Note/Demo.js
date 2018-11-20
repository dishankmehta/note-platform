import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createNewNote } from '../../actions/appActions'; 
import { initSocket } from '../../actions/socketActions'; 

class Demo extends Component {


    componentDidMount() {
        this.props.initSocket();
    }

    onNoteOpened = () => {
        this.props.createNewNote({username: 'user'});
    }

    render() {
        return(
            <div>
                <button onClick={() => this.onNoteOpened()}>Create Note</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        app: { ...state.app },
        session: { ...state.session }
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createNewNote, initSocket }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Demo);
