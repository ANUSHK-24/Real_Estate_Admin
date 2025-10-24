import { prisma } from "../config/prismaConfig.js";
import asyncHandler from "express-async-handler"

// export const createResidency=asyncHandler(async(req,res)=>{
//     const{ title,description,price,address,country,city,facilities,image,userEmail }=req.body.data || req.body

//     console.log(req.body.data)
//     try{
//         const residency=await prisma.residency.create({
//             data:{
//                 title,
//                 description,
//                 price,
//                 address,
//                 country,
//                 city,
//                 facilities,
//                 image,
//                 owner :{connect:{email:userEmail}} 
//             }
//         })

//         res.send({message:"Residency created successfully",residency})
//     }catch(err){
//         if(err.code==="P2002"){
//             throw new Error("Already have a residency with this address")
//         }
//         throw new Error(err.message)
//     }
    
// })
// export const createResidency = asyncHandler(async (req, res) => {
//   const {
//     title,
//     description,
//     price,
//     address,
//     country,
//     city,
//     facilities,
//     image,
//     userEmail,
//   } = req.body.data || req.body;

//   console.log(req.body.data || req.body);

//   try {
//     const residency = await prisma.residency.create({
//       data: {
//         title,
//         description,
//         price,
//         address,
//         country,
//         city,
//         facilities,
//         image, // make sure this is a string/URL
//         owner: userEmail ? { connect: { email: userEmail } } : undefined,
//       },
//     });

//     res.send({ message: "Residency created successfully", residency });
//   } catch (err) {
//     if (err.code === "P2002") {
//       res.status(400).json({ message: "Already have a residency with this address" });
//     } else {
//       res.status(500).json({ message: err.message });
//     }
//   }
// });

// export const createResidency = asyncHandler(async (req, res) => {
//   const {
//     title,
//     description,
//     price,
//     address,
//     country,
//     city,
//     facilities,
//     media, // ✅ now supports multiple images/videos
//   } = req.body.data || req.body;

//   console.log("Incoming Residency Data:", req.body.data || req.body);

//   try {
//     // Handle stringified JSON safely (in case frontend sends JSON as a string)
//     const parsedFacilities =
//       typeof facilities === "string" ? JSON.parse(facilities) : facilities;
//     const parsedMedia =
//       typeof media === "string" ? JSON.parse(media) : media;

//     const residency = await prisma.residency.create({
//       data: {
//         title,
//         description,
//         price: Number(price),
//         address,
//         country,
//         city,
//         facilities: parsedFacilities,
//         media: parsedMedia, // ✅ array of { url, type }
//       },
//     });

//     res.status(201).json({
//       message: "Residency created successfully",
//       residency,
//     });
//   } catch (err) {
//     console.error("Error creating residency:", err);
//     if (err.code === "P2002") {
//       // Prisma unique constraint error
//       res.status(400).json({
//         message: "A residency with this address already exists",
//       });
//     } else {
//       res.status(500).json({
//         message: "Failed to create residency",
//         error: err.message,
//       });
//     }
//   }
// });


export const createResidency = asyncHandler(async (req, res) => {
  const {
    title = "",
    description = "",
    price = 0,
    address = "",
    city = "",
    country = "",
    facilities = {},
    media = [],
  } = req.body;

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price: Number(price),
        address,
        city,
        country,
        facilities,
        media, // array of {url, type}
      },
    });

    res.status(201).json({
      success: true,
      message: "Residency created successfully",
      residency,
    });
  } catch (err) {
    console.error("Error creating residency:", err);

    // Handle unique address constraint error
    if (err.code === "P2002") {
      return res.status(400).json({
        success: false,
        message: "A residency with this address already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

 export const getAllResidencies=asyncHandler(async(req,res)=>{
    const residencies=await prisma.residency.findMany({
        orderBy:{
            createdAt:"desc"
        }
    })
    res.send(residencies)
})

export const getResidency=asyncHandler(async(req,res)=>{
    const { id }=req.params;

    try{
        const residency=await prisma.residency.findUnique({where :{ id }})
        res.send(residency)
    }catch(err){
        console.log(err)
        throw new Error(err.message)
    }
})
export const deleteResidency = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const residency = await prisma.residency.findUnique({ where: { id } });
    if (!residency) {
        return res.status(404).json({ message: "Residency not found" });
    }

    await prisma.residency.delete({ where: { id } });
    res.status(200).json({ message: "Residency deleted successfully" });
});
