import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Hotel from './Hotel.jsx';
import GlobalStateManager from './GlobalStateManager.jsx';
import LogIn from './LogIn.jsx';
import Register from './Register.jsx';
import Profile from './Profile.jsx';
import NotFound from './NotFound.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/hotel/:id",
    element: <Hotel />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStateManager>
      <RouterProvider router={router} />
    </GlobalStateManager>
  </React.StrictMode>,
)
