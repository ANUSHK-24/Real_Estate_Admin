

// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useQuery } from "react-query";
// import { PuffLoader } from "react-spinners";
// import { FaStar } from "react-icons/fa";
// import {
//   MdLocationOn,
//   MdSquareFoot
// } from "react-icons/md";
// import { CgRuler } from "react-icons/cg";
// import Map from "../components/Map";

// import { getProperty, deleteResidencyApi } from "../utils/api";
// import { toast } from "react-toastify";

// const Property = () => {
//   const { pathname } = useLocation();
//   const id = pathname.split("/").slice(-1)[0];
//   const navigate = useNavigate();

//   const { data, isError, isLoading } = useQuery(["resd", id], () => getProperty(id));

//   // Handler for deleting property
//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this property?")) return;

//     try {
//       await deleteResidencyApi(id);
//       toast.success("Residency deleted successfully");
//       navigate("/Delete_Property");
//     } catch (err) {
//       toast.error("Failed to delete residency");
//     }
//   };

//   if (isError) {
//     return <div><span>Error fetching property</span></div>;
//   }

//   if (isLoading) {
//     return (
//       <div className="h-64 flex justify-center">
//         <PuffLoader height="80" width="80" radius={1} color="#555" aria-label="puff-loading" />
//       </div>
//     );
//   }

//   return (
//     <section className="max-padd-container mx-[2px] my-[99px]">
//       {/* Image & Heart button */}
//       <div className="pb-2 relative">
//         <img
//           src={data?.image}
//           alt={data?.title}
//           className="rounded-tr-3xl rounded-tl-3xl max-h-108 w-full object-cover aspect-square"
//         />
//         <div className="absolute top-8 right-8">
        
//         </div>
//       </div>

//       <div className="xl:flex justify-between gap-8">
//         {/* Left Column: Property Details */}
//         <div className="flex-1">
//           <p className="flex gap-x-2">
//             <MdLocationOn />
//             <span>{data?.address} {data?.city} {data?.country}</span>
//           </p>

//           <div className="flex justify-between pt-3">
//             <h4 className="font-bold text-[20px]">{data.title}</h4>
//             <div className="font-bold text-[20px]">${data.price}.00</div>
//           </div>

//           <div className="flex justify-between py-1">
//             <h5 className="bold-16 text-green-700">{data?.city}</h5>
//             <div className="flex items-baseline gap-2">
//               <h4 className="font-bold text-[18px] text-black">5.0</h4>
//               {[...Array(5)].map((_, i) => <FaStar key={i} />)}
//             </div>
//           </div>

//           <div className="flex gap-x-4">
//             <div className="flex gap-x-2 border-r pr-4 font-medium">
//               <MdSquareFoot />{data?.facilities.area}
//             </div>
//             <div className="flex gap-x-2 border-r pr-4 font-medium">
//               <CgRuler />400
//             </div>
//           </div>

//           <h4 className="h4 mt-3">Property Details</h4>
//           <p className="mb-4">{data?.description}</p>

//           {/* Delete button */}
//           <div className="pt-5">
//             <button
//               onClick={handleDelete}
//               className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
//             >
//               Delete Property
//             </button>
//           </div>
//         </div>

//         {/* Right Column: Map */}
//         <div className="flex-1">
//           <Map address={data?.address} city={data?.city} country={data?.country} />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Property;

// import React from 'react'
// import { VscSettings } from 'react-icons/vsc'
// import { Link } from 'react-router-dom'
// import { Swiper,SwiperSlide } from 'swiper/react';

// import 'swiper/css';
// import 'swiper/css/pagination';
// import { Autoplay } from'swiper/modules';
// import Item from './Item';
// import useProperties from '../hooks/useProperties'
// import { PuffLoader } from 'react-spinners'




// const Properties = () => {
//      const {data,isError,isLoading}=useProperties()

