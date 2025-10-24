import React, { useState, useEffect } from "react";
import Searchbar from "../components/Searchbar1"; // your existing searchbar
import { PuffLoader } from "react-spinners";
import { getAllBookings } from "../utils/api";
import dayjs from "dayjs";

const BookingCard = ({ booking }) => {
  const isUpcoming = dayjs(booking.date).isAfter(dayjs(), "day");

  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-gray-700">{booking.name}</h2>
        <span className="text-sm text-gray-500">{booking.bookingId}</span>
      </div>

      <div className="text-gray-600 mb-2">
        <p>
          <span className="font-medium">Email:</span> {booking.email}
        </p>
        <p>
          <span className="font-medium">Phone:</span> {booking.phoneNumber}
        </p>
        <p>
          <span className="font-medium">Date:</span>{" "}
          {dayjs(booking.date).format("DD MMM YYYY")}
        </p>
      </div>

      <div className="mt-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            isUpcoming ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          {isUpcoming ? "Upcoming" : "Past"}
        </span>
      </div>
    </div>
  );
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getAllBookings();
        setBookings(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (isLoading)
    return (
      <div className="h-64 flex justify-center mt-24 items-center">
        <PuffLoader height="80" width="80" radius={1} color="#555" />
      </div>
    );

  if (isError)
    return <div className="text-center mt-24 text-red-500">Error fetching bookings</div>;

  const filteredBookings = bookings.filter(
    (b) =>
      b.name.toLowerCase().includes(filter.toLowerCase()) ||
      b.email.toLowerCase().includes(filter.toLowerCase()) ||
      b.bookingId.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <main className="my-24">
      <div className="mx-auto px-6 lg:px-12 py-10 bg-gradient-to-r from-blue-100 via-white to-blue-50 rounded-3xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">All User Bookings</h1>
        <Searchbar filter={filter} setFilter={setFilter} />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBookings.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No bookings found</p>
          ) : (
            filteredBookings.map((booking) => (
              <BookingCard key={booking.bookingId} booking={booking} />
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default Bookings;

