// import React, { useState, useEffect } from "react";
// import Searchbar from "../components/Searchbar1";
// import ContactItem from "../components/ContactItem1";
// import { PuffLoader } from "react-spinners";
// import { getAllContacts } from "../utils/api";

// const ContactsListing = () => {
//   const [filter, setFilter] = useState("");
//   const [contacts, setContacts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         const data = await getAllContacts();
//         setContacts(data);
//         setIsLoading(false);
//       } catch (err) {
//         console.error(err);
//         setIsError(true);
//         setIsLoading(false);
//       }
//     };

//     fetchContacts();
//   }, []);

//   if (isError) return <div><span>Error fetching data</span></div>;

//   if (isLoading)
//     return (
//       <div className="h-64 flex justify-center mt-24 items-center">
//         <PuffLoader height="80" width="80" radius={1} color="#555" aria-label="puff-loading" />
//       </div>
//     );

//   const filteredContacts = contacts.filter((contact) =>
//     contact.name?.toLowerCase().includes(filter.toLowerCase()) ||
//     contact.email?.toLowerCase().includes(filter.toLowerCase()) ||
//     contact.subject?.toLowerCase().includes(filter.toLowerCase()) ||
//     contact.message?.toLowerCase().includes(filter.toLowerCase())
//   );

//   return (
//     <main className="my-24">
//       <div className="mx-auto px-6 lg:px-12 py-10 bg-linear-to-r from-yellow-400 via-yellow-200 to-white">
//         <Searchbar filter={filter} setFilter={setFilter} />
//         <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {filteredContacts.length === 0 ? (
//             <p className="col-span-full text-center text-gray-500">No contacts found</p>
//           ) : (
//             filteredContacts.map((contact) => (
//               <ContactItem key={contact.id || contact._id} contact={contact} />
//             ))
//           )}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default ContactsListing;

import React, { useState, useEffect } from "react";
import { PuffLoader } from "react-spinners";
import { getAllContacts } from "../utils/api";
import Searchbar from "../components/Searchbar1";
import ContactItem from "../components/ContactItem1";

const ContactsListing = () => {
  const [filter, setFilter] = useState("");
  const [groupedContacts, setGroupedContacts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getAllContacts();

        // 🧠 Group contacts by userId (or fallback to contact id if null)
        const grouped = data.reduce((acc, contact) => {
          const key = contact.userId || contact._id; // fallback if user not logged in
          if (!acc[key]) acc[key] = [];
          acc[key].push(contact);
          return acc;
        }, {});

        setGroupedContacts(grouped);
        setIsLoading(false);
      } catch (err) {
        console.error("❌ Error fetching contacts:", err);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (isError)
    return (
      <div className="text-center mt-20 text-red-500 text-lg">
        ❌ Failed to fetch contacts. Please try again later.
      </div>
    );

  if (isLoading)
    return (
      <div className="h-64 flex justify-center mt-24 items-center">
        <PuffLoader color="#555" />
      </div>
    );

  // 🔍 Filter across all messages
  const filteredGrouped = Object.entries(groupedContacts).reduce(
    (acc, [userId, messages]) => {
      const filteredMessages = messages.filter(
        (m) =>
          m.name?.toLowerCase().includes(filter.toLowerCase()) ||
          m.email?.toLowerCase().includes(filter.toLowerCase()) ||
          m.phone?.toLowerCase().includes(filter.toLowerCase()) ||
          m.subject?.toLowerCase().includes(filter.toLowerCase()) ||
          m.message?.toLowerCase().includes(filter.toLowerCase())
      );
      if (filteredMessages.length > 0) acc[userId] = filteredMessages;
      return acc;
    },
    {}
  );

  const groupedEntries = Object.entries(filteredGrouped);

  return (
    <main className="my-20 px-6 lg:px-16">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🧾 Contact Messages (Grouped by User)
      </h1>

      <Searchbar filter={filter} setFilter={setFilter} />

      {groupedEntries.length === 0 ? (
        <p className="text-center text-gray-500 mt-12">No contacts found</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {groupedEntries.map(([userId, contacts]) => {
            const first = contacts[0];
            return (
              <div
                key={userId}
                className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  👤 {first.name || "Unknown User"}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  📧 {first.email}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  📱 {first.phone}
                </p>

                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {contacts.map((c, idx) => (
                    <div
                      key={c._id || `${userId}-${idx}`}
                      className="bg-yellow-50 rounded-lg p-3 shadow-sm border border-yellow-100"
                    >
                      <p className="font-medium text-gray-800 mb-1">
                        {c.subject}
                      </p>
                      <p className="text-sm text-gray-600">{c.message}</p>
                      <p className="text-xs text-gray-400 mt-2 text-right">
                        {new Date(c.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default ContactsListing;
