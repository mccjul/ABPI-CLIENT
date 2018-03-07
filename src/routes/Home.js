import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <Jumbotron>
          <h1>Home of ABPI Client</h1>
          <p>Here you can upload data here for the bot</p>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;
