import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent'
import Editor from 'draft-js-plugins-editor';
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import isEmpty from 'lodash/isEmpty';
import io from 'socket.io-client';
import cardStyles from './styles';
import { syncEditorData, getSocketURL } from '../../actions/socketActions';
import './Note.css';

class Note extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.socket = io.connect(getSocketURL());
    }

    // static getDerievedStateFromProps(props, state) {
    //     this.props.loadNoteInitData();
    //     return {
    //         editorState: props.socket.editorState
    //     }

    // }

    componentDidMount() {
        // this.socket = this.props.socket.socket;
        // console.log(isEmpty(this.socket));
        // if(isEmpty(this.socket)) 
        this.socket.on('note_body', (data) => {
            const content = convertFromRaw(JSON.parse(data.note_body));
            const editorState = EditorState.createWithContent(content);
            // this.setState({ editorState: EditorState.forceSelection(editorState, this.state.editorState.getSelection()) });
            this.setState({ editorState: EditorState.moveFocusToEnd(editorState) });
            // this.setState({ editorState });
        });
    }

    onEditorTextChange = (editorState) => {
        // console.log(editorState.getCurrentContent().getPlainText());
        // const converted = convertToRaw(editorState.getCurrentContent());
        // // console.log(converted);
        // const string_content = JSON.stringify(converted);
        // // console.log(JSON.stringify(converted));
        // // console.log(JSON.parse(string_content));
        // this.setState({ editorState });
        // const editorState = this.state.editorState;
        const content = convertToRaw(editorState.getCurrentContent());
        const data = {
            note_id: this.props.match.params.note_id,
            note_body: JSON.stringify(content)
        };
        this.props.syncEditorData(data, this.socket);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={"note-container"}>
                <Card className={classes.card}>
                    <Editor 
                        editorState={this.state.editorState}
                        onChange={this.onEditorTextChange}
                    />
                    <CardActions>
                        <Button className={classes.closeBtn} variant="text" size="small">Close</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }

}


function mapStateToProps(state) {
    return {
        app: { ...state.app },
        socket: { ...state.socket }
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ syncEditorData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(cardStyles)(Note));