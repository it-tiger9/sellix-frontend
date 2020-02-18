import React, { Component } from 'react'
import {
  Input,
  ButtonDropdown,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap'
import moment from 'moment'

import DateRangePicker from 'react-bootstrap-daterangepicker'

import 'bootstrap-daterangepicker/daterangepicker.css'

class DateRangePicker2 extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment(),
      endDate: moment()
    }

    this.handleEvent = this.handleEvent.bind(this)
  }

  componentDidMount() {
    Object.keys(this.props.ranges).map((key, index) => {
      if(index === 0) {
        this.setState({
          startDate: this.props.ranges[key][0],
          endDate: this.props.ranges[key][1]
        })
      }
    })
  }

  handleEvent (event, picker) {
    event.preventDefault()
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate
    })

    this.props.getDate(picker)
  }

  render() {
    let nick_key = null

    Object.keys(this.props.ranges).map((key) => {
      if(this.state.startDate.format('YYYY-MM-DD') === this.props.ranges[key][0].format('YYYY-MM-DD') && 
        this.state.endDate.format('YYYY-MM-DD') === this.props.ranges[key][1].format('YYYY-MM-DD')){
        nick_key = key
        return true
      }
    })

    if(this.state.startDate !== null && nick_key === null)
      nick_key = this.state.startDate.format('ll') + ' - ' + this.state.endDate.format('ll')

    return (
      <div className="datepicker2">
        <i className="fas fa-calendar mr-2"/>
        <DateRangePicker 
          startDate={this.state.startDate} 
          endDate={this.state.endDate}
          opens={this.props.opens || 'right'}
          ranges={this.props.ranges} 
          getDate={this.props.getDate}
          onEvent={(e, picker) => this.handleEvent(e, picker)}>
          <ButtonDropdown className="date-select" toggle={()=>{}}>
            <DropdownToggle caret>
              {nick_key}
            </DropdownToggle>
          </ButtonDropdown>
        </DateRangePicker>
      </div>
      
    );
  }
}

export default DateRangePicker2