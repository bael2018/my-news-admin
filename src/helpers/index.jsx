export const arrayFunc = el => {
    return Object.entries(el).map(item => {
        const id = item[0];
        return {
            ...item[1],
            id
        }
    })
}

export const authRequest = (item , email , password) => {
    return fetch(item , {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        })
    })
    .then(res => res.json())
}

export const alertWarner = (item) => {
    item(true)
    setTimeout(() => {
        item(false) 
    }, 3000);
}