//      if(isError) {
//       return <div className='h-64 flex flex-col justify-center items-center mt-24'>
//         <span className='text-red-500 text-lg'>Error fetching data</span>
//         <span className='text-gray-500 text-sm mt-2'>Please check your connection and try again</span>
//         </div>
//         }
//      if(isLoading) {
//       return <div className='h-64 flex justify-center mt-24 items-center'>
//         <PuffLoader height="80" width="80" radius={1} color='#555' aria-label="puff-loading" />
//       </div>
//      }
//   return (
//     <section className='mx-auto  px-6 lg:px-12'>
//     <div className='py-16 xl:py-28 rounded-3xl'>
//         <span className='text-[18px] font-[500]'>Your Future Home Awaits!</span>
//         <h2 className='text-[41px] leading-tight md:text-[49px] md:leading-[1.3] mb-4 font-bold'>Find Your Dream Here</h2>
//         <div className='flex items-center justify-between mt-8 mb-6'>
//             <h5><span className='font-bold'>Showing 1-9</span>out of 3k properties</h5>
//             <Link to={'/'} className='bg-green-500 text-white text-2xl rounded-md p-2 flex items-center justify-center'>
//             <VscSettings />
//             </Link>
//     </div>
//     <Swiper
//     autoplay={{
//         delay:4000,
//         disableOnInteraction:false,
//     }}
//     breakpoints={{
//         600:{
//             slidesPerView:2,
//             spaceBetween:30,
//         },
//         1124:{
//             slidesPerView:3,
//             spaceBetween:30,
//         },
//         1300:{
//             slidesPerView:4,
//             spaceBetween:30,
//         }
//     }}
//     modules={[Autoplay]}
//     className="h-[488px] md:h-[533px] xl:h-[422px] mt-5"
//     >
//         {data && data.length > 0 ? (
//           data.slice(0,6).map((property)=>(
//                <SwiperSlide key={property.id || property.title}>
//                   <Item property={property}/>
//                </SwiperSlide>
//           ))
//         ) : (
//           <SwiperSlide>
//             <div className='text-center py-8'>
//               <span className='text-gray-500 text-lg'>No properties available</span>
//             </div>
//           </SwiperSlide>
//         )}
       
//     </Swiper>
//     </div>
//     </section>
//   )
// }

// export default Properties

// import React, { useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useQuery } from "react-query";
// import { PuffLoader } from "react-spinners";
// import { FaStar } from "react-icons/fa";
// import { MdLocationOn, MdSquareFoot } from "react-icons/md";
// import { CgRuler } from "react-icons/cg";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Autoplay, Pagination } from "swiper/modules";
// import Map from "../components/Map";
// import { getProperty, deleteResidencyApi } from "../utils/api";
// import { toast } from "react-toastify";

// const Property = () => {
//   const { pathname } = useLocation();
//   const id = pathname.split("/").slice(-1)[0];
//   const navigate = useNavigate();

//   const { data, isError, isLoading } = useQuery(["resd", id], () =>
//     getProperty(id)
//   );

//   // Handler for deleting property
//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this property?")) return;
//     try {
//       await deleteResidencyApi(id);
//       toast.success("Residency deleted successfully");
//       navigate("/Delete_Property");
//     } catch (err) {
//       toast.error("Failed to delete residency");
//     }
//   };

//   if (isError) {
//     return (
//       <div className="h-64 flex justify-center items-center text-red-500">
//         Error fetching property
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="h-64 flex justify-center items-center">
//         <PuffLoader color="#555" />
//       </div>
//     );
//   }

//   // Handle play/pause toggle for videos
//   const VideoSlide = ({ url }) => {
//     const videoRef = useRef(null);
//     const [playing, setPlaying] = useState(true);

//     const togglePlay = () => {
//       if (videoRef.current) {
//         if (playing) {
//           videoRef.current.pause();
//         } else {
//           videoRef.current.play();
//         }
//         setPlaying(!playing);
//       }
//     };

//     return (
//       <div className="relative">
//         <video
//           ref={videoRef}
//           src={url}
//           className="w-full h-[400px] object-cover rounded-t-3xl"
//           muted
//           autoPlay
//           loop
//         />
//         <button
//           onClick={togglePlay}
//           className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-md text-sm"
//         >
//           {playing ? "Pause" : "Play"}
//         </button>
//       </div>
//     );
//   };

