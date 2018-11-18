import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import { loginRequest } from '../../actions/sessionActions';
import { authenticateLoginRequest } from '../../store/reducers/loginreducer';

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {username: '', password: ''};
    }

    onSubmit = (e) =>{
        e.preventDefault();
        let {username, password} = this.state;
        //console.log(email,password);
        let data = {username: username, password: password}
        //this.props.authenticateLoginRequest(email,password);
        this.props.loginRequest(data);
    }

    render() {
        let {email,password} = this.state;
        return (
            <div onSubmit={this.onSubmit} >
                <form name="loginForm">
                    <label>Username:</label>
                    <input type="text" name="username" onChange={e => this.setState({username: e.target.value})}/>
                    <br/>
                    <label>Password:</label>
                    <input type="password" name="password" onChange={e => this.setState({password: e.target.value})}/>
                    <input type="submit" value="login"/>
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
