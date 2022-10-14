import {BASE_URL} from "./constants";

const getResponseData = (res) => {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
};

const parametersForAuthorization = (password, email) => {
    return {
        credentials: 'include',
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({password, email}),
    };
};

export const register = (password, email) => {
    return fetch(
        `${BASE_URL}/signup`,
        parametersForAuthorization(password, email)
    ).then((res) => getResponseData(res));
};

export const authorize = (password, email) => {
    return fetch(
        `${BASE_URL}/signin`,
        parametersForAuthorization(password, email)
    ).then((res) => getResponseData(res));
};

export const logout = () => {
    return fetch(
        `${BASE_URL}/signout`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => getResponseData(res));
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        credentials: 'include',
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
        },
    }).then((res) => getResponseData(res));
};
