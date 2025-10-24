// import React from 'react'
// import { CgRuler } from 'react-icons/cg'

// import { MdOutlineBathtub, MdOutlineBed, MdOutlineGarage } from 'react-icons/md'
// import { useNavigate } from 'react-router-dom'


// const Item = ({property}) => {
//   const navigate=useNavigate()
//   return (
//     <div onClick={()=>{navigate(`../Delete_Property/${property.id}`)}} className='rounded-lg overflow-hidden bg-white ring ring-slate-900/5'>
//       <div className='relative'>
//         <img src ={property.image} alt={property.title} className='h-52 w-full aspect-square object-cover'/>
//         <div className='absolute top-4 right-6'>
            
//         </div>
//      </div>
//         <div className='m-3'>
//             <div className='flex items-center justify-between'>
//                 <h5 className='text-[16px] font-bold my-1 text-green-400 '>{property.city}</h5>
//                 <h4 className='text-[16px] md:text-[17px] mb-2 font-bold'>${property.price}.00</h4>
//             </div>
//             <h4 className='text-[18px] font-medium line-clamp-1' >{property.title}</h4>
//             <div className='flex gap-x-2 py-2'>
//                 <div className='flex items-center justify-center gap-x-2 border-r border-slate-900/50 pr-4  font-medium'>
//                 <MdOutlineBed /> {property.facilities.bedrooms}
//                 </div>
//                 <div className='flex items-center justify-center gap-x-2 border-r border-slate-900/50 pr-4  font-medium'>
//                 <MdOutlineBathtub/> {property.facilities.bathrooms}
//                 </div>
//                 <div className='flex items-center justify-center gap-x-2 border-r border-slate-900/50 pr-4  font-medium'>
//                 <MdOutlineGarage /> {property.facilities.parkings}
//                 </div>
//                 <div className='flex items-center justify-center gap-x-2 border-r border-slate-900/50  pr-4  font-medium'>
//                <CgRuler />400
//                 </div>
//             </div>
//             <p className='pt-2 mb-4 line-clamp-2'>{property.description}</p>
//         </div>
//       </div>
      
   
//   )
// }

// export default Item


import React from 'react';
import { CgRuler } from 'react-icons/cg';
import { MdOutlineBathtub, MdOutlineBed, MdOutlineGarage,MdSquareFoot } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Item = ({ property }) => {
  const navigate = useNavigate();

  // Pick the first image from media array
  const firstImage = property.media?.find((m) => m.type === 'image')?.url || property.image;

  return (
    <div
      onClick={() => {
        navigate(`../Delete_Property/${property.id}`);
      }}
      className="rounded-lg overflow-hidden bg-white ring ring-slate-900/5"
    >
      <div className="relative">
        <img src={firstImage} alt={property.title} className="h-52 w-full aspect-square object-cover" />
        <div className="absolute top-4 right-6"></div>
      </div>
      <div className="m-3">
        <div className="flex items-center justify-between">
          <h5 className="text-[16px] font-bold my-1 text-green-400">{property.city}</h5>
          {/* <h4 className="text-[16px] md:text-[17px] mb-2 font-bold">${property.price}.00</h4> */}
          <h4 className='text-[16px] md:text-[17px] mb-2 font-bold'>₹{property.price}.00</h4>

        </div>
        <h4 className="text-[18px] font-medium line-clamp-1">{property.title}</h4>
        <div className="flex gap-x-2 py-2">
          <div className="flex items-center justify-center gap-x-2 border-r border-slate-900/50 pr-4 font-medium">
            <MdSquareFoot /> {property.facilities.area}sq.ft
          </div>
          {/* <div className="flex items-center justify-center gap-x-2 border-r border-slate-900/50 pr-4 font-medium">
            <MdOutlineBathtub /> {property.facilities.bathrooms}
          </div>
          <div className="flex items-center justify-center gap-x-2 border-r border-slate-900/50 pr-4 font-medium">
            <MdOutlineGarage /> {property.facilities.parkings}
          </div> */}
          <div className="flex items-center justify-center gap-x-2 border-r border-slate-900/50 pr-4 font-medium">
            <CgRuler /> 400
          </div>
        </div>
        <p className="pt-2 mb-4 line-clamp-2">{property.description}</p>
      </div>
    </div>
  );
};

export default Item;
