import React, { Component } from 'react';
import './Login.css'
import axios from 'axios'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    sair(){
        sessionStorage.clear();
        window.location="/login"
    }
    async handleSubmit(evt) {
        evt.preventDefault();


        let loginData = {
            username: this.state.username,
            password: this.state.password
        };

        let response = await axios.post("https://asaf-enterprise-chatbot-api.herokuapp.com/login", loginData, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then(resp => {
            let status = resp.data.status;
            switch(status){
                case "O utilizador não existe":
                    alert("Utilizador não existe");
                    break;
                case "Password Errada!":
                    alert("Password Errada");
                    break;
                case "Password Correta!":

                    sessionStorage.setItem('token',resp.data.token);
                    window.location="/backOffice/jobs"
                    break;
                default:
            }
        }

        ).catch(

        );


        //console.log(response.status)
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }
    render() {
        return (
            <div id="LoginContainer">
                    <h3>Login</h3>
                {
                  (sessionStorage.getItem('token') != null) 
                    ? 
                    <button onClick={this.sair}>Sair</button>
                    :
                    <form onSubmit={this.handleSubmit}>
                        <label class="LoginLabel">Username</label>
                        <input onChange={this.handleChange} type="text" name="username" class="LoginInput" />
                        <label class="LoginLabel">Password</label>
                        <input onChange={this.handleChange} type="password" name="password" class="LoginInput" />
                        <input type="submit" value="Login" class="LoginButton" />
                    </form>
                }
                
            </div>
        );
    }
}

export default Login;
