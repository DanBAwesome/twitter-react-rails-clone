import React from "react";
import ImageSwap from "../Shared/ImageSwap";
import Requests from "../Shared/Requests";
import Dunes from "@img/dunes.png";
import Bird from "@img/bird.png";
import "./Login.scss";
import { Button, Card, Form, FormControl, FormGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: {
                username: "",
                password: ""
            },
            signUp: {
                username: "",
                email: "",
                password: ""
            }

        };

        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
        this.updateLoginInfo = this.updateLoginInfo.bind(this);
        this.updateSignUpInfo = this.updateSignUpInfo.bind(this);
        console.log(this.props)
    }

    updateLoginInfo(event) {
        let { login } = this.state;

        login[event.target.name] = event.target.value;

        this.setState({ login });
    }

    updateSignUpInfo(event) {
        let { signUp } = this.state;

        signUp[event.target.name] = event.target.value;

        this.setState({ signUp });
    }

    login(event) {
        let { username, password } = this.state.login;
        event.preventDefault();
        const data = new FormData();

        data.append('user[username]', username);
        data.append('user[password]', password);

        Requests.post('/sessions', data).then(
            (response) => {
                console.log(response.success);
                if (response.success) {
                    this.props.history.replace('/')
                }
            }
        );
    }

    signUp(event) {
        let { username, email, password } = this.state.signUp;

        const data = new FormData();

        data.append('user[username]', username);
        data.append('user[email]', email);
        data.append('user[password]', password);

        Requests.post('/users', data).then(() => {
            this.login()
        })
    }

    render() {
        const { username, password } = this.state;
        const { email } = this.state.signUp;

        return (
            <React.Fragment>
                <ImageSwap images={[Dunes, Bird]} />
                <div id="login" className="container">
                    <div className="row mt-70 justify-content-around">
                        <div className="col-6 h-100" id="loginIntro">
                            <h2>Welcome To Twitter</h2>
                            <br />
                            <p>Connect with your friends — and
                            other fascinating people. Get in-the-moment updates on the things that interest you.
                                And watch events unfold, in real time, from every angle.</p>
                        </div>

                        <div className="col-4">
                            <Card>
                                <Card.Body>
                                    <Form onSubmit={this.login}>
                                        <FormGroup>
                                            <FormControl type="text" placeholder="Username" name="username" value={username} onChange={this.updateLoginInfo} />
                                        </FormGroup>
                                        <FormGroup className="col-7 d-inline-block p-0">
                                            <FormControl type="password" placeholder="Password" name="password" value={password} onChange={this.updateLoginInfo} />
                                        </FormGroup>

                                        <Button type="submit" className="col-4 offset-1 float-right">
                                            Sign In
                                        </Button>
                                        <input type="checkbox" /> &nbsp;
                                        <span className="text-black-50">Remember Me</span>
                                        <a href="#" className="float-right">Forgot Password?</a>
                                    </Form>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body>
                                    <Form onSubmit={this.signUp}>
                                        <div className="pb-2">
                                            <b>New To Twitter?</b> Sign Up
                                        </div>
                                        <FormGroup>
                                            <FormControl type="text" placeholder="Username" name="username" value={username} onChange={this.updateSignUpInfo} />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormControl type="email" placeholder="Email" name="email" value={email} onChange={this.updateSignUpInfo} />
                                        </FormGroup>
                                        <FormGroup>
                                            <FormControl type="password" placeholder="Password" name="password" value={password} onChange={this.updateSignUpInfo} />
                                        </FormGroup>

                                        <Button type="submit" className="col-6 float-right btn-warning">
                                            Sign Up For Twitter
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Login;
