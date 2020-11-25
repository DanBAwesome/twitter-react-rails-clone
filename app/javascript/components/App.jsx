import React from 'react';
import {
    BrowserRouter as Router
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import Routing from './Shared/Routing';
import './App.scss';


class App extends React.Component {
    render() {
        const { auth_data } = this.props
        return (
            <Router>
                <Routing auth_data={auth_data} />
            </Router>
        )
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const node = document.getElementById('auth_data');
    const data = JSON.parse(node.getAttribute('data-auth'));
    ReactDOM.render(
        <App auth_data={data} />,
        document.body.appendChild(document.createElement("div"))
    )
})
