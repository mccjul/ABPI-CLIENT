import React, { Component } from 'react';
import { Modal, Button, Form, FormGroup, Glyphicon } from 'react-bootstrap';
import { DateRangePicker } from 'react-dates';
import { Typeahead } from 'react-bootstrap-typeahead';
//import moment from 'moment'

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateCollection: ['']
    };
    this.close = this.close.bind(this);
  }
  close() {
    this.setState({ dateCollection: [''] });
    this.props.hide();
  }
  render() {
    return (
      <Modal show={this.props.show} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Add Oncall Schedual</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Create Schedual</h4>
          {this.state.dateCollection.map((elm, i) => (
            <Sched
              onChange={shed =>
                this.setState({
                  dateCollection: [...this.dateCollection[i]]
                })
              }
              key={i}
            />
          ))}
          <br />
          <Button
            bsStyle="success"
            className="center-block"
            onClick={() =>
              this.setState({
                dateCollection: [...this.state.dateCollection, '']
              })
            }
          >
            <Glyphicon glyph="plus" />
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="info" className="pull-left" onClick={this.close}>
            Import Excel
          </Button>
          <Button bsStyle="success" onClick={this.close}>
            Save
          </Button>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class Sched extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null,
      name: ''
    };
  }
  render() {
    return (
      <Form style={{ textAlign: 'center' }} inline key={this.props.key}>
        <FormGroup controlId="formInlineName">
          <Typeahead
            onChange={name => {
              this.setState({ name });
            }}
            options={['julian', 'bob']}
            selected={this.state.selected}
          />
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
    );
  }
}

export default Add;
