import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signinUser} from '../../actions';


class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            email:'',
            password:''
        }
    }

    submit(e) {
        e.preventDefault();
        var email = this.state.email;
        var password = this.state.password
        this.props.signinUser({email, password}, this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    render() {
        return (
            <div className="container">
            <h2 className="text-center">Sign In</h2>
            <form  onSubmit={this.submit.bind(this)}>
                    <input 
                        name="email"
                        id="email"
                        className="form-control"
                        placeholder="Email"
                        value = {this.state.email}
                        onChange = {this.handleChange.bind(this)}
                        type="email" />

                    <input 
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        value = {this.state.password}
                        onChange = {this.handleChange.bind(this)}
                        type="password" />
                

                    <div className="text-center">
                        <button type="submit" className="btn btn-default">Sign In</button>
                    </div>

            </form>

                <div className="text-center">
                    <Link to="/signup">If you dont have account, feel free to create one!</Link>
                </div>

            </div>
        )
    }
    
}

function validate(values) {
    const errors = {};

    if(!values.email) {
        errors.email = 'Please, enter an email!';
    }

    if(!values.password) {
        errors.password = 'Please, enter a password!';
    }

    return errors;
}




export default connect(null, {signinUser})(Signin);