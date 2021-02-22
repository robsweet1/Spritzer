import axios from 'axios'


export const login = (email, password) => {

    return axios.post(`http://localhost:5000/api/auth/login`, {
        email: email,
        password: password
    })
        .then(response => response.data)
        .catch(error => error)
}

export const signup = (email, password) => {

    return axios.post(`http://localhost:5000/api/auth/signup`, {
        email: email,
        password: password
    })
        .then(response => response.data)
        .catch(error => error)
}



export const getProfile = (token) => {

    return axios.get('http://localhost:5000/api/secure/profile',
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.data.user)
        .catch(error => error)
}