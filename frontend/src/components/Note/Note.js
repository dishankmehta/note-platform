import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent'

// import Editor from 'draft-js-plugins-editor';
// import { EditorState, RichUtils, convertToRaw, convertFromRaw, SelectionState } from 'draft-js';

import { Editor, EditorContext, WithEditorActions } from '@atlaskit/editor-core';
// import { CollabEditProvider } from '@atlaskit/editor-core';
import { colors } from '@atlaskit/theme';
import Button, { ButtonGroup } from '@atlaskit/button';

import isEmpty from 'lodash/isEmpty';
import io from 'socket.io-client';

import cardStyles from './styles';
import { syncEditorData, getSocketURL } from '../../actions/socketActions';

import './Note.css';

export const TitleInput = styled.input`
  border: none;
  outline: none;
  font-size: 2.07142857em;
  margin: 0 0 21px;
  padding: 0;

  &::placeholder {
    color: ${colors.akColorN80};
  }
`;
TitleInput.displayName = 'TitleInput';

export const Content = styled.div`
  padding: 0 20px;
  height: 50%;
  background: #fff;
  box-sizing: border-box;
`;
Content.displayName = 'Content';

const SaveAndCancelButtons = props => (
    <ButtonGroup>
      <Button
        appearance="primary"
        onClick={() =>
          props.editorActions
            .getValue()
            .then(value => console.log(value.toJSON()))
        }
      >
        Publish
      </Button>
      <Button appearance="subtle" onClick={() => props.editorActions.clear()}>
        Close
      </Button>
    </ButtonGroup>
  );

class Note extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     editorState: EditorState.createEmpty()
        // };
        // this.socket = io.connect(getSocketURL());
    }


    componentDidMount() {
        // this.socket.on('note_body', (data) => {
        //     let newSelection = new SelectionState({
        //         anchorKey: data.selection.anchorKey,
        //         anchorOffset: data.selection.anchorOffset,
        //         focusKey: data.selection.focusKey,
        //         focusOffset: data.selection.focusOffset,
        //     });
        //     const content = convertFromRaw(JSON.parse(data.note_body));
        //     const editorState = EditorState.createWithContent(content);
        //     const newEditorState = EditorState.forceSelection(editorState, newSelection);
        //     this.setState({ editorState: newEditorState });
        // });

        
    }

    onEditorTextChange = (editorState) => {
        // const selection = editorState.getSelection();
        // const content = convertToRaw(editorState.getCurrentContent());
        // const data = {
        //     note_id: this.props.match.params.note_id,
        //     note_body: JSON.stringify(content),
        //     selection: selection
        // };
        // this.props.syncEditorData(data, this.socket);
    }

    render() {
        const { classes } = this.props;
        return (
            // <div className={"note-container"}>
            //     <Card className={classes.card}>
            //         <Editor 
            //             editorState={this.state.editorState}
            //             onChange={this.onEditorTextChange}
            //         />
            //         <CardActions>
            //             <Button className={classes.closeBtn} variant="text" size="small">Close</Button>
            //         </CardActions>
            //     </Card>
            // </div>
            <div>
                <EditorContext>
                    <Editor
                         allowCodeBlocks={true}
                         allowLayouts={true}
                         allowLists={true}
                         allowTextColor={true}
                         allowTables={{
                           allowColumnResizing: true,
                           allowMergeCells: true,
                           allowNumberColumn: true,
                           allowBackgroundColor: true,
                           allowHeaderRow: true,
                           allowHeaderColumn: true,
                           permittedLayouts: 'all',
                           stickToolbarToBottom: true,
                         }}
                         allowTemplatePlaceholders={{ allowInserting: true }}
                        //  collabEdit={{
                        //      provider: CollabEditProvider
                        //  }}
                    >

                    </Editor>
                </EditorContext>
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