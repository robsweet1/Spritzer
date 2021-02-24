import axios from 'axios'


export const saveSprite = (id, name, frames, dimensions, email, token) => {
    
    return axios.post('http://localhost:5000/api/secure/sprite',
        {
            id: id,
            name: name,
            frames: frames,
            dimensions: dimensions,
            email: email
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response)
        .catch(error => {
            console.log(error)
            throw error
        })
}

export const getSpriteById = (id, token) => {

    return axios.get(`http://localhost:5000/api/secure/sprite/${id}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response)
        .catch(error => {
            console.log(error)
            throw error
        })
}

export const getSpritesByUser = (token) => {

    return axios.get('http://localhost:5000/api/secure/sprites',
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response)
        .catch(error => {
            console.log(error)
            throw error
        })
}