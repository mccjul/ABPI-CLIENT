import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Button, Glyphicon, ButtonToolbar } from 'react-bootstrap';
import { get } from '../../utils/api';
import Add from './Add';
import Edit from './Edit';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/en-gb';

moment.locale('en-gb');
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class Oncall extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show_add: false,
      show_edit: false,
      events: [],
      edit_event: {}
    };
    this.show_add = this.show_add.bind(this);
    this.show_edit = this.show_edit.bind(this);
    this.hide = this.hide.bind(this);
  }
  async componentDidMount() {
    let events = await get('oncall');

    this.setState({
      events: events
        ? events.map(elm => ({
            id: elm.id,
            title: elm.user.real_name,
            allDay: true,
            user: elm.user,
            start: moment(elm.startDate).toDate(),
            end: moment(elm.endDate).toDate(),
            reminder_access: elm.reminder_access,
            reminder_oncall: elm.reminder_oncall
          }))
        : []
    });
  }
  show_add() {
    this.setState({ show_add: true });
  }
  show_edit(event) {
    this.setState({ show_edit: true, edit_event: event });
  }
  async hide() {
    let events = await get('oncall');
    this.setState({
      show_add: false,
      show_edit: false,
      edit_event: {},
      events: events
        ? events.map(elm => ({
            id: elm.id,
            title: elm.user.real_name,
            allDay: true,
            user: elm.user,
            start: moment(elm.startDate).toDate(),
            end: moment(elm.endDate).toDate(),
            reminder_access: elm.reminder_access,
            reminder_oncall: elm.reminder_oncall
          }))
        : []
    });
  }
  render() {
    // console.log(
    //   moment()
    //     .add(2, "week")
    //     .add(2, "day")
    //     .format()
    // );
    return (
      <div className="container">
        <BigCalendar
          events={this.state.events}
          step={60}
          views={['month']}
          showMultiDayTimes
          defaultDate={new Date(moment().format())}
          selectable
          onSelectEvent={event => this.show_edit(event)}
          components={{
            toolbar: Toolbar(
              <Button onClick={this.show_add}>
                <Glyphicon glyph="plus" />
              </Button>
            )
          }}
        />
        <Add show={this.state.show_add} hide={this.hide} />
        <Edit
          show={this.state.show_edit}
          hide={this.hide}
          event={this.state.edit_event}
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
