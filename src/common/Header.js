import React, { Component } from 'react';
import { Navbar, Nav, MenuItem, NavDropdown } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">ABPI - Client</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavDropdown title="Menu" id="basic-nav-dropdown">
            <MenuItem onClick={() => this.props.history.push('/oncall')}>
              OnCall
            </MenuItem>
            <MenuItem divider />
            <MenuItem>logout</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default withRouter(Header);
