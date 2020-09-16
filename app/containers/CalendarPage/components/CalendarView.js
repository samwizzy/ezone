import React from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import events from './events'
import * as dates from 'react-big-calendar/lib/utils/dates'
import moment from 'moment'

let allViews = Object.keys(Views).map(k => Views[k])

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

const localizer = momentLocalizer(moment)

const Basic = (props) => {
  const [state, setState] = React.useState({ events })

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    if (title)
      setState({
        events: [
          ...state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
  }

  console.log(state, "state events")

  return (
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
      localizer={localizer}
      style={{ height: 500 }}
      onSelectEvent={event => alert(event.title)}
      onSelectSlot={handleSelect}
    />
  )
}

export default Basic
