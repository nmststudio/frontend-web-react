import React from 'react'
import ExampleControlSlot from './ExampleControlSlot'
import CalendarComponent from 'react-big-calendar'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'

import Card from './Card';

import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
const DragAndDropCalendar = withDragAndDrop(BigCalendar)

const localizer = BigCalendar.momentLocalizer(moment)


// TODO
// Events are pulled from reducer
// 

const propTypes = {}
const resourceMap = [
    { resourceId: 1, resourceTitle: 'ClassRoom' },
]

class Calendar extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = { ...this.state, events: [], areEventsOutOfDate: true }
        this.moveEvent = this.moveEvent.bind(this)
        this.newEvent = this.newEvent.bind(this)
        this.onNavigate = this.onNavigate.bind(this)
        this.onDoubleClick = this.onDoubleClick.bind(this)
        this.saveEdit = this.saveEdit.bind(this)
        this.props.fetchClasses(this.props.studioId)

    }


    componentDidUpdate(prevProps, prevState) {
        console.log('UPDATE PROPS IN CALENDAR', this.props)
        let idx = 0;
        if (this.state.areEventsOutOfDate && this.props.classes.length > 0) {
            let events = this.props.classes.map(obj => {
                return {
                    id: ++idx,
                    remoteId: obj.id,
                    title: obj.name,
                    start: moment(obj.startTime).toDate(),
                    end: moment(obj.endTime).toDate(),
                    resourceId: 1,
                }
            })
            console.log('UPDATE EVENTS ', events.length)
            this.setState({
                ...this.state,
                events: events,
                areEventsOutOfDate: false,
            })
        }
    }

    saveEdit(event) {
        console.log('Save EDIT ', event)

        const nextEvents = this.state.events.map(existingEvent => {
            return existingEvent.id == event.id ? { ...event, editing: false } :
                existingEvent
        })


        this.props.editClass(event);
        this.setState({
            events: nextEvents,
        })
    }

    moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot, resourceId }) {
        const { events } = this.state

        const idx = events.indexOf(event)
        let allDay = event.allDay

        if (!event.allDay && droppedOnAllDaySlot) {
            allDay = true
        } else if (event.allDay && !droppedOnAllDaySlot) {
            allDay = false
        }
        console.log('MOVE EVENT', this.state.events[idx])
        const updatedEvent = { ...this.state.events[idx], editing: false, start, end, allDay, resourceId }

        const nextEvents = [...events]
        nextEvents.splice(idx, 1, updatedEvent)

        this.setState({
            events: nextEvents,
        })
        this.props.editClass(updatedEvent);

        // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
    }

    resizeEvent = ({ event, start, end, isAllDay, resourceId }) => {
        const { events } = this.state
        const idx = events.indexOf(event)
        const newEvent = { ...this.state.events[idx], editing: false, start, end, isAllDay, resourceId }

        const nextEvents = this.state.events.map(existingEvent => {
            return existingEvent.id == event.id ? { ...existingEvent, start, end } :
                existingEvent
        })


        this.props.editClass(newEvent);
        this.setState({
            events: nextEvents,
        })

        //alert(`${event.title} was resized to ${start}-${end}`)
    }

    newEvent(event) {
        let idList = this.state.events.map(a => a.id)
        let newId = Math.max(...idList) + 1
        let hour = {
            id: newId,
            title: 'New Class',
            allDay: event.slots.length == 1,
            start: event.start,
            end: event.end,
            resourceId: event.resourceId
        }
        this.setState({
            events: this.state.events.concat([hour]),
        })
        console.log(this.props.studioId)
        this.props.createClass(hour, this.props.studioId)
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

    onNavigate = (date, view, action) => {
        console.log(date, view, action)
        /*
        if (view === "agenda" && action === "NEXT") {
          date = moment(date).add(1, "day").toDate();
        }

        this.setState({ start: date }); */
    };

    onDoubleClick = (object) => {

        // EDITING AN EVENT IN LINE. 
        /* 
          if (object.editing == true) return; // We don't want to double click on the field and refresh the editing
          const nextEvents = this.state.events.map(existingEvent => {
              return existingEvent.id == object.id ? { ...existingEvent, saveEdit: this.saveEdit, editing: existingEvent.editing ? false : true } :
                  existingEvent
          })
          this.setState({
              events: nextEvents,
          })
          */
    }

    onClick = (object) => {
        if (object.editing == true) return;
    }

    onDragStart = (event) => {
        console.log('DRAFG START')
        return;
    }

    eventStyleGetter = (event, start, end, isSelected) => {
        /* console.log(event);
         var backgroundColor = '#fab16c';
         var style = {
             backgroundColor: backgroundColor,
             borderRadius: '0px',
             opacity: 0.8,
             color: 'black',
             border: '0px',
             display: 'block'
         };
         return {
             style: style
         }
         */

    }

    render() {
        return (
            <DragAndDropCalendar
              selectable
              components={{event: Card}}
              localizer={localizer}
              events={this.state.events}
              draggableAccessor={this.draggableAccessor}
              onEventDrop={this.moveEvent}
              onDoubleClickEvent={this.onDoubleClick}
              onClickEvent={this.onClick}
              resizable
              onNavigate={this.onNavigate}
              resources={resourceMap}
              resourceIdAccessor="resourceId"
              resourceTitleAccessor="resourceTitle"
              eventPropGetter={(this.eventStyleGetter)}
              onEventResize={this.resizeEvent}
              onSelectSlot={this.newEvent}
              onDragStart={this.onDragStart}
              defaultView={BigCalendar.Views.DAY}
              defaultDate={new Date()}

            />)
    }
}

Calendar.propTypes = propTypes

export default Calendar