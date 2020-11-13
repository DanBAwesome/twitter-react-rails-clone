import React, { Component } from 'react';
import Requests from './Requests';

const Auth = {
    AuthenticateUser() {
        return Requests.get("/authenticated").then((response) => {
            return response;
        })
    }
}

export default Auth;