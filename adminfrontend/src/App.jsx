// import React, { Suspense, useState } from 'react'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'

// import Layout from './components/Layout'
// import Listing from './pages/Delete_Property'
// import Property from './pages/Property'
// import AddPropertyModal from "./components/AddPropertyModal"; 
// import Contact from './pages/Contact'
// import { QueryClient, QueryClientProvider } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'
// import { ToastContainer } from 'react-toastify'
// import "react-toastify/dist/ReactToastify.css"
// import UserDetailContext from './context/UserDetailContext'
// import 'leaflet/dist/leaflet.css';

// const App = () => {
//   const queryClient = new QueryClient()
//   const [userDetails,setUserDetails]=useState({
//     Favourites:[],
//     bookings:[],
//     token:null
//   })

//   return (
//     <UserDetailContext.Provider value={{userDetails,setUserDetails}}>
//     <QueryClientProvider client={queryClient}>
//     <BrowserRouter>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           <Route element={<Layout />}>
        
//             <Route path='/Delete_Property'>
//               <Route index element={<Listing />} />
//               <Route path=':propertyId' element={<Property />} />   
//             </Route>
//              <Route path='/' element={<Contact />} />
//               <Route path="/AddPropertyModal" element={<AddPropertyModal />} />


//           </Route>
//         </Routes>
//       </Suspense>
//     </BrowserRouter>
//     <ToastContainer />
//     <ReactQueryDevtools initialIsOpen={false} />
//     </QueryClientProvider>
//     </UserDetailContext.Provider>
//   )
// }

// export default App

// import React, { Suspense, useState } from 'react'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'

// import Layout from './components/Layout'
// import Listing from './pages/Delete_Property'
// import Property from './pages/Property'
// import AddPropertyModal from "./components/AddPropertyModal"; 
// import Contact from './pages/Contact'
// import AdminLogin from './components/AdminLogin'  // <-- import AdminLogin
// import { QueryClient, QueryClientProvider } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'
// import { ToastContainer } from 'react-toastify'
// import "react-toastify/dist/ReactToastify.css"
// import UserDetailContext from './context/UserDetailContext'
// import 'leaflet/dist/leaflet.css';

// const App = () => {
//   const queryClient = new QueryClient()
//   const [userDetails,setUserDetails]=useState({
//     Favourites:[],
//     bookings:[],
//     token:null
//   })

//   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // <-- admin login state

//   // If admin is not logged in, show login screen
//   if (!isAdminLoggedIn) {
//     return <AdminLogin onLogin={setIsAdminLoggedIn} />
//   }

//   // Otherwise, show the website
//   return (
//     <UserDetailContext.Provider value={{userDetails,setUserDetails}}>
//       <QueryClientProvider client={queryClient}>
//         <BrowserRouter>
//           <Suspense fallback={<div>Loading...</div>}>
//             <Routes>
//               <Route element={<Layout />}>
//                 <Route path='/Delete_Property'>
//                   <Route index element={<Listing />} />
//                   <Route path=':propertyId' element={<Property />} />   
//                 </Route>
//                 <Route path='/' element={<Contact />} />
//                 <Route path="/AddPropertyModal" element={<AddPropertyModal />} />
//               </Route>
//             </Routes>
//           </Suspense>
//         </BrowserRouter>
//         <ToastContainer />
//         <ReactQueryDevtools initialIsOpen={false} />
//       </QueryClientProvider>
//     </UserDetailContext.Provider>
//   )
// }

// export default App


// import React, { Suspense, useState, useEffect } from 'react'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'

// import Layout from './components/Layout'
// import Listing from './pages/Delete_Property'
// import Property from './pages/Property'
// import AddPropertyModal from "./components/AddPropertyModal"; 
// import Contact from './pages/Contact'
// import AdminLogin from './components/AdminLogin'  // <-- import AdminLogin
// import { QueryClient, QueryClientProvider } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'
// import { ToastContainer } from 'react-toastify'
// import "react-toastify/dist/ReactToastify.css"
// import UserDetailContext from './context/UserDetailContext'
// import 'leaflet/dist/leaflet.css';

// const App = () => {
//   const queryClient = new QueryClient()
//   const [userDetails,setUserDetails] = useState({
//     Favourites: [],
//     bookings: [],
//     token: null
//   })

//   // ✅ Persistent admin login state
//   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
//     localStorage.getItem("isAdminLoggedIn") === "true"
//   );

//   useEffect(() => {
//     localStorage.setItem("isAdminLoggedIn", isAdminLoggedIn);
//   }, [isAdminLoggedIn]);

//   // If admin is not logged in, show login screen
//   if (!isAdminLoggedIn) {
//     return <AdminLogin onLogin={setIsAdminLoggedIn} />
//   }

//   // Otherwise, show the website
//   return (
//     <UserDetailContext.Provider value={{userDetails,setUserDetails}}>
//       <QueryClientProvider client={queryClient}>
//         <BrowserRouter>
//           <Suspense fallback={<div>Loading...</div>}>
//             <Routes>
//               <Route element={<Layout />}>
//                 <Route path='/Delete_Property'>
//                   <Route index element={<Listing />} />
//                   <Route path=':propertyId' element={<Property />} />   
//                 </Route>
//                 <Route path='/' element={<Contact />} />
//                 <Route path="/AddPropertyModal" element={<AddPropertyModal />} />
//               </Route>
//             </Routes>
//           </Suspense>
//         </BrowserRouter>
//         <ToastContainer />
//         <ReactQueryDevtools initialIsOpen={false} />
//       </QueryClientProvider>
//     </UserDetailContext.Provider>
//   )
// }

// export default App


import React, { Suspense, useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import Listing from './pages/Delete_Property'
import Property from './pages/Property'
import AddPropertyModal from "./components/AddPropertyModal"; 
import Contact from './pages/Contact'
import Bookings from './pages/Bookings'
import Users from './pages/Users'
import AdminLogin from './components/AdminLogin'  // <-- import AdminLogin
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import UserDetailContext from './context/UserDetailContext'
import 'leaflet/dist/leaflet.css';

const App = () => {
  const queryClient = new QueryClient()
  const [userDetails,setUserDetails] = useState({
    Favourites: [],
    bookings: [],
    token: null
  })

  // ✅ Persistent admin login state for current session only
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    sessionStorage.getItem("isAdminLoggedIn") === "true"
  );

  // ✅ Sync state to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("isAdminLoggedIn", isAdminLoggedIn);
  }, [isAdminLoggedIn]);

  // If admin is not logged in, show login screen
  if (!isAdminLoggedIn) {
    return <AdminLogin onLogin={setIsAdminLoggedIn} />
  }

  // Otherwise, show the website
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
                <Route path='/Contact' element={<Contact />} />
                <Route path="/AddPropertyModal" element={<AddPropertyModal />} />
                <Route path='/Bookings' element={<Bookings />} />
                <Route path='/' element={<Users />} />
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
