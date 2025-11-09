import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom"
import RootLayout from './layouts/RootLayout.jsx';
import Home from './components/Home/Home.jsx';
import PublicHabits from './components/PublicHabits/PublicHabits.jsx';
import { AuthContext } from './context/AuthContext.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import AddHabits from './components/AddHabits/AddHabits.jsx';
import MyHabits from './components/MyHabits/MyHabits.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/publicHabits',
        Component: PublicHabits
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'addHabit',
        element: <PrivateRoute><AddHabits></AddHabits></PrivateRoute>
      },
      {
        path: 'myHabits',
        element: <PrivateRoute><MyHabits></MyHabits></PrivateRoute>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
