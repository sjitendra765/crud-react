import axios from 'axios';
import {AUTH_USER, UNAUTH_USER, FETCH_USER, FETCH_DETAIL} from './types';

import  {ROOT_URL} from '../../config';



//=======================================
// USERS ACTIONS
//=======================================

// handling logging in
export function signinUser({email, password}, context) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/signin`, {email, password})
        .then(response => {
            dispatch({type: AUTH_USER});
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('info', JSON.stringify(response.data.info));
            context.props.history.push('/about');
            alertify.success('Welcome back!');
        })
        .catch(() => {
            alertify.error('Signing in failed!!!');
        })
    }
}


// handling signing up - creating a new user
export function signupUser({username, email, password}, context) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/signup`, {username, email, password})
        .then(response => {
            dispatch({type: AUTH_USER});
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            context.props.history.push('/about');
            alertify.success('Welcome!');
        })
        .catch(response => {
            alertify.error(response.response.data.error);
        })
    }
}




// handling logging out
export function signoutUser() {
    return (dispatch) => {
        alertify.confirm('Are you sure you want to sign out?', function() {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            localStorage.removeItem('info');
            dispatch({type: UNAUTH_USER});
            alertify.success('You have successfully signed out!');
        }, function() {
            alertify.error('Signing out canceled!');
        })
        
    }
}

// changing password
export function changePassword({currentPassword, newPassword}) {
    if(localStorage.getItem('role')!= 'admin')
        return alertify.error('Unauthorized!');
    return (dispatch) => {
        axios.post(`${ROOT_URL}/changepassword`, {currentPassword, newPassword}, {headers: {
            authorization: localStorage.getItem('token')
        }})
        .then((response) => {
            alertify.success(response.data.message);
        })
        .catch(err => alertify.error(err.response.data.error))
    }
}


// editing users info
export function editInfo(values,id) {
    if(localStorage.getItem('role')!= 'admin')
        return alertify.error('Unauthorized!');
    return (dispatch) => {
        axios.post(`${ROOT_URL}/editinfo/${id}`, values, {headers: {
            authorization: localStorage.getItem('token')
        }})
        .then((response) => {
            localStorage.setItem('info', JSON.stringify(response.data.info));
            alertify.success('Updated!');
        })
    }
}

export function deleteById(id) {
    if(localStorage.getItem('role')!= 'admin')
        return alertify.error('Unauthorized!');
    return (dispatch) => {
        axios.delete(`${ROOT_URL}/delete/${id}`, {headers: {
            authorization: localStorage.getItem('token')
        }})
        .then((response) => {
            alertify.success('Deleted!');
        })
    }
}

export function getusers() {
    if(localStorage.getItem('role')!= 'admin')
        return alertify.error('Unauthorized!');
    return (dispatch) => {
        axios.get(`${ROOT_URL}/getusers`,{headers: {
            authorization: localStorage.getItem('token')
        }})
        .then((response) => {
            console.log(response.data.user)
            dispatch({ type: FETCH_USER , 
                payload: response.data.user });
            alertify.success('Sucess!');
        })
    }
}

export function usersearch(values) {
    if(localStorage.getItem('role')!= 'admin')
        return alertify.error('Unauthorized!');
    return (dispatch) => {
        axios.get(`${ROOT_URL}/usersearch/${values}`,{headers: {
            authorization: localStorage.getItem('token')
        }})
        .then((response) => {
            console.log(response.data.user)
            dispatch({ type: FETCH_USER , 
                payload: response.data.user });
            alertify.success('Sucess!');
        })
    }
}

export function getUserById(id) {
    if(localStorage.getItem('role')!= 'admin')
        return alertify.error('Unauthorized!');
    return (dispatch) => {
        axios.get(`${ROOT_URL}/getUserById/${id}`,{headers: {
            authorization: localStorage.getItem('token')
        }})
        .then((response) => {
            dispatch({ type: FETCH_DETAIL , 
                payload: response.data.user });
            alertify.success('Sucess!');
        })
    }
}