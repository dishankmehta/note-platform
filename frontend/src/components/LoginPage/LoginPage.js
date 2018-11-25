import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import { loginRequest } from '../../actions/sessionActions';
import { Link } from 'react-router-dom';
import './LoginPage.css';

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {username: '', password: ''};
    }

    onSubmit = (e) =>{
        e.preventDefault();
        let {username, password} = this.state;
        let data = {username: username, password: password}
        this.props.loginRequest(data);
    }
    
    render() {
        const isLoggedIn = this.props.session.isLoggedIn;
        return (
            <div className="login" onSubmit={this.onSubmit} >
                <h1>Please sign in.</h1>
                <form name="loginForm">
                    <input type="text" name="username" placeholder="Username" required="required" onChange={e => this.setState({username: e.target.value})}/>
                    <br/>
                    <input type="password" name="password" placeholder="Password" required="required" onChange={e => this.setState({password: e.target.value})}/>
                    {!isLoggedIn && isLoggedIn !== null?<div>Login Failed</div>: null}
                    <button type="submit">Sign in</button>
                </form>
                <button onClick={() => this.props.history.replace('/register')}>Register</button>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        session: {...state.session}
    }; 
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loginRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
