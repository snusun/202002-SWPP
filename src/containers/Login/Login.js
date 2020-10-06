import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';

class Login extends Component {
    state = {
        email: '',
        password: '',
        vaild: false,
    }

    componentDidMount() {
        this.props.getUsers();
        //debugger;
        if(this.props.logged_in) {
            this.props.history.push("./articles");
        }
    }

    handleEmail = e => {
        this.setState(
            {email: e.target.value}
        );
    };

    handlePassword = e => {
        this.setState(
            {password: e.target.value}
        );
    };

    handleLoginButton = () => {
        if(this.state.email === 'swpp@snu.ac.kr' && this.state.password === 'iluvswpp') {
            this.setState( {vaild: true} );
            //this.props.logged_in = true;
            this.props.getUser();
            this.props.userLogin();
//            this.props.userLogin({email: this.state.email, password: this.state.password});
            //this.props.getUsers(this.props.user)
        } else {
            alert('Email or password is wrong');
        }
        debugger;
    }

    render() {
        return (
        <div className='Login'>
            <div>Login</div>
            <div>
                <label>email </label>
                <input 
                    id='email-input'
                    type='text' 
                    onChange={this.handleEmail}
                />
            </div>
            <div>
                <label>password </label>
                <input 
                    id='pw-input'
                    type='text'
                    onChange={this.handlePassword}
                />
            </div>
            <div>
                <button
                    id='login-button'
                    onClick={ () => this.handleLoginButton() }>Login</button>
            </div>

        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        logged_in: state.user.logged_in,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userLogin: () => {
            dispatch(actionCreators.login());
        },
        getUsers: users => {
            dispatch(actionCreators.getUsers(users));
        },
        getUser: () => {
            dispatch(actionCreators.getUser());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);