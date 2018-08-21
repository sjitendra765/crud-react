import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {signupUser} from '../../actions';


class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username :'',
            email:'',
            password: '',
            passwordConfirm:'',
            errors:{}
        }
    }

    submit(e) {
        e.preventDefault();
        if(this.state.username == ''){
            var errors = {
                ...this.state.errors,
                ['username']:"Please enter the username"
            }
            this.setState({errors:errors})
        }
        if(this.state.email == ''){
            var errors = {
                ...this.state.errors,
                ['email']:"Please enter the email"
            }
            this.setState({errors:errors})
        }
        if(this.state.password == '' || this.state.password.length < 6){
            var errors = {
                ...this.state.errors,
                ['password']:"The length of password must be greater or equal to 6"
            }
            this.setState({errors:errors})
        }
        if(this.state.password !== this.state.passwordConfirm){
            var errors = {
                ...this.state.errors,
                ['passwordConfirm']:"password doesnot match"
            }
            this.setState({errors:errors})
        }
        
    if(!isEmpty(this.state.errors))
        return;
    this.props.signupUser(this.state,this);
}
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    render() {
        return (
            <div className="container">
            <h2 className="text-center">Sign Up</h2>
            <form onSubmit={this.submit.bind(this)}>
                
                    <input 
                        name="username"
                        id="username"
                        label="Username"
                        className= "form-control"
                        placeholder= "Username"
                        value = {this.state.username}
                        onChange = {this.handleChange.bind(this)}
                        type="text" />
                    <span>{this.state.errors.username}</span>

                    <input 
                        name="email"
                        id="email"
                        label="Email"
                        placeholder= "Email"
                         className= "form-control"
                         value={this.state.email}
                         onChange = {this.handleChange.bind(this)}
                        type="email" />
                        <span>{this.state.errors.email}</span>
                    <input 
                        name="password"
                        id="password"
                        placeholder="Password"
                         className= "form-control"
                         value={this.state.password}
                         onChange = {this.handleChange.bind(this)}
                        type="password" />
                        <span>{this.state.errors.password}</span>
                    <input 
                        name="passwordConfirm"
                        id="passwordConfirm"
                        placeholder="Confirm Password"
                         className= "form-control"
                         value={this.state.passwordConfirm}
                         onChange = {this.handleChange.bind(this)}
                        type="password" />
                        <span>{this.state.errors.passwordConfirm}</span>
                    
                    <div className="text-center">
                        <button type="submit" className="btn btn-default">Sign up</button>
                    </div>

            </form>

                <div className="text-center">
                    <Link to="/signin">Already have an account? Go ahead and sign in!</Link>
                </div>

            </div>
        )
    }
}

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

export default connect(null,{signupUser})(Signup);