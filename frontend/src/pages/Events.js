// new hook - useLoaderData to get the closest loader data
import { useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventsPage() {
  const data = useLoaderData();
  if(data.isError === true){
    return <p>{events.message}</p>;
  };

  const events = data.events;
  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export async function loader() {
    const response = await fetch('http://localhost:8080/eventsss');
  
    if (!response.ok) {
      // return { isError: true, message: 'Could not fetch events.' };
      throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
        status: 500,
      });
    } else {
      return response;
    }
  };


// export const loader = async () => {
//   const response = await fetch("http://localhost:8080/eventsss");
//   if (!response.ok) {
//     throw new Response(JSON.stringify({message:'Could not fetch events!'}),{
//         status: 500
//     });
//   } else {
//     return response;
//   }
// };

export default EventsPage;