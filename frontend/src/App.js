import React, { Component } from 'react';
// import logo from './logo.svg';
import io from 'socket.io-client';
import axios from 'axios';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import './App.css';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
});

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      color: '',
      value: initialValue
    };

    this.socket = io(`http://${document.domain}:5000`);
    
    this.socket.on('connect', (sample)=>{
      console.log('connectedd........!!');
      console.log(sample);
    });

    this.socket.on('receive_change_color', (color) => {
      console.log(color);
      document.body.style.backgroundColor = color;
    });

  }

  send = (e) => {
    e.preventDefault();
    console.log("emitting", this.state.color);
    this.socket.emit('send_change_color', this.state.color);
  }

  setColor = (color) => {
    this.setState({color: color});
  }

  componentDidMount() {
    axios.get("http://localhost:5000/sample")
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });

    

  }

  onChange = ({ value }) => {
    console.log(value);
    this.setState({ value });
  }

  render() {
    
    return (
      <div style={{ textAlign: "center"}}>
        <button onClick={(e) => this.send(e)}>Change color</button>

        <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
        <button id="red" onClick={() => this.setColor('red')}>Red</button>
      </div>
      // <Editor value={this.state.value} onChange={this.onChange} />
    );
  }
}

export default App;
