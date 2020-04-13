import React from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import events from './EventsList'
import * as dates from './calendar-src/utils/dates'
import moment from 'moment'

let allViews = Object.keys(Views).map(k => Views[k])

const localizers = momentLocalizer(moment);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
      fontSize: '12px'
    },
  })


  let Basic = ({ localizer }) => (
    <Calendar
      events={events}
      views={allViews}
      step={60}
      showMultiDayTimes
      max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
      defaultDate={new Date(2015, 3, 1)}
      components={{
        timeSlotWrapper: ColoredDateCellWrapper,
      }}
      localizer={localizers}
    />
  )

export default Basic