import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import { registrationRequest } from '../../actions/sessionActions';

import styled from 'styled-components';

import FieldText from '@atlaskit/field-text';
import { Card } from '@material-ui/core';
import PageHeader from '@atlaskit/page-header';
import Button from '@atlaskit/button';

import './Register.css';

const FieldForm = styled.div`
    width: 100%;
    text-align: center;
    align-items: center;
`;


class Register extends Component{
	constructor(props){
		super(props);
		this.state = {
			name:'',
			username:'',
			email:'',
			password:'',
			confirmpassword:'',
			major:'',
			tags:'',
			showError: false,
			registerError: 'Passwords do not match'
		};
	}

	onSubmit = () => {
        let { name, username, email, password, confirmpassword, major, tags} = this.state;
        if(password === confirmpassword){
        	let data = {
				name: name,
				username: username,
				email: email, 
				password: password,
				major:major,
				tags:tags
        	};
			this.setState({
				showError: false
			});
        	this.props.registrationRequest(data);
        } else {
			this.setState({
				showError: true
			});
		}
    }

	render(){
		const registerError = this.state.registerError;
		const errorFromRequest = this.props.session.registerError;
		return(
			<div>
				<Card className={"register-card"}>
                    <PageHeader>Register</PageHeader>
					<FieldForm>
						<div className="column-wrap"> 
							<div style={{width: "50%", padding: "1.5%"}}>
								<FieldText label={"Full Name"} type="text" name="name" placeholder="Full Name" 
									required autoFocus shouldFitContainer value={this.state.name}
									onChange={e => this.setState({name: e.target.value})}/><br/>
								<FieldText label={"Username"} type="text" name="username" placeholder="Username" 
									required shouldFitContainer value={this.state.username}
									onChange={e => this.setState({username: e.target.value})}/><br/>
								<FieldText label={"Email"} type="email" name="email" placeholder="Email" 
									required shouldFitContainer value={this.state.email}
									onChange={e => this.setState({email: e.target.value})}/><br/>
								<FieldText label={"Password"} type="password" name="password" placeholder="Password"
									required  shouldFitContainer value={this.state.password}
									onChange={e => this.setState({password: e.target.value})}/> 
							</div>
							<div style={{width: "50%", padding: "1.5%"}}>
								<FieldText label={"Confirm Password"} type="password" name="confirmpassword" 
									placeholder="Confirm Password" required shouldFitContainer value={this.state.confirmpassword}
									onChange={e => this.setState({confirmpassword: e.target.value})}/>
								<FieldText label={"Major"} type="text" name="major" placeholder="Major" 
									required shouldFitContainer value={this.state.major}
									onChange={e => this.setState({major: e.target.value})}/><br/>
								<FieldText label={"Interests"} type="text" name="tags" placeholder="Interests" 
									required shouldFitContainer value={this.state.tags}
									onChange={e => this.setState({tags: e.target.value})}/><br/>
							</div>
						</div>
					</FieldForm>
					<div className="error-register">
						{errorFromRequest !== '' ? errorFromRequest:this.state.showError? registerError: null}
					</div>
					<Button houldFitContainer appearance="primary" className="register-btn" 
					onClick={() => this.onSubmit()}>Register</Button>
                </Card>
            </div>	
		)
	}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ registrationRequest }, dispatch);
}


function mapStateToProps(state) {
	return {
		session: { ...state.session }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
