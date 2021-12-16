export const baseUrl = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, email }),
    })
        .then(returnData)
        .then((res) => {
            return res;
        });
};

const returnData = (res) => {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
};

export const login = (password, email) => {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: password,
            email: email,
        }),
    })
        .then(returnData)
        .then((data) => {
            if (data) {
                localStorage.setItem('token', data.token);
                return data;
            }
        });
};

export const getContent = (token) => {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then(returnData)
        .then((data) => data);
};
