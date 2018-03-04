import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Button, Glyphicon } from 'react-bootstrap';
import Add from './Add';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from './events';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

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
        <Button onClick={() => this.setState({ show: true })}>
          <Glyphicon glyph="plus" />
        </Button>
        <BigCalendar
          events={events}
          step={60}
          views={['month']}
          showMultiDayTimes
          defaultDate={new Date(2015, 3, 1)}
        />
        <Add
          show={this.state.show}
          hide={() => this.setState({ show: false })}
        />
      </div>
    );
  }
}

export default Oncall;
