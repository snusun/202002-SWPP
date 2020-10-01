import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    state = {
        email: '',
        password: '',
        vaild: false,
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

    handleLoginButton = e => {
        if(this.state.email === 'swpp@snu.ac.kr' && this.state.password === 'iluvswpp') {
            this.setState( {vaild: true} );
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

export default Login;