//   return (
//     <section className="max-padd-container mx-[2px] my-[99px]">
//       {/* Media Swiper */}
//       <div className="pb-2 relative">
//         {data?.media?.length > 0 ? (
//           <Swiper
//             autoplay={{
//               delay: 4000,
//               disableOnInteraction: false,
//             }}
//             pagination={{ clickable: true }}
//             modules={[Autoplay, Pagination]}
//             className="h-[400px] rounded-t-3xl"
//           >
//             {data.media.map((item, index) => (
//               <SwiperSlide key={index}>
//                 {item.type === "video" ? (
//                   <VideoSlide url={item.url} />
//                 ) : (
//                   <img
//                     src={item.url}
//                     alt={`media-${index}`}
//                     className="w-full h-[400px] object-cover rounded-t-3xl"
//                   />
//                 )}
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         ) : (
//           <img
//             src={data?.image}
//             alt={data?.title}
//             className="rounded-t-3xl h-[400px] w-full object-cover"
//           />
//         )}
//       </div>

//       <div className="xl:flex justify-between gap-8">
//         {/* Left Column: Property Details */}
//         <div className="flex-1">
//           <p className="flex gap-x-2">
//             <MdLocationOn />
//             <span>
//               {data?.address}, {data?.city}, {data?.country}
//             </span>
//           </p>

//           <div className="flex justify-between pt-3">
//             <h4 className="font-bold text-[20px]">{data.title}</h4>
//             <div className="font-bold text-[20px]">
//               ₹{data.price.toLocaleString("en-IN")}
//             </div>
//           </div>

//           <div className="flex justify-between py-1">
//             <h5 className="bold-16 text-green-700">{data?.city}</h5>
//             <div className="flex items-baseline gap-2">
//               <h4 className="font-bold text-[18px] text-black">5.0</h4>
//               {[...Array(5)].map((_, i) => (
//                 <FaStar key={i} />
//               ))}
//             </div>
//           </div>

//           <div className="flex gap-x-4">
//             <div className="flex gap-x-2 border-r pr-4 font-medium">
//               <MdSquareFoot /> {data?.facilities?.area} sq.ft
//             </div>
//             <div className="flex gap-x-2 border-r pr-4 font-medium">
//               <CgRuler /> 400
//             </div>
//           </div>

//           <h4 className="h4 mt-3">Property Details</h4>
//           <p className="mb-4">{data?.description}</p>

//           {/* Delete button */}
//           <div className="pt-5">
//             <button
//               onClick={handleDelete}
//               className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
//             >
//               Delete Property
//             </button>
//           </div>
//         </div>

//         {/* Right Column: Map */}
//         <div className="flex-1">
//           <Map
//             address={data?.address}
//             city={data?.city}
//             country={data?.country}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Property;


// import React, { useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useQuery } from "react-query";
// import { PuffLoader } from "react-spinners";
// import { FaStar } from "react-icons/fa";
// import { MdLocationOn, MdSquareFoot } from "react-icons/md";
// import { CgRuler } from "react-icons/cg";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation, Pagination } from "swiper/modules";
// import Map from "../components/Map";
// import { getProperty, deleteResidencyApi } from "../utils/api";
// import { toast } from "react-toastify";

// const Property = () => {
//   const { pathname } = useLocation();
//   const id = pathname.split("/").slice(-1)[0];
//   const navigate = useNavigate();

//   const { data, isError, isLoading } = useQuery(["resd", id], () =>
//     getProperty(id)
//   );

//   // Handler for deleting property
//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this property?")) return;
//     try {
//       await deleteResidencyApi(id);
//       toast.success("Residency deleted successfully");
//       navigate("/Delete_Property");
//     } catch (err) {
//       toast.error("Failed to delete residency");
//     }
//   };

//   if (isError) {
//     return (
//       <div className="h-64 flex justify-center items-center text-red-500">
//         Error fetching property
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="h-64 flex justify-center items-center">
//         <PuffLoader color="#555" />
//       </div>
//     );
//   }

//   // Custom video component for play/pause
//   const VideoSlide = ({ url }) => {
//     const videoRef = useRef(null);
//     const [playing, setPlaying] = useState(true);

//     const togglePlay = () => {
//       if (videoRef.current) {
//         if (playing) {
//           videoRef.current.pause();
//         } else {
//           videoRef.current.play();
//         }
//         setPlaying(!playing);
//       }
//     };

//     return (
//       <div className="relative w-full h-[500px] flex justify-center items-center bg-black">
//         <video
//           ref={videoRef}
//           src={url}
//           className="w-full h-full object-contain rounded-t-3xl"
//           muted
//           autoPlay
//           loop
//         />
//         <button
//           onClick={togglePlay}
//           className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-md text-sm"
//         >
//           {playing ? "Pause" : "Play"}
//         </button>
//       </div>
//     );
//   };

//   return (
//     <section className="max-padd-container mx-[2px] my-[99px]">
//       {/* Media Swiper */}
//       <div className="pb-2 relative">
//         {data?.media?.length > 0 ? (
//           <Swiper
//             navigation
//             pagination={{ clickable: true }}
//             modules={[Navigation, Pagination]}
//             className="h-[500px] rounded-t-3xl"
//           >
//             {data.media.map((item, index) => (
//               <SwiperSlide key={index}>
//                 {item.type === "video" ? (
//                   <VideoSlide url={item.url} />
//                 ) : (
//                   <div className="w-full h-[500px] flex justify-center items-center bg-black">
//                     <img
//                       src={item.url}
//                       alt={`media-${index}`}
//                       className="w-full h-full object-contain rounded-t-3xl"
//                     />
//                   </div>
//                 )}
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         ) : (
//           <img
//             src={data?.image}
//             alt={data?.title}
//             className="rounded-t-3xl h-[500px] w-full object-contain bg-black"
//           />
//         )}
//       </div>

//       <div className="xl:flex justify-between gap-8">
//         {/* Left Column: Property Details */}
//         <div className="flex-1">
//           <p className="flex gap-x-2">
//             <MdLocationOn />
//             <span>
//               {data?.address}, {data?.city}, {data?.country}
//             </span>
//           </p>

//           <div className="flex justify-between pt-3">
//             <h4 className="font-bold text-[20px]">{data.title}</h4>
//             <div className="font-bold text-[20px]">
//               ₹{data.price.toLocaleString("en-IN")}
//             </div>
//           </div>

//           <div className="flex justify-between py-1">
//             <h5 className="bold-16 text-green-700">{data?.city}</h5>
//             <div className="flex items-baseline gap-2">
//               <h4 className="font-bold text-[18px] text-black">5.0</h4>
//               {[...Array(5)].map((_, i) => (
//                 <FaStar key={i} />
//               ))}
//             </div>
//           </div>

//           <div className="flex gap-x-4">
//             <div className="flex gap-x-2 border-r pr-4 font-medium">
//               <MdSquareFoot /> {data?.facilities?.area} sq.ft
//             </div>
//             <div className="flex gap-x-2 border-r pr-4 font-medium">
//               <CgRuler /> 400
//             </div>
//           </div>

//           <h4 className="h4 mt-3">Property Details</h4>
//           <p className="mb-4">{data?.description}</p>

//           {/* Delete button */}
//           <div className="pt-5">
//             <button
//               onClick={handleDelete}
//               className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
//             >
//               Delete Property
//             </button>
//           </div>
//         </div>

//         {/* Right Column: Map */}
//         <div className="flex-1">
//           <Map
//             address={data?.address}
//             city={data?.city}
//             country={data?.country}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Property;

import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { PuffLoader } from "react-spinners";
import { FaStar } from "react-icons/fa";
import { MdLocationOn, MdSquareFoot } from "react-icons/md";
import { CgRuler } from "react-icons/cg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import Map from "../components/Map";
import { getProperty, deleteResidencyApi } from "../utils/api";
import { toast } from "react-toastify";

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const navigate = useNavigate();

  const { data, isError, isLoading } = useQuery(["resd", id], () =>
    getProperty(id)
  );

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await deleteResidencyApi(id);
      toast.success("Residency deleted successfully");
      navigate("/Delete_Property");
    } catch (err) {
      toast.error("Failed to delete residency");
    }
  };

  if (isError) {
    return (
      <div className="h-64 flex justify-center items-center text-red-500">
        Error fetching property
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-64 flex justify-center items-center">
        <PuffLoader color="#555" />
      </div>
    );
  }

  const VideoSlide = ({ url }) => {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(true);

    const togglePlay = () => {
      if (videoRef.current) {
        if (playing) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setPlaying(!playing);
      }
    };

    return (
      <div className="relative w-full h-[500px] flex justify-center items-center bg-black">
        <video
          ref={videoRef}
          src={url}
          className="w-full h-full object-contain rounded-t-3xl"
          muted
          autoPlay
          loop
        />
        <button
          onClick={togglePlay}
          className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-md text-sm"
        >
          {playing ? "Pause" : "Play"}
        </button>
      </div>
    );
  };

  return (
    <section className="max-padd-container mx-[2px] my-[99px]">
      {/* Main Swiper */}
      <div className="pb-2 relative">
        {data?.media?.length > 0 ? (
          <>
            <Swiper
              style={{ "--swiper-navigation-color": "#fff", "--swiper-pagination-color": "#fff" }}
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination, Thumbs]}
              thumbs={{ swiper: thumbsSwiper }}
              className="h-[500px] rounded-t-3xl mb-2"
            >
              {data.media.map((item, index) => (
                <SwiperSlide key={index}>
                  {item.type === "video" ? (
                    <VideoSlide url={item.url} />
                  ) : (
                    <img
                      src={item.url}
                      alt={`media-${index}`}
                      className="w-full h-full object-contain rounded-t-3xl"
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Thumbnails Swiper */}
{/* Thumbnails Swiper */}
<Swiper
  onSwiper={setThumbsSwiper}
  slidesPerView={4}   // number of thumbnails visible
  spaceBetween={15}   // spacing between thumbnails
  freeMode
  watchSlidesProgress
  className="h-24 mt-2"
>
  {data.media.map((item, index) => (
    <SwiperSlide key={index} className="cursor-pointer">
      {item.type === "video" ? (
        <div className="w-full h-full bg-black flex items-center justify-center text-white text-sm rounded border-2 border-gray-300">
          Video
        </div>
      ) : (
        <img
          src={item.url}
          alt={`thumb-${index}`}
          className="w-full h-full object-cover rounded border-2 border-gray-300"
        />
      )}
    </SwiperSlide>
  ))}
</Swiper>

          </>
        ) : (
          <img
            src={data?.image}
            alt={data?.title}
            className="rounded-t-3xl h-[500px] w-full object-contain bg-black"
          />
        )}
      </div>

      {/* Property Info */}
      <div className="xl:flex justify-between gap-8">
        <div className="flex-1">
          <p className="flex gap-x-2">
            <MdLocationOn />
            <span>
              {data?.address}, {data?.city}, {data?.country}
            </span>
          </p>

          <div className="flex justify-between pt-3">
            <h4 className="font-bold text-[20px]">{data.title}</h4>
            <div className="font-bold text-[20px]">
              ₹{data.price.toLocaleString("en-IN")}
            </div>
          </div>

          <div className="flex justify-between py-1">
            <h5 className="bold-16 text-green-700">{data?.city}</h5>
            <div className="flex items-baseline gap-2">
              <h4 className="font-bold text-[18px] text-black">5.0</h4>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>

          <div className="flex gap-x-4">
            <div className="flex gap-x-2 border-r pr-4 font-medium">
              <MdSquareFoot /> {data?.facilities?.area} sq.ft
            </div>
            <div className="flex gap-x-2 border-r pr-4 font-medium">
              <CgRuler /> 400
            </div>
          </div>

          <h4 className="h4 mt-3">Property Details</h4>
          <p className="mb-4">{data?.description}</p>

          <div className="pt-5">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            >
              Delete Property
            </button>
          </div>
        </div>

        <div className="flex-1">
          <Map
            address={data?.address}
            city={data?.city}
            country={data?.country}
          />
        </div>
      </div>
    </section>
  );
};

export default Property;
