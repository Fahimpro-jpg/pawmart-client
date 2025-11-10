import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './Layouts/RootLayout.jsx';
import Home from './components/Home/Home.jsx';
import AllProducts from './components/AllProducts/AllProducts.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import AddListings from './components/AddListings/AddListings.jsx';
import MyListings from './components/MyListings/MyListings.jsx';
import MyOrders from './components/MyOrders/MyOrders.jsx';
import Categories from './components/Categories/Categories.jsx';
const router = createBrowserRouter([
  {
    path:'/',
    Component:RootLayout,
    children:[
      {
        index:true,
        Component: Home
      },
      {
        path:'/petAndSupplies',
        Component: AllProducts
      },
      {
        path:'/login',
        Component:Login
      },
      {
        path:'/register',
        Component:Register
      },
      {
        path:'/addListings',
        element:<AddListings></AddListings>
      },
      {
        path:'/myListings',
        element:<MyListings></MyListings>
      },
      {
        path:'/myOrders',
        element:<MyOrders></MyOrders>
      },
      {
        path:'/categoryProducts/:categoryName',
        element:<Categories></Categories>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
