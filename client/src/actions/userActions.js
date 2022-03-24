import axios from 'axios';
import { GET_USERS, GET_USERS_FAIL, DELETE_USER, ADD_USER, USERS_LOADING, UPDATE_USER, GET_USER_DETAILS, GET_USER_DETAILS_SUCCESS, GET_USER_DETAILS_FAIL, GET_USER_DETAILS_RESET } from "../actions/types";
import { userRequest } from '../requestMethods';

export const setUsersLoading = () => {
    return {
        type: USERS_LOADING
    }
}

export const setUserDetailsLoading = () => {
    return {
        type: GET_USER_DETAILS
    }
}

export const removeUserDetails = () => dispatch => {
    dispatch({
        type: GET_USER_DETAILS_RESET
    })
}

export const getUsers = () => dispatch => {
    dispatch(setUsersLoading);
    userRequest.get('https://brand404.herokuapp.com/api/users')
        .then(res => dispatch({
            type: GET_USERS,
            payload: res.data
        }))
        .catch(error => dispatch({
            type: GET_USERS_FAIL,
            payload: error.payload && error.response.data.message ? error.response.data.message : error.message
        }))
}

export const deleteUser = (id) => dispatch => {
    userRequest.delete(`https://brand404.herokuapp.com/api/users/${id}`)
        .then(res => dispatch({
            type: DELETE_USER,
            payload: id
        }))
}

export const addUser = (user) => dispatch => {
    userRequest.post('https://brand404.herokuapp.com/api/users', user)
        .then(res => dispatch({
            type: ADD_USER,
            payload: res.data
        }))
}

export const updateUser = (user, id) => dispatch => {
    userRequest.put(`https://brand404.herokuapp.com/api/users/${id}`, user)
        .then(res => dispatch({
            type: UPDATE_USER,
            payload: res.data
        }))
}

export const getUserDetails = (id) => dispatch => {
    dispatch(setUsersLoading);
    userRequest.get(`https://brand404.herokuapp.com/api/users/find/${id}`)
        .then(res => dispatch({
            type: GET_USER_DETAILS_SUCCESS,
            payload: res.data
        }))
        .catch(error => dispatch({
            type: GET_USER_DETAILS_FAIL,
            payload: error.payload && error.response.data.message ? error.response.data.message : error.message
        }))
}