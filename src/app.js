import React, { Component } from "react";
import "./app.css";
import { Layout, Content } from "react-mdl";
import Main from "./main";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

class App extends Component {

  render() {
    return (
        <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">ASAF Enterprise</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <NavLink href="#" class="NavbarLink">Acerca de Nós</NavLink>
                <NavLink to="/jobs" class="NavbarLink">Oportunidades de Emprego</NavLink>
                <NavLink href="#pricing" class="NavbarLink">Contactos</NavLink>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Procure aqui..." className="mr-sm-2" />
                <Button variant="outline-info">Pesquisar</Button>
            </Form>
            </Navbar.Collapse>
        </Navbar>
          <Content>
            <div className="page-content" />
            <Main>
              
            </Main>
          </Content>
          </div>
    );
  }
}


export default App;