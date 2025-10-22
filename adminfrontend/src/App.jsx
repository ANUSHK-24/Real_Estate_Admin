import React, { Suspense, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import Listing from './pages/Delete_Property'
import Property from './pages/Property'
import AddPropertyModal from "./components/AddPropertyModal"; 
import Contact from './pages/Contact'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import UserDetailContext from './context/UserDetailContext'
import 'leaflet/dist/leaflet.css';

const App = () => {
  const queryClient = new QueryClient()
  const [userDetails,setUserDetails]=useState({
    Favourites:[],
    bookings:[],
    token:null
  })

  return (
    <UserDetailContext.Provider value={{userDetails,setUserDetails}}>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
        
            <Route path='/Delete_Property'>
              <Route index element={<Listing />} />
              <Route path=':propertyId' element={<Property />} />   
            </Route>
             <Route path='/' element={<Contact />} />
              <Route path="/AddPropertyModal" element={<AddPropertyModal />} />


          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
    <ToastContainer />
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </UserDetailContext.Provider>
  )
}

export default App
