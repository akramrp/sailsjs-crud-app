import { requirePropFactory } from '@mui/material';
import axios from 'axios';

const SAILS_APP_PATH = 'http://localhost:1337/';
const SAILS_ARTICLE_PATH = "articles"
const SAILS_USER_PATH = "user"

require("dotenv").config();
console.log('env-variable,', process.env.KEY);

// =================== sails crud app apis
// get cookies data
let headers = {};
if(localStorage.getItem('loginData')){
    headers = {
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('loginToken'))
    }
}

export const authUser = async (loginData) => {
    return await axios.post(`${SAILS_APP_PATH}${SAILS_USER_PATH}/login`, loginData)
}

export const addUser = async (userData) => {
    if(localStorage.getItem('loginData'))
        return await axios.post(`${SAILS_APP_PATH}${SAILS_USER_PATH}/registration`, userData, {headers})
    else
        return await axios.post(`${SAILS_APP_PATH}${SAILS_USER_PATH}/registration`, userData)
}

export const getUsers = async (id) => {
    id = id || '';
    return await axios.get(`${SAILS_APP_PATH}${SAILS_USER_PATH}/list/${id}`, {headers:headers})
}

export const editUser = async (id, editData) => {
    return await axios.patch(`${SAILS_APP_PATH}${SAILS_USER_PATH}/update/${id}`, editData, {headers});
}

export const deleteUser = async (id) => {
    return await axios.delete(`${SAILS_APP_PATH}${SAILS_USER_PATH}/delete/${id}`, {headers});
}

export const getAllArticles = async () => {
    return await axios.get(`${SAILS_APP_PATH}${SAILS_ARTICLE_PATH}/list1`, {headers})
}
