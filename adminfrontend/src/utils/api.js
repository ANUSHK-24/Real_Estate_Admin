import axios from "axios"
import dayjs from "dayjs"
import { toast } from "react-toastify"

// export const api = axios.create({
//     baseURL: "https://real-estate-backend-ipm33bce0-amitesh880s-projects.vercel.app/api",
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });
// export const api = axios.create({
//     baseURL: "http://localhost:3000/api",
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });


export const api = axios.create({
 baseURL: "https://real-estate-admin2.vercel.app/api", // your deployed backend
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});




export const getAllProperties = async () => {
    try {
        const response = await api.get("/residency/allresd", {
            timeout: 10 * 1000,
        });

        if (response.status === 400 || response.status === 500) {
            throw response.data;
        }

        return response.data.reverse();
    } catch (error) {
        toast.error("Something went wrong");
        throw error;
    }
};


export const getProperty = async (id) => {
    try {
        const response = await api.get(`/residency/${id}`, {
            timeout: 10 * 1000,
        })
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        toast.error("Something went wrong")
        throw error
    }
}

export const createUser = async (email, token) => {
    try{
        await api.post(`/user/register`,{email},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
    } catch (error){
        toast.error("Something went wrong,Please try again")
        throw error
    }
}



export const createResidency = async (data) => {
  const requestData = { ...data };  // copy of data
  console.log(requestData);         // log it for debugging

  try {
    const res = await api.post("/residency/create", requestData);
    return res.data; // return response so calling code can use it
  } catch (e) {
    console.error(e);
    toast.error("Something went wrong while creating residency");
    throw e;
  }
};

export const getAllContacts = async () => {
  try {
    const response = await api.get("/user/contacts", { timeout: 10 * 1000 });
    
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }

    return response.data.reverse(); // newest first
  } catch (error) {
    console.error("Error fetching contacts:", error);
    toast.error("Failed to fetch contacts");
    throw error;
  }
};
export const deleteResidencyApi = async (id) => {
    try {
        const res = await api.delete(`/residency/delete/${id}`);
        return res.data;
    } catch (err) {
        throw err;
    }
};
