import axios from 'axios'


export const saveSprite = (id, name, frames, email, token) => {
    
    return axios.post('http://localhost:5000/api/secure/sprite',
        {
            id: id,
            name: name,
            frames: frames,
            email: email
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response)
        .catch(error => error)
}