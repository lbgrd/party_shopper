import React, { Component, Fragment } from 'react';
import { Label, Button, FormGroup, Form, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { getEvent, updateEvent } from '../actions/eventActions';
import PropTypes from 'prop-types';

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

export class Event extends Component {

  state = {
    id: null,
    name: null,
    date: null
  }

  static propTypes = {
    getEvent: PropTypes.func.isRequired,
    updateEvent: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }

  componentDidUpdate(prevProps) {
    // Get the event info
    this.props.getEvent();

    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for saving error
      if (error.id !== 'EVENT_ERROR') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null })}
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, date } = this.state;
    const { _id } = this.props.event;

    // Edit the event name and date
    this.props.updateEvent({ _id , name, date });
  }

  render() {
    const { name, date } = this.props.event;
    const strDate = new Date(date);
    const nowDate = new Date();

    return (
        <div>
        { this.props.isAuthenticated ?
          <Form onSubmit={this.onSubmit}>
          <FormGroup>
          <Label for="name">Event</Label>
          <Input type="text"
          name="name"
          id="name"
          placeholder={name}
          className="mb-3"
          onChange={this.onChange} />

          <Label for="date">Date</Label>
          <Input type="text"
          name="date"
          id="date"
          placeholder={isValidDate(strDate) ? strDate.toDateString() : nowDate.toDateString()}
          className="mb-3"
          onChange={this.onChange} />

          <Button
          color="dark"
          style={{marginTop: '2rem'}}
          block>Save</Button>
          </FormGroup>
          </Form>
          :
          <h1>{name ? name : "My event"} | {isValidDate(strDate) ? strDate.toDateString() : nowDate.toDateString()}
          </h1>
        }
      </div>
    )}
}


const mapStateToProps = state => ({
      isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  ...state.event
})

    export default connect(mapStateToProps, { getEvent, updateEvent })(Event);
