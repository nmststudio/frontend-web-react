import React from 'react'
import events from './eventsExemple'
import ExampleControlSlot from './ExampleControlSlot'
import CalendarComponent from 'react-big-calendar'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'

import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
const DragAndDropCalendar = withDragAndDrop(BigCalendar)

const localizer = BigCalendar.momentLocalizer(moment)


// TODO
// Events are pulled from reducer
// 

const propTypes = {}
const resourceMap = [
    { resourceId: 1, resourceTitle: 'Board room' },
    { resourceId: 2, resourceTitle: 'Training room' },
    { resourceId: 3, resourceTitle: 'Meeting room 1' },
    { resourceId: 4, resourceTitle: 'Meeting room 2' },
]

class Calendar extends React.Component {
    constructor(...args) {
        super(...args)

        this.state = { events }
        this.moveEvent = this.moveEvent.bind(this)
        this.newEvent = this.newEvent.bind(this)

    }

    moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot, resourceId }) {

        const { events } = this.state

        const idx = events.indexOf(event)
        let allDay = event.allDay

        console.log(event);

        if (!event.allDay && droppedOnAllDaySlot) {
            allDay = true
        } else if (event.allDay && !droppedOnAllDaySlot) {
            allDay = false
        }

        const updatedEvent = { ...event, start, end, allDay, resourceId }

        const nextEvents = [...events]
        nextEvents.splice(idx, 1, updatedEvent)

        this.setState({
            events: nextEvents,
        })

        // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
    }

    resizeEvent = ({ event, start, end }) => {
        const { events } = this.state

        const nextEvents = events.map(existingEvent => {
            return existingEvent.id == event.id ? { ...existingEvent, start, end } :
                existingEvent
        })

        this.setState({
            events: nextEvents,
        })

        //alert(`${event.title} was resized to ${start}-${end}`)
    }

    newEvent(event) {
        console.log('EventNT')
        let idList = this.state.events.map(a => a.id)
        let newId = Math.max(...idList) + 1
        let hour = {
            id: newId,
            title: 'New Event',
            allDay: event.slots.length == 1,
            start: event.start,
            end: event.end,
        }
        this.setState({
            events: this.state.events.concat([hour]),
        })
    }


    handleSelect = ({ start, end }) => {
        const title = window.prompt('New Event name')
        if (title)
            this.setState({
                events: [
                    ...this.state.events,
                    {
                        start,
                        end,
                        title,
                    },
                ],
            })
    }


    render() {




        return (
            <DragAndDropCalendar
        selectable
        localizer={localizer}
        events={this.state.events}
        onEventDrop={this.moveEvent}
        resizable

        resources={resourceMap}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
        
        onEventResize={this.resizeEvent}
        onSelectSlot={this.newEvent}
        onDragStart={console.log}
        defaultView={BigCalendar.Views.MONTH}
        defaultDate={new Date(2018, 0, 29)}
      />)
    }
}

Calendar.propTypes = propTypes

export default Calendar