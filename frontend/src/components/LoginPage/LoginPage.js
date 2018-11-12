import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import { loginRequest } from '../../actions/sessionActions';


class LoginPage extends Component {



    onLoginClicked = () => {
        this.props.loginRequest();
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loginRequest }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginPage);