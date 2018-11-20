import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import { loginRequest } from '../../actions/sessionActions';
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
        // let {email,password} = this.state;
        return (
            <div className="login" onSubmit={this.onSubmit} >
                <h1>Please sign in.</h1>
                <form name="loginForm">
                    <input type="text" name="username" placeholder="Username" required="required" onChange={e => this.setState({username: e.target.value})}/>
                    <br/>
                    <input type="password" name="password" placeholder="Password" required="required" onChange={e => this.setState({password: e.target.value})}/>
                    <button type="submit" className="hvr-grow-shadow">Sign in</button>
                </form>
            </div>
        )
    }
}
// const mapStateToProps = (state) =>{
//     return{
//         // isLoginSuccess: state.isLoginSuccess,
//         // loginError: state.loginError
//     }; 
// }


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loginRequest }, dispatch);
    // return{
    //     //authenticateLoginRequest: (email, password) => dispatch(authenticateLoginRequest(email,password)) 
    // };
}

// export default connect(null, mapDispatchToProps)(LoginPage);

export default connect(null, mapDispatchToProps)(LoginPage);
