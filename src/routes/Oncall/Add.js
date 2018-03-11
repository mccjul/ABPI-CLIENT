import React, { Component } from 'react';
import { Modal, Button, Form, FormGroup, Glyphicon } from 'react-bootstrap';
import { DateRangePicker } from 'react-dates';
import { Typeahead } from 'react-bootstrap-typeahead';
import { post, get } from '../../utils/api';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateCollection: [
        {
          startDate: null,
          endDate: null,
          user: null
        }
      ],
      options: []
    };
    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
    this.importExcel = this.importExcel.bind(this);
  }

  async componentDidMount() {
    this.setState({ options: await get('oncall/users') });
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
              onChange={shed => {
                let data = this.state.dateCollection.slice();
                data[i] = shed;
                this.setState({
                  dateCollection: data
                });
              }}
              entry={this.state.dateCollection[i]}
              key={i}
              options={this.state.options}
            />
          ))}
          <br />
          <Button
            bsStyle="success"
            className="center-block"
            onClick={() =>
              this.setState({
                dateCollection: [
                  ...this.state.dateCollection,
                  {
                    startDate: null,
                    endDate: null,
                    user: null
                  }
                ]
              })
            }
          >
            <Glyphicon glyph="plus" />
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle="info"
            className="pull-left"
            onClick={this.importExcel}
            disabled={true}
          >
            Import Excel
          </Button>
          <Button bsStyle="success" onClick={this.save}>
            Save
          </Button>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  close() {
    this.setState({
      dateCollection: [
        {
          startDate: null,
          endDate: null,
          user: null
        }
      ]
    });
    this.props.hide();
  }

  async save() {
    await post(
      'oncall',
      this.state.dateCollection.map(elm => ({
        user: elm.user[0],
        startDate: elm.startDate.format('DD-MM-YYYY'),
        endDate: elm.endDate.add(1, 'days').format('DD-MM-YYYY')
      }))
    );
    this.close();
  }
  importExcel() {
    this.close();
  }
}

class Sched extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null
    };
  }
  render() {
    return (
      <Form style={{ textAlign: 'center' }} inline>
        <FormGroup controlId="formInlineName">
          <Typeahead
            onChange={name => {
              this.props.onChange({ ...this.props.entry, user: name });
            }}
            options={this.props.options}
            selected={this.props.entry.name}
            labelKey={option => `${option.real_name}`}
          />
        </FormGroup>{' '}
        <FormGroup controlId="formInlineDate">
          <DateRangePicker
            startDate={this.props.entry.startDate}
            startDateId="your_unique_start_date_id"
            endDate={this.props.entry.endDate}
            endDateId="your_unique_end_date_id"
            onDatesChange={({ startDate, endDate }) =>
              this.props.onChange({ ...this.props.entry, startDate, endDate })
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
