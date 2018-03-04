import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Navbar, Nav, MenuItem, NavDropdown } from 'react-bootstrap';

const Loading = ({ error, pastDelay }) => {
  if (error) {
    return <div>Error!</div>;
  } else if (pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
};

const Home = Loadable({
  loader: () => import('./routes/Home'),
  loading: Loading
});

const Oncall = Loadable({
  loader: () => import('./routes/Oncall'),
  loading: Loading
});

class App extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">ABPI - Client</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <MenuItem href="/oncall">Oncall</MenuItem>
              <MenuItem divider />
              <MenuItem>logout</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/oncall" component={Oncall} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
