import React from 'react';
import Requests from './Requests';

class Protected extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Requests.get("/authenticated").then((response) => {
            if (!response.authenticated) {
                this.props.history.replace('/login');
            }
        })
    }
}

export default Protected
