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
export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data || req.body;

  console.log(req.body.data || req.body);

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image, // make sure this is a string/URL
        owner: userEmail ? { connect: { email: userEmail } } : undefined,
      },
    });

    res.send({ message: "Residency created successfully", residency });
  } catch (err) {
    if (err.code === "P2002") {
      res.status(400).json({ message: "Already have a residency with this address" });
    } else {
      res.status(500).json({ message: err.message });
    }
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
