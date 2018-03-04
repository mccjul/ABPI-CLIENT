import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import { Button, Modal } from 'react-bootstrap'
import "react-big-calendar/lib/css/react-big-calendar.css";
import events from './events'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))



class Oncall extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false
    };
  }
  render() {
    return (
      <div className="container">
        <Button onClick={() => this.setState({ show: true })}>Add</Button>
        <BigCalendar
          events={events}
          step={60}
          views={["month"]}
          showMultiDayTimes
          defaultDate={new Date(2015, 3, 1)}
        />
        <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Add Oncall Schedual</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>

          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="info" className="pull-left" onClick={this.handleClose}>Import Excel</Button>
            <Button bsStyle="success" onClick={this.handleClose}>Save</Button>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div >
    );
  }
}

export default Oncall;