import { RouterProvider, createHashRouter } from 'react-router-dom';
import { Home } from './pages/home';
import { Signup } from './pages/signup';
import { Login } from './pages/login';
import { Dashboard } from './pages/dashboard';
import { UpcomingEvents } from './pages/upcoming';
import { ErrorPage } from './pages/error';
import './App.css';

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/upcoming_events',
        element: <UpcomingEvents />
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
