import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../history';


class AuthenticateUser extends Component {

    constructor(props) {
        super(props);
        this.isLoggedIn = this.props.session.isLoggedIn;
    }

    componentDidMount() {
        if(!this.isLoggedIn){
            history.push('/');
        }
        // console.log(this.isLoggedIn);
    }


    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }

}


function mapStateToProps(state) {
    return {
        session: { ...state.session }
    }
}


export default connect(mapStateToProps, null)(AuthenticateUser);
