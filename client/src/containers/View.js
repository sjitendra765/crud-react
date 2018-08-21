import React from 'react';
import { connect } from 'react-redux';
import {getUserById} from '../actions';

class View extends React.Component {
	constructor(props){
        super(props);
        this.state={
        }
    }    
    componentWillMount(){
        this.props.getUserById(this.props.match.params.id);
    }
    render() {
    	var user = this.props.users
        return (
            <div>
                <h2>Detail Information of {user.fullname}</h2>
                <div>Username: {user.username}</div>
                <div>Email: {user.email}</div>
                <div>Address: {user.address}</div>
                <div>City: {user.city}</div>
                <div>Country: {user.country}</div>
                <div>Role: {user.role}</div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        users: state.user.detail
    }
}

export default connect(mapStateToProps, {getUserById})(View);