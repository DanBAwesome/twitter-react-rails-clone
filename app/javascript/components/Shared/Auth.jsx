import React, { Component } from 'react';
import Requests from './Requests';

const Auth = {
    AuthenticateUser() {
        return Requests.get("/authenticated").then((response) => {
            return response;
        })
    },
    SignIn(username, password) {
        const data = new FormData();

        data.append('user[username]', username);
        data.append('user[password]', password);

        return Requests.post('/sessions', data).then(
            (response) => {
                console.log(response)
                return response.success;
            }
        );
    }
}

export default Auth;