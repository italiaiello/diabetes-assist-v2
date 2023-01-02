import React, { Component } from 'react';
import Calendar from 'react-calendar';

import './styles.css';
 
class ReactCalendar extends Component {
  state = {
    date: new Date(),
  }
 
  onChange = date => this.setState({ date })
 
  render() {
    return (
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
    )
  }
}

export default ReactCalendar;