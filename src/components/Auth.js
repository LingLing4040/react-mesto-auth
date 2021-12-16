export const baseUrl = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, email }),
    })
        .then((response) => {
            try {
                if (response.status === 201) {
                    return response.json();
                }
            } catch (e) {
                return e;
            }
        })
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err));
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
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                localStorage.setItem('token', data.token);
                return data;
            }
        })
        .catch((err) => {
            console.log(err);
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
        .then((res) => res.json())
        .then((data) => data);
};
