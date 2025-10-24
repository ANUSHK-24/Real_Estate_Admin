import { prisma } from "../config/prismaConfig.js";
import asyncHandler from "express-async-handler"

export const createUser = asyncHandler(async (req, res) => {
    console.log("creating a user");
    let { email } = req.body
    const userExists = await prisma.user.findUnique({ where: { email } })
    if (!userExists) {
        const user = await prisma.user.create({ data: req.body })
        res.send({
            message: "User registered successfully",
            user: user,
        })
    }
    else res.status(201).send({ message: "User already registered" })

})

export const bookVisit = asyncHandler(async (req, res) => {
    const { email, date } = req.body
    const { id } = req.params

    try {
        const alreadyBooked = await prisma.user.findUnique({
            where: { email: email },
            select: { bookedVisits: true }
        })
        if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
            res.status(400).json({ message: "This residency is already booked by you" })
        }
        else {
            await prisma.user.update({
                where: { email: email },
                data: {
                    bookedVisits: { push: { id, date } }
                }
            })
           res.status(200).json({ message: "Your visit is booked successfully" });
        }
    } catch (err) {
        throw new Error(err.message)
    }
})

export const allBookings = asyncHandler(async (req, res) => {
    const { email } = req.body
    try {
        const bookings = await prisma.user.findUnique({
            where: { email },
            select: { bookedVisits: true }
        })

        res.status(200).send(bookings)
    } catch (err) {
        throw new Error(err.message)
    }
})

export const cancelBooking = asyncHandler(async (req, res) => {
    const { email } = req.body
    const { id } = req.params
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { bookedVisits: true }
        })
        const index = user.bookedVisits.findIndex((visit) => visit.id === id)
        if (index === -1) {
            res.status(404).json({ message: "Booking not found" })
        } else {
            user.bookedVisits.splice(index, 1)
            await prisma.user.update({
                where: { email },
                data: {
                    bookedVisits: user.bookedVisits
                }
            })
            res.send("Booking cancelled successfully")
        }
    } catch (err) {
        throw new Error(err.message)
    }
})

export const toFav = asyncHandler(async (req, res) => {
    const { email } = req.body
    const { rid } = req.params
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })
        if (user.favResidenciesID.includes(rid)) {
            const updateUser = await prisma.user.update({
                where: { email },
                data: {
                    favResidenciesID: {
                        set: user.favResidenciesID.filter((id) => id !== rid)
                    }
                }
            })
            res.send({ message: "Removed from Favourite", user: updateUser })
        } else {
            const updateUser = await prisma.user.update({
                where: { email },
                data: {
                    favResidenciesID: {
                        push: rid
                    }
                }
            })
            res.send({ message: "Updated Favourites", user: updateUser })
        }
    } catch (err) {
        throw new Error(err.message)
    }

})


export const getAllFav=asyncHandler(async(req,res)=>{
    const { email } =req.body
    try{
        const favResd=await prisma.user.findUnique({
            where: { email },
            select: { favResidenciesID:true}
        })
        res.status(200).send(favResd)
    }catch(err){
        throw new Error(err.message)
    }
})

export const getContacts = asyncHandler(async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" } // newest first
    });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contacts", error: err.message });
  }
});


// export const getAllUserBookings = asyncHandler(async (req, res) => {
//   try {
//     const users = await prisma.user.findMany({
//       select: {
//         id: true,             // Prisma field, maps to MongoDB _id
//         name: true,
//         email: true,
//         phoneNumber: true,    // optional, if exists
//         bookedVisits: true,   // Json[]
//       },
//     });

//     const allBookings = [];

//     users.forEach(user => {
//       if (Array.isArray(user.bookedVisits)) {
//         user.bookedVisits.forEach(visit => {
//           allBookings.push({
//             userId: user.id,
//             name: user.name || "N/A",
//             email: user.email,
//             phoneNumber: user.phoneNumber || "N/A",
//             bookingId: visit.id,
//             date: visit.date,
//           });
//         });
//       }
//     });

//     // Sort upcoming bookings first
//     allBookings.sort((a, b) => new Date(a.date) - new Date(b.date));

//     res.status(200).json(allBookings);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to fetch all bookings", error: err.message });
//   }
// });


export const getAllUserBookings = asyncHandler(async (req, res) => {
  try {
    // Fetch all users with their bookedVisits
    const users = await prisma.user.findMany({
      select: {
        id: true,         // Prisma field, maps to _id
        name: true,
        email: true,
        bookedVisits: true, // Json[] as in your database
      },
    });

    const allBookings = [];

    // Flatten bookedVisits and include phoneNumber from each booking
    users.forEach(user => {
      if (Array.isArray(user.bookedVisits)) {
        user.bookedVisits.forEach(visit => {
          allBookings.push({
            userId: user.id,
            name: user.name || "N/A",
            email: user.email,
            phoneNumber: visit.phoneNumber || "N/A", // phoneNumber is stored per booking
            bookingId: visit.id,
            date: visit.date
          });
        });
      }
    });

    // Sort bookings by date ascending
    allBookings.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.status(200).json(allBookings);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch all bookings", error: err.message });
  }
});