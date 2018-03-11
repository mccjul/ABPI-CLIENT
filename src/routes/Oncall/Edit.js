import React, { Component } from 'react';
import { Modal, Button, Form, FormGroup } from 'react-bootstrap';
import { DateRangePicker } from 'react-dates';
import { del, put } from '../../utils/api';
import moment from 'moment';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      startDate: moment(),
      endDate: moment()
    };
    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.show === true) {
      this.setState({
        startDate: moment(nextProps.event.start.toDateString()),
        endDate: moment(nextProps.event.end.toDateString())
      });
    }
  }
  render() {
    return (
      <Modal show={this.props.show} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Update Oncall Schedual</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ textAlign: 'center' }} inline>
            <FormGroup controlId="formInlineName" style={{ paddingRight: 50 }}>
              <span>{this.props.event.title}</span>
            </FormGroup>{' '}
            <FormGroup controlId="formInlineDate">
              <DateRangePicker
                startDate={this.state.startDate}
                startDateId="your_unique_start_date_id"
                endDate={this.state.endDate}
                endDateId="your_unique_end_date_id"
                onDatesChange={({ startDate, endDate }) =>
                  this.setState({ startDate, endDate })
                }
                focusedInput={this.state.focusedInput}
                onFocusChange={focusedInput => this.setState({ focusedInput })}
                small
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="pull-left" onClick={this.close}>
            Cancel
          </Button>
          <Button bsStyle="success" onClick={this.save}>
            Save
          </Button>
          <Button bsStyle="danger" onClick={this.delete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  close() {
    this.setState({
      focusedInput: null,
      startDate: moment(),
      endDate: moment()
    });
    this.props.hide();
  }

  async save() {
    await put('oncall/'.concat(this.props.event.id), {
      user: this.props.event.user,
      startDate: this.state.startDate.format('DD-MM-YYYY'),
      endDate: this.state.endDate.add(1, 'days').format('DD-MM-YYYY'),
      reminder_access: this.props.event.reminder_access,
      reminder_oncall: this.props.event.reminder_oncall
    });
    this.close();
  }
  async delete() {
    await del('oncall', this.props.event.id);
    this.close();
  }
}

export default Edit;
