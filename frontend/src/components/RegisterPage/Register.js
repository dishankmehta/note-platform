import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import { registrationRequest } from '../../actions/sessionActions';
import './Register.css';

class Register extends Component{
	constructor(props){
		super(props);
		this.state = {name:'',
					username:'',
					email:'',
					password:'',
					confirmpassword:'',
					major:'',
					tags:''
		};
	}
	onSubmit = (e) =>{
        e.preventDefault();
        let {name,username,email,password,confirmpassword,major,tags} = this.state;
        if(password === confirmpassword){
        	let data = {name: name,
        				username: username,
        				email: email, 
        				password: password,
        				major:major,
        				tags:tags
        	}
        	console.log(data);
        	this.props.registrationRequest(data);
        }
    }

	render(){
		return(
			<div className="login" onSubmit={this.onSubmit} >
                <h1>Please Register.</h1>
                <form name="loginForm">
                	<input type="text" name="name" placeholder="Fullname" required="required" onChange={e => this.setState({name: e.target.value})}/><br/>
                   	<input type="text" name="username" placeholder="Username" required="required" onChange={e => this.setState({username: e.target.value})}/><br/>
                    <input type="email" name="email" placeholder="email" required="required" onChange={e => this.setState({email: e.target.value})}/><br/>
                    <input type="password" name="password" placeholder="Password" required="required" onChange={e => this.setState({password: e.target.value})}/> 
                    <input type="password" name="confirmpassword" placeholder="Confirm Password" required="required" onChange={e => this.setState({confirmpassword: e.target.value})}/>
                    <input type="text" name="major" placeholder="Major" required="required" onChange={e => this.setState({major: e.target.value})}/><br/>
                   	<input type="text" name="tags" placeholder="Interests" required="required" onChange={e => this.setState({tags: e.target.value})}/><br/>
                   	
                    <button type="submit">Register</button>
                </form>
            </div>	
		)
	}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ registrationRequest }, dispatch);
}

export default connect(null, mapDispatchToProps)(Register);