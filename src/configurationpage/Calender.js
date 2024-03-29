import React, { Component } from "react";
import ReactLightCalendar from '@lls/react-light-calendar'
import './calender.css'

// creates the calendar widget on configuration page
export default class MyCalendar extends Component {
  constructor(props) {
    super(props)
    const date = new Date()
    const startDate = date.getTime()
    this.state = {
      startDate, // Today
      endDate: new Date(startDate).setDate(date.getDate() + 3) 
    }
  }

  // saves the start- and endDate user input into state
  onChange = (startDate, endDate) => this.setState({ startDate, endDate })

  render = () => {
    const { startDate, endDate } = this.state

    return (
            <ReactLightCalendar startDate={startDate} endDate={endDate} onChange={this.onChange} range />
    )
  }
}