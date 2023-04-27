
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/Root';
import HomePage from './pages/Home';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EditEventPage from './pages/EditEvent';
import EventDetailPage from './pages/EventDetail';
import NewEventPage from './pages/NewEvent';
import EventRootLayout from './pages/EventsRoot';
import ErrorPage from './pages/Error';

function App() {
  // covert to all realtive path
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "events",
          element: <EventRootLayout />,
          children: [
            {
              index: true,
              element: <EventsPage />,
              loader: eventsLoader
            },
            { path: ":eventId", element: <EventDetailPage /> },
            { path: "new", element: <NewEventPage /> },
            { path: ":eventId/edit", element: <EditEventPage /> },
          ],
        },
      ],
    },
  ]);



  return <>
    <RouterProvider router={router} />
  </>;
}

export default App;
