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
import CategoryFilteredProduct from './components/CategoryFiltered/CategoryFilteredProduct.jsx';
import ProductDetail from './components/ProductDetail/ProductDetail.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';

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
        element:<ProductDetail></ProductDetail>
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
