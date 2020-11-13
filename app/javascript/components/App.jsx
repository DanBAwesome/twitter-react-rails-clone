import React from 'react';
import {
    BrowserRouter as Router
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import Routing from './Shared/Routing';
import './App.scss';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: false
        }

    }

    componentDidMount() {
    }

    render() {
        const { authenticated } = this.state;
        return (
            <Router>
                <Routing authenticated={authenticated} />
            </Router>
        )
    }

}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <App />,
        document.body.appendChild(document.createElement("div"))
    )
})