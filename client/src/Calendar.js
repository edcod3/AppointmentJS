import React, {useState, useEffect} from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
//Calender CSS-Styling
import 'react-big-calendar/lib/css/react-big-calendar.css'

export default function ShowCalendar() {

    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState([{loading: true, onload: true}])
    const EffectOnload = events.onload

    const handleEvent = (datarray) => {
        let event_id = 0
        const appt_events = datarray.map(data => {
            const formatedevents = {
                id: event_id,
                start: moment().toDate(),
                end: new Date(data.deadline),
                title: data.description
            } 
            event_id = formatedevents.id + 1
            //console.log(formatedevents)
            return formatedevents
        })
        if (datarray.length === appt_events.length)
            setEvents(appt_events)
    }

    useEffect(() => {
        //console.log("Only Execute useEffect on page load")
        fetch(`http://${process.env.REACT_APP_API}:1369/allapts`)
        .then(respone => respone.json())
        .then(data => {
            handleEvent(data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [EffectOnload])

    return (
        <div>
            <Calendar 
            popup
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            startAccessor="start"
            endAccessor="end"
            events={events}
            style={{height: "600px", margin: "20px 50px 20px 50px"}}
            />
        </div>
    )
}

/*
const testevents = [
    {
    id: 0,
    start: moment().toDate(),
    end: moment()
        .add(3, "days")
        .toDate(),
    title: "Test Event"     
    },
    {
    id: 1,
    start: moment().toDate(),
    end: moment()
        .add(8, "days")
        .toDate(),
    title: "Multiple Events Test"
    }
];
*/