import React, { useEffect, useState } from "react";
import { getAllUsers } from "../utils/api";
import { PuffLoader } from "react-spinners";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
        setIsLoading(false);
      } catch (err) {
        console.error("❌ Error fetching users:", err);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isError)
    return (
      <div className="text-center mt-20 text-red-500 text-lg">
        ❌ Failed to fetch users
      </div>
    );

  if (isLoading)
    return (
      <div className="h-64 flex justify-center mt-24 items-center">
        <PuffLoader color="#555" />
      </div>
    );

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(filter.toLowerCase()) ||
      u.email?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <main className="my-16 px-6 lg:px-16 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        👥 All Registered Users
      </h1>

      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search users..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-1/2 px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800"
        />
      </div>

      {filteredUsers.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No users found</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-xl rounded-3xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col items-center"
            >
              {/* Avatar with first 2 letters */}
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-yellow-400 text-white text-2xl font-bold mb-4">
                {user.name ? user.name.slice(0, 2).toUpperCase() : "NA"}
              </div>

              <h2 className="text-xl font-semibold text-gray-800 text-center">
                {user.name || "Unnamed User"}
              </h2>
              <p className="text-sm text-gray-600 mt-2 text-center">
                📧 {user.email}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Users;
