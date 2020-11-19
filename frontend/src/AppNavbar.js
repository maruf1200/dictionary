import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/logo.jpg';

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return <Navbar className="nav" expand="md">
      <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink
              href="https://www.linkstaff.co.jp/">JLPT</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="http://e-resident.jp/">ABOUT</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="http://e-resident.jp/">CONTACT</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="http://e-resident.jp/">sign in/ sign up</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>;
  }
}