import React, {Component } from 'react'
import { connect } from 'react-redux';
import {deleteById, getusers} from '../actions';
class Users extends React.Component {
    constructor(props){
        super(props);
        this.state={
            searchByuser:''
        }
    }   
    deleteuser(id){
            this.props.deleteById(id)
            this.props.getusers();
        }
  render() {
    const data = this.props.data;
    return (
      <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Country</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {data.map((u,i) =>
                    <tr>
                        <td>{u.fullname}</td>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td>{u.country}</td>
                        <td>{u.role}</td>
                        <td><button className="btn btn-primary"><a href={`/user/${u._id}`}>View</a></button>
                            <button className="btn btn-warning"><a href={`/edit/${u._id}`}>Edit</a></button>
                            <button className="btn btn-danger" onClick={this.deleteuser.bind(this, u._id)}>Delete</button>
                        </td>
                    </tr>
                )}
                    
                </tbody>

            </table>
    );
  }
}

export default connect(null, {deleteById, getusers})(Users);