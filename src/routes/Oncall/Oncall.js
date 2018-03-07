import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Button, Glyphicon, ButtonToolbar } from 'react-bootstrap';
import { get } from '../../utils/api';
import Add from './Add';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class Oncall extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      events: []
    };
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }
  async componentDidMount() {
    let events = await get('oncall');

    this.setState({
      events: events.map(elm => ({
        id: elm.id,
        title: elm.user.real_name,
        allDay: true,
        start: new Date(moment(elm.startDate, 'DD-MM-YYYY').format()),
        end: new Date(moment(elm.endDate, 'DD-MM-YYYY').format())
      }))
    });
  }
  show() {
    this.setState({
      show: true
    });
  }
  async hide() {
    let events = await get('oncall');
    this.setState({
      show: false,
      events: events.map(elm => ({
        id: elm.id,
        title: elm.user.real_name,
        allDay: true,
        start: new Date(moment(elm.startDate, 'DD-MM-YYYY').format()),
        end: new Date(moment(elm.endDate, 'DD-MM-YYYY').format())
      }))
    });
  }
  render() {
    return (
      <div className="container">
        <BigCalendar
          events={this.state.events}
          step={60}
          views={['month']}
          showMultiDayTimes
          defaultDate={new Date(moment().format())}
          components={{
            toolbar: Toolbar(
              <Button onClick={this.show}>
                <Glyphicon glyph="plus" />
              </Button>
            )
          }}
        />
        <Add show={this.state.show} hide={this.hide} />
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
