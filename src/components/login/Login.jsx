import React from 'react';
import css from './Login.scss';

class Login extends React.Component{
    login = (e) => {
        e.preventDefault();
        if ( typeof this.props.login === 'function' ){
            this.props.login();
          }
    }

    render(){
        return <React.Fragment>
            <div className="login">
            <h1>@taskify</h1>
                <form>
                    <input type="email" placeholder="e-mail"/>
                    <input type="password" placeholder="password"/>
                    <button onClick={e => this.login(e)}>Log In</button>
                </form>
                <p>Register for free...</p>
            </div>
        </React.Fragment>;
    }
}

export default Login;