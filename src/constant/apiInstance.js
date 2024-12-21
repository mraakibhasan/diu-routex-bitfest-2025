import axios from 'axios';


const setToken = (access ,  refresh) =>{
    const accessToken  =  localStorage.setItem('access', access);
    const refreshToken = localStorage.setItem('refresh', refresh);
}

const  getaccesToeken = ()=>{
    return localStorage.getItem('access');
}

const getRefreshToken = ()=>{
    return localStorage.getItem('refresh');
}

const removeToken = ()=>{
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
}


// ceating the axios instance
const ApiInstance = axios.create({
    baseURL: 'https://promptly-good-weasel.ngrok-free.app/api/v1',  // the api url
    headers: {
        'Authorization': `Bearer ${getaccesToeken()}`
    }   
})




export default ApiInstance;