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
        debugger;
        if(this.state.email === 'swpp@snu.ac.kr' && this.state.password === 'iluvswpp') {
            this.setState( {vaild: true} );
            debugger;
            this.props.userLogin({email: this.state.email, password: this.state.password});
        } else {
            alert('Email or password is wrong');
        }
    }

    render() {
        if(this.state.vaild) {
            return <Redirect to='/articles' />
        } 
        return (
        <div className='Login'>
            <div>Login</div>
            <div>
                <label>email </label>
                <input 
                    id='email-input'
                    type='text' 
                    onChange={this.handleEmail}
                    //value={this.state.email}
                />
            </div>
            <div>
                <label>password </label>
                <input 
                    id='pw-input'
                    type='text'
                    onChange={this.handlePassword}
                    //value={this.state.password}
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
        userLogin: user => {
            dispatch(actionCreators.login(user));
        },
        getUsers: users => {
            dispatch(actionCreators.getUsers(users));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);