import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';

import styled from 'styled-components';
import PropTypes from 'prop-types';

import { loginRequest } from '../../actions/sessionActions';


import FieldText from '@atlaskit/field-text';
import { Card } from '@material-ui/core';
import PageHeader from '@atlaskit/page-header';
import Button from '@atlaskit/button';


import './LoginPage.css';


const FieldForm = styled.div`
    width: 100%;
    text-align: center;
    align-items: center;
`;

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {username: '', password: ''};
    }

    onSubmit = () => {
        let {username, password} = this.state;
        let data = {username: username, password: password}
        this.props.loginRequest(data);
    }
    
    render() {
        const isLoggedIn = this.props.session.isLoggedIn;
        const loginError = this.props.session.loginError;
        const defaultLoginError = 'Login Failed';
        return (
            <div>
                <div className="main-header">
                    <PageHeader>Creating and Sharing Notes Easy.</PageHeader>
                </div>
                <Card className={"login-card"}>
                    <PageHeader>Note-Platform</PageHeader>
                    <FieldForm>
                        <FieldText label="Username" name="username" shouldFitContainer
                            placeholder="Username" type="text" autoFocus required value={this.state.username}
                            onChange={e => this.setState({username: e.target.value})} />
                        <br/>
                        
                        <FieldText label="Password" name="password" shouldFitContainer
                            type="password" placeholder="Password" required value={this.state.password}
                            onChange={e => this.setState({password: e.target.value})} />
                    </FieldForm>

                    {!isLoggedIn && isLoggedIn !== null?
                        <div className="error-login">
                            {loginError !== ''? loginError: defaultLoginError}
                        </div>
                    : null}

                    <Button shouldFitContainer appearance="primary" className="login-btn" 
                    onClick={() => this.onSubmit()}>Sign in</Button>
                
                    <Button shouldFitContainer appearance="primary" className="login-btn" 
                    onClick={() => this.props.history.replace('/register')}>Register</Button>
                </Card>
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

LoginPage.propTypes = {
    loginRequest: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
