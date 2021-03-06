//---------------Build
import React from 'react';
//--------------Style
import css from './Login.scss';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:""
        };
    }

    handleEmail = (e) =>{
        this.setState({email: e.target.value});
    }

    handlePassword = (e) =>{
        this.setState({password: e.target.value});
    }

    login = (e) => {
        e.preventDefault();
        // if ( typeof this.props.login === 'function'
        //     && this.state.email === "admin"
        //     && this.state.password === "admin" ){
            this.props.login();
        // }
    }

    render(){
        return <React.Fragment>
                    <div className="login">
                        {/* <img className="logo" src="./images/logo.svg"/> */}
                        <h1>@taskify</h1>
                        <form>
                            <input type="email" placeholder="e-mail" onChange={this.handleEmail}/>
                            <input type="password" placeholder="password" onChange={this.handlePassword}/>
                            <button onClick={e => this.login(e)}>Log In</button>
                        </form>
                        <p>or Sign Up for free...</p>
                    </div>
                </React.Fragment>;
    }
}

export default Login;