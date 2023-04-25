import { useParams } from "react-router-dom";

const EventDetailsPage = (props) => {
    const params = useParams();
    return <>
    <h1>{params.eventId}</h1>
    <h1>Edit Details!</h1>
    </>

};

export default EventDetailsPage;