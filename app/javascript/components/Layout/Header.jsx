import React, { useState } from "react";
import Twitter from '@img/twitter.svg';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './Header.scss';

const languages = [
    "English",
    "Bahasa Malaya",
    "Robot",
    "Dansk",
    "Suomi"
]

const Header = (props) => {
    const { user, authenticated } = props.auth_data
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

    return (
        <Navbar bg="light" className="pt-0 pb-0">
            <Navbar.Brand href="/">
                <img width="35" height="35" id="icon" src={Twitter} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="twitterNav" />
            <Navbar.Collapse id="twitterNav" className="justify-content-end">
                <Nav>
                    {
                        (user && authenticated) ?
                            (<NavDropdown alignRight title={user.username} id="userDropdown">
                                <NavDropdown.Item href="#">
                                    {user.username}
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={props.logout()} href="#logout">
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                            ) : (
                                <NavDropdown alignRight title={`Language:${selectedLanguage}`} id="languageDropdown" >
                                    { languages.map((language, i) => {
                                        return <NavDropdown.Item onClick={() => setSelectedLanguage(language)} key={language}>{language}</NavDropdown.Item>
                                    })}
                                </NavDropdown>)

                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;
