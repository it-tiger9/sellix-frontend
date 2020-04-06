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

import { DateRangePicker, DayPickerRangeController}  from 'react-bootstrap-daterangepicker'

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
    if(this.props.ranges)
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

  picker = null;
  nick_key = null;

  render() {

    let { opens, getDate, ranges } = this.props;
    let { endDate, startDate } = this.state;

    if(ranges) {
      Object.keys(ranges).map((key) => {
        if(startDate.format('YYYY-MM-DD') === ranges[key][0].format('YYYY-MM-DD') && endDate.format('YYYY-MM-DD') === ranges[key][1].format('YYYY-MM-DD')){
          this.nick_key = key
        }
      })
    }

    if(startDate !== null && this.nick_key === null) {
      this.nick_key = startDate.format('ll') + ' - ' + endDate.format('ll')
    }

    return (
      <div className={"datepicker2 " + this.props.className || ''}>
        <i className="fas fa-calendar mr-2"/>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          ranges={ranges}
          locale={{
            direction: "ltr",
            format: "MMM DD, YYYY",
            separator: " - ",
            applyLabel: "Apply",
            cancelLabel: "Cancel",
            weekLabel: "W",
            customRangeLabel: "Custom Range",
            daysOfWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            monthNames: moment().localeData('en').months(),
            firstDay: 0
          }}
          opens={opens || 'right'}
          className="is-invalid"
          getDate={getDate}

          showClearDates={true}
          showDropdowns={true}

          onApply={(e, picker) => this.handleEvent(e, picker)}
          onCancel={(e, picker) => this.handleEvent(e, picker)}
        >
          <ButtonDropdown className="date-select" toggle={()=>{}}>
            <DropdownToggle caret>
              {this.nick_key}
            </DropdownToggle>
          </ButtonDropdown>
        </DateRangePicker>

      </div>
      
    );
  }
}

export default DateRangePicker2