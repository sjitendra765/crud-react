import React from 'react';
import {connect} from 'react-redux';
import {getUserById, editInfo} from '../actions';


class EditInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.users
        }
    }

    componentDidMount() {
        this.props.getUserById(this.props.match.params.id);
    }

    componentWillReceiveProps (nextProps,nextState){
      console.log(nextProps.users)
      if(nextProps.users !== this.props.users){
        this.setState({
            user: nextProps.users
        })
        return true;
      }
     
    }
    submit(e) {
        e.preventDefault();
        this.props.editInfo(this.state.user, this.props.match.params.id);
    }
    handleChange(event) {
        var user = {
            ...this.state.user,
            [event.target.name]: event.target.value
        }
        this.setState({user:user});
    }
    render() {
        
        return (
            <form onSubmit={this.submit.bind(this)}>
                    <label for="fullname">Full Name</label>
                    <input
                        name="fullname"
                        id="fullname"
                        label="Full Name"
                        value = {this.state.user.fullname}
                        onChange = {this.handleChange.bind(this)}
                        type="text" /> <br />

                    <label for="address">Address</label>
                    <input
                        name="address"
                        id="address"
                        value = {this.state.user.address}
                        onChange = {this.handleChange.bind(this)}
                        label="Address"
                        type="text" />
                    <br />

                    <label for="city">City</label>
                    <input
                        name="city"
                        id="city"
                        value = {this.state.user.city}
                        onChange = {this.handleChange.bind(this)}
                        label="City"
                        type="text" />
                    <br />
                    <label for="country">Country</label>
                    <input
                        name="country"
                        id="country"
                        value = {this.state.user.country}
                        onChange = {this.handleChange.bind(this)}
                        label="Country"
                        type="text" />
                    <br />
                    <label for="role">Role</label>
                    <input
                        name="role"
                        id="role"
                        label="role"
                        value = {this.state.user.role}
                        onChange = {this.handleChange.bind(this)}
                        type="text" />

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>

            </form>
        )
    }
    
}

function mapStateToProps(state){
    return {
        users: state.user.detail
    }
}

export default connect(mapStateToProps ,{editInfo, getUserById})(EditInfo);