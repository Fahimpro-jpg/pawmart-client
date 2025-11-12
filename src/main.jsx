import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './Layouts/RootLayout.jsx';
import Home from './components/Home/Home.jsx';
import AllProducts from './components/AllProducts/AllProducts.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';

import MyOrders from './components/MyOrders/MyOrders.jsx';
import CategoryFilteredProduct from './components/CategoryFiltered/CategoryFilteredProduct.jsx';
import ProductDetail from './components/ProductDetail/ProductDetail.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import AddListing from './pages/AddListing/AddListing.jsx';
import MyListings from './pages/MyListings/MyListings.jsx';

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
        path:'/petAndSupplies/:id',
        element:<PrivateRoute>
          <ProductDetail></ProductDetail>
        </PrivateRoute>
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
        element:<PrivateRoute>
          <AddListing></AddListing>
        </PrivateRoute>
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
        path:'/category-filtered-product/:categoryName',
        element:<CategoryFilteredProduct></CategoryFilteredProduct>
      ,
    },
   

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  </StrictMode>,
)
