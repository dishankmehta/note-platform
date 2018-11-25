import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import { registrationRequest } from '../../actions/sessionActions';
import './ProfilePage.css';
import Avatar from './Avatar'

class ProfilePage extends Component{
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
        let {name,username,email, major,tags} = this.state;
		let data = {name: name,
					username: username,
					email: email,
					major:major,
					tags:tags
		};
		console.log(data);
		this.props.registrationRequest(data);

    }

	render(){
		return(
			<div className="profile" onSubmit={this.onSubmit} >
                <h1>Edit your profile</h1>
				<Avatar />
                <form name="profileForm">
                	<input type="text" name="name" placeholder="Full Name" onChange={e => this.setState({name: e.target.value})}/><br/>
                   	<input type="text" name="username" placeholder="User Name" required="required" onChange={e => this.setState({username: e.target.value})}/><br/>
                    <input type="email" name="email" placeholder="Email"  onChange={e => this.setState({email: e.target.value})}/><br/>
                    <input type="text" name="major" placeholder="Major" onChange={e => this.setState({major: e.target.value})}/><br/>
                   	<input type="text" name="tags" placeholder="Interests" onChange={e => this.setState({tags: e.target.value})}/><br/>
                   	
                    <button type="submit">Submit</button>
                </form>
            </div>	
		)
	}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ registrationRequest }, dispatch);
}

export default connect(null, mapDispatchToProps)(ProfilePage);