import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Button, Glyphicon, ButtonToolbar } from 'react-bootstrap';
import { get, post } from '../../utils/api';
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
    this.show = this.show.bind(this);
  }
  async componentDidMount() {
    // let t = await get("");
    // console.log(t);
    // let b = await post("", {});
    // console.log(b);
  }
  show() {
    this.setState({ show: true });
  }
  render() {
    return (
      <div className="container">
        <BigCalendar
          events={events}
          step={60}
          views={['month']}
          showMultiDayTimes
          defaultDate={new Date(2015, 3, 1)}
          components={{
            toolbar: Toolbar(
              <Button onClick={this.show}>
                <Glyphicon glyph="plus" />
              </Button>
            )
          }}
        />
        <Add
          show={this.state.show}
          hide={() => this.setState({ show: false })}
        />
      </div>
    );
  }
}

const Toolbar = add => toolbar => {
  const goToBack = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() - 1);
    toolbar.onNavigate('prev');
  };

  const goToNext = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() + 1);
    toolbar.onNavigate('next');
  };

  const goToCurrent = () => {
    const now = new Date();
    toolbar.date.setMonth(now.getMonth());
    toolbar.date.setYear(now.getFullYear());
    toolbar.onNavigate('current');
  };
  return (
    <div className="rbc-toolbar">
      <ButtonToolbar>
        <Button onClick={goToBack}>Previous</Button>
        <Button onClick={goToCurrent}>Current</Button>
        <Button onClick={goToNext}>Next</Button>
        {add}
      </ButtonToolbar>
      <span style={{ paddingLeft: 100 }}>{toolbar.label}</span>
    </div>
  );
};

export default Oncall;
