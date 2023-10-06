import axios from './axios';

const header={
    headers :{
        "auth-token" : localStorage.getItem('auth-token')?localStorage.getItem('auth-token'):null,
        'Content-Type': 'application/json',
    }
}

const URL= 'http://localhost:3000'

export const loginApi = (data)=> axios.post(URL+'/api/login',data);

export const registerApi = (data)=> axios.post(URL+'api/createAccount',data);

// export const getUserApi = data =>axios.get(URL+'/api/userData',header)
export const getUserApi = data =>{
    const token = localStorage.getItem('auth-token');
    const headers = {'auth_token': token}
    return axios.get(URL+'/api/userData',{
        params : data,
        headers : headers
    })
}

export const fetchAllTask = (data) =>axios.get(URL+'/api/todo/fetchtask',{params:data ,headers: {
    "auth-token" : localStorage.getItem('auth-token')?localStorage.getItem('auth-token'):null,
    'Content-Type': 'application/json',

}})


export const addTask = (data) => axios.post(URL+'/api/todo/insertTask',data,header)

export const taskCompleted= data => axios.post(URL+'/api/todo/completed',data,header)

export const fetchCompletedTask = data => axios.post(URL+'/api/todo/fetchCompleted',data,header)

export const deleteTask = data => axios.post(URL+'/api/todo/removeTask',data,header)


