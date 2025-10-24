// import {Button,Group} from '@mantine/core'
// import React, {useEffect, useRef, useState} from 'react'
// import {MdOutlineCloudUpload} from 'react-icons/md'

// const UploadImage = ({prevStep,nextStep,propertyDetails,setPropertyDetails})=>{
//     const [imageURL,setImageURL] = useState(propertyDetails.image)
//     const cloudinaryRef = useRef()
//     const widgeRef = useRef()

//     const handleNext =()=>{
//         setPropertyDetails((prev)=>({...prev,image:imageURL}))
//         nextStep()
//     }

//     useEffect(()=>{
//         cloudinaryRef.current = window.cloudinary
//         widgeRef.current = cloudinaryRef.current.createUploadWidget({
//             cloudName: "dmkrkwezy",
//             uploadPreset:"gsfdydfgh"
//         },(err,result)=>{
//             if(result.event === "success"){
//                 setImageURL(result.info.secure_url)
//             }
//         }
//     )
//     },[])

//     return (
//         <div className='mt-12 flex justify-center flex-col'>
//             {!imageURL?(
//                 <div onClick={()=>widgeRef.current?.open()} className='flex justify-center flex-col w-3/4 h-84 border-dashed border-2 cursor-pointer'>
//                     <MdOutlineCloudUpload size={44} color='grey'/>
//                     <span>Upload Image</span>
//                 </div>
//             ):(
//                 <div onClick={()=>widgeRef.current?.open()} className=' flex justify-center w-3/4 h-88 rounded-xl overflow-hidden border-dashed border-2 cursor-pointer'>
//                     <img src={imageURL} alt="" className='h-full w-full object-cover' />
//                 </div>
//             )}
//             <Group justify='center' mt={'xl'} >
//                 <Button onClick={prevStep}>Go Back</Button>
//                 <Button onClick={handleNext} disabled={!imageURL}>Next</Button>
//             </Group>
//         </div>
//     )
// }
// export default UploadImage

// import { Button, Group } from '@mantine/core';
// import React, { useEffect, useRef, useState } from 'react';
// import { MdOutlineCloudUpload } from 'react-icons/md';
// import { AiOutlineCloseCircle } from 'react-icons/ai';

// const UploadMedia = ({ prevStep, nextStep, propertyDetails, setPropertyDetails }) => {
//   const [mediaURLs, setMediaURLs] = useState(propertyDetails.media || []); // images + videos
//   const cloudinaryRef = useRef();
//   const widgetRef = useRef();

//   const handleNext = () => {
//     setPropertyDetails((prev) => ({ ...prev, media: mediaURLs }));
//     nextStep();
//   };

//   const handleRemove = (index) => {
//     setMediaURLs((prev) => prev.filter((_, i) => i !== index));
//   };

//   useEffect(() => {
//     cloudinaryRef.current = window.cloudinary;
//     widgetRef.current = cloudinaryRef.current.createUploadWidget(
//       {
//         cloudName: 'dmkrkwezy',
//         uploadPreset: 'gsfdydfgh',
//         multiple: true,
//         resourceType: 'auto', // allow both images and videos
//       },
//       (err, result) => {
//         if (result.event === 'success') {
//           const fileUrl = result.info.secure_url;
//           const fileType = result.info.resource_type; // image or video
//           setMediaURLs((prev) => [...prev, { url: fileUrl, type: fileType }]);
//         }
//       }
//     );
//   }, []);

//   return (
//     <div className="mt-12 flex justify-center flex-col items-center">
//       {/* Upload box */}
//       <div
//         onClick={() => widgetRef.current?.open()}
//         className="flex justify-center flex-col items-center w-3/4 h-84 border-dashed border-2 cursor-pointer rounded-xl"
//       >
//         <MdOutlineCloudUpload size={44} color="grey" />
//         <span>{mediaURLs.length ? 'Upload More Files' : 'Upload Images or Videos'}</span>
//       </div>

//       {/* Preview all uploaded media */}
//       {mediaURLs.length > 0 && (
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 w-3/4">
//           {mediaURLs.map((file, index) => (
//             <div key={index} className="relative rounded-xl overflow-hidden border border-gray-300 h-48 w-full">
//               {/* Remove button */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleRemove(index);
//                 }}
//                 className="absolute top-1 right-1 text-red-500 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
//               >
//                 <AiOutlineCloseCircle size={22} />
//               </button>

//               {/* Show image or video */}
//               {file.type === 'image' ? (
//                 <img src={file.url} alt={`uploaded-${index}`} className="h-full w-full object-cover" />
//               ) : (
//                 <video src={file.url} controls className="h-full w-full object-cover" />
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       <Group justify="center" mt="xl">
//         <Button onClick={prevStep}>Go Back</Button>
//         <Button onClick={handleNext} disabled={mediaURLs.length === 0}>
//           Next
//         </Button>
//       </Group>
//     </div>
//   );
// };

// export default UploadMedia;

import { Button, Group } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const UploadMedia = ({ prevStep, nextStep, propertyDetails, setPropertyDetails }) => {
  // Initialize mediaURLs safely
  const [mediaURLs, setMediaURLs] = useState(Array.isArray(propertyDetails.media) ? propertyDetails.media : []);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  // Handle moving to next step
  const handleNext = () => {
    // Remove any leftover 'image' key
    const { image, ...rest } = propertyDetails;

    // Update propertyDetails with safe media array
    setPropertyDetails({
      ...rest,
      media: mediaURLs.filter(file => file.url && file.type), // filter out invalid entries
    });

    nextStep();
  };

  // Remove a single media item
  const handleRemove = (index) => {
    setMediaURLs((prev) => prev.filter((_, i) => i !== index));
  };

  // Setup Cloudinary widget
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dmkrkwezy',
        uploadPreset: 'gsfdydfgh',
        multiple: true,
        resourceType: 'auto', // allow images and videos
      },
      (err, result) => {
        if (result.event === 'success') {
          const fileUrl = result.info.secure_url;
          const fileType = result.info.resource_type; // 'image' or 'video'
          if (fileUrl && fileType) {
            setMediaURLs((prev) => [...prev, { url: fileUrl, type: fileType }]);
          }
        }
      }
    );
  }, []);

  return (
    <div className="mt-12 flex justify-center flex-col items-center">
      {/* Upload Box */}
      <div
        onClick={() => widgetRef.current?.open()}
        className="flex justify-center flex-col items-center w-3/4 h-84 border-dashed border-2 cursor-pointer rounded-xl"
      >
        <MdOutlineCloudUpload size={44} color="grey" />
        <span>{mediaURLs.length ? 'Upload More Files' : 'Upload Images or Videos'}</span>
      </div>

      {/* Preview all uploaded media */}
      {mediaURLs.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 w-3/4">
          {mediaURLs.map((file, index) => (
            <div key={index} className="relative rounded-xl overflow-hidden border border-gray-300 h-48 w-full">
              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
                className="absolute top-1 right-1 text-red-500 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
              >
                <AiOutlineCloseCircle size={22} />
              </button>

              {/* Show image or video */}
              {file.type === 'image' ? (
                <img src={file.url} alt={`uploaded-${index}`} className="h-full w-full object-cover" />
              ) : (
                <video src={file.url} controls className="h-full w-full object-cover" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Navigation Buttons */}
      <Group justify="center" mt="xl">
        <Button onClick={prevStep}>Go Back</Button>
        <Button onClick={handleNext} disabled={mediaURLs.length === 0}>
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadMedia;
