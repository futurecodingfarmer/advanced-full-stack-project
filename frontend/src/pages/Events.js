import { Link } from "react-router-dom";

const DUMMY_EVENTS = [
    {id:'e1', title:'Leather Night'},
    {id:'e2', title:'Rubber Night'},
    {id:'e3', title:'Daddy Night'},
    {id:'e4', title:'Shower Show'},
];


const EventsPage = () => {

    return <>
    <main>
       <p>EVENT LISTS BELOW</p>
       <ul>
       {DUMMY_EVENTS.map(event => 
           <li key={event.id}>
          <Link to={event.id}>{event.title}</Link>
        </li>
       )} 
       </ul>
    </main>
    </>;

};

export default EventsPage;