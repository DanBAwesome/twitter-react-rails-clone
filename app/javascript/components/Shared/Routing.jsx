import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Auth from './Auth';
import Requests from './Requests';
import Header from '../Layout/Header';

const ProtectedComponent = (props, ...rest) => {
    return (
        <Route {...rest} render={({ location }) => (
            props.authenticated ? (
                props.children
            ) :
                (
                    <Redirect to={{
                        pathname: "/login",
                        state: { from: location }
                    }} />
                )
        )} />
    )
}

class Routing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };

        this.logout = this.logout.bind(this);
    }

    logout() {
        Requests.delete('/sessions').then(() => {
            this.props.history.push('/login')
        });
    }

    authenticateUser() {
        return Auth.AuthenticateUser().then((response) => {
            this.setState({ user: response })
        });
    }

    componentDidMount() {
        this.authenticateUser().then(() => {
            let { user } = this.state;
            
            if (!user.authenticated) {
                this.props.history.replace('/login');
            }
            else {
                this.props.history.replace('/');
            }

        }).finally(() => {
            this.unlisten = this.props.history.listen((location, action) => {
                this.authenticateUser();
            })
        })
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        const { user } = this.state;
        return (
            <React.Fragment>
                <Header user={user} logout={() => this.logout} />
                <Switch>
                    {/* <ProtectedComponent path="/" exact authenticated={this.props.authenticated}>
                        <Dashboard />
                    </ProtectedComponent> */}
                    <Route path="/login" component={Login} />
                    <Route path="/" exact>
                        <Dashboard user={user} />
                    </Route>
                    <Route path="/:username" render={(props) => {
                        return <Dashboard user={user} {...props}></Dashboard>
                    }}>
                    </Route>
                </Switch>
            </React.Fragment>
        )
    }
}

export default withRouter(Routing);