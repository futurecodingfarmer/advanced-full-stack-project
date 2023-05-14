

import { useRouteLoaderData, json, redirect, defer, Await } from "react-router-dom";
import EventItem from '../components/EventItem';
import EventsList from "../components/EventsList";
import { Suspense } from "react";
import { getAuthToken } from "../util/auth";

const EventDetailsPage = (props) => {
    const { event, events } = useRouteLoaderData('event-detail');
    return (
    <>
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading..</p>}>
    <Await resolve={event}>
        {(loadedEvent) => <EventItem event={loadedEvent} />}
    </Await>
    </Suspense>
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading..</p>}>
    <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
    </Await>
    </Suspense>
    </>
);
};

export default EventDetailsPage;

async function loadEvents(){
    const response = await fetch('http://localhost:8080/events');
    
    if (!response.ok) {
     throw json({ message: 'Could not fetch events.' }, {
        status: 500
      });
    } else {
      const resData = await response.json();
      return resData.events;
    }
    
};

async function loadEvent(id){
    const response = await fetch('http://localhost:8080/events/' + id );

    if(!response.ok){
        throw json({message: 'Could not fetch details for selected event'}, {
            status: 500
        });
    }else{
      const resData = await response.json();
      return resData.event;
    }

};

export const loader = async ({request, params}) => {

    const id = params.eventId;
    return defer(
        {
            event: loadEvent(id),
            events: loadEvents()
        }
    );

};


export const action = async ({request, params}) => {

    const eventId = params.eventId;
    const token = getAuthToken();
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    } );

    if(!response.ok){
        throw json({message: 'Could not delete event'}, {
            status: 500
        });
    }
    
    return redirect('/events');

};




