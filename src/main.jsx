import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './Layouts/RootLayout.jsx'
import Home from './components/Home/Home.jsx'
import AllProducts from './components/AllProducts/AllProducts.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import CategoryFilteredProduct from './components/CategoryFiltered/CategoryFilteredProduct.jsx'
import ProductDetail from './components/ProductDetail/ProductDetail.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import PrivateRoute from './Routes/PrivateRoute.jsx'
import AddListing from './pages/AddListing/AddListing.jsx'
import MyListings from './pages/MyListings/MyListings.jsx'
import MyOrders from './pages/MyOrders/MyOrders.jsx'
import UpdateListing from './pages/UpdateListing/UpdateListing.jsx'
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />, // ✅ Correct placement
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/petAndSupplies',
        element: <AllProducts />,
      },
      {
        path: '/petAndSupplies/:id',
        element: (
          <PrivateRoute>
            <ProductDetail />
          </PrivateRoute>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/addListings',
        element: (
          <PrivateRoute>
            <AddListing />
          </PrivateRoute>
        ),
      },
      {
        path: '/myListings',
        element: <MyListings />,
      },
      {
        path: '/myOrders',
        element: <MyOrders />,
      },
      {
        path: '/category-filtered-product/:categoryName',
        element: <CategoryFilteredProduct />,
      },
      {
        path: '/update-listing/:id',
        element: <UpdateListing />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  </StrictMode>
)
