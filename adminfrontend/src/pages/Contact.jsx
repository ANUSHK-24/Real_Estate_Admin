import React, { useState, useEffect } from "react";
import Searchbar from "../components/Searchbar1";
import ContactItem from "../components/ContactItem1";
import { PuffLoader } from "react-spinners";
import { getAllContacts } from "../utils/api";

const ContactsListing = () => {
  const [filter, setFilter] = useState("");
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getAllContacts();
        setContacts(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (isError) return <div><span>Error fetching data</span></div>;

  if (isLoading)
    return (
      <div className="h-64 flex justify-center mt-24 items-center">
        <PuffLoader height="80" width="80" radius={1} color="#555" aria-label="puff-loading" />
      </div>
    );

  const filteredContacts = contacts.filter((contact) =>
    contact.name?.toLowerCase().includes(filter.toLowerCase()) ||
    contact.email?.toLowerCase().includes(filter.toLowerCase()) ||
    contact.subject?.toLowerCase().includes(filter.toLowerCase()) ||
    contact.message?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <main className="my-24">
      <div className="mx-auto px-6 lg:px-12 py-10 bg-linear-to-r from-yellow-400 via-yellow-200 to-white">
        <Searchbar filter={filter} setFilter={setFilter} />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredContacts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No contacts found</p>
          ) : (
            filteredContacts.map((contact) => (
              <ContactItem key={contact.id || contact._id} contact={contact} />
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default ContactsListing;
