import React from "react";

const ContactItem = ({ contact }) => {
  // Get first two letters of the name
  const initials = contact.name
    ? contact.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "NA";

  return (
    <div className="rounded-lg overflow-hidden bg-white ring ring-slate-900/5 p-4 my-2 flex gap-4">
      {/* Avatar placeholder */}
      <div className="shrink-0 w-16 h-16 rounded-full bg-green-400 text-white flex items-center justify-center text-xl font-bold">
        {initials}
      </div>

      {/* Contact details */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-[16px] md:text-[17px] font-bold">{contact.name}</h4>
          <span className="text-[14px] text-gray-500">
            {new Date(contact.createdAt).toLocaleString()}
          </span>
        </div>

        <div className="mb-2">
          <p className="text-[14px]"><span className="font-semibold">Email:</span> {contact.email}</p>
          <p className="text-[14px]"><span className="font-semibold">Phone:</span> {contact.phone}</p>
          <p className="text-[14px]"><span className="font-semibold">Subject:</span> {contact.subject}</p>
        </div>

        <p className="text-[14px] line-clamp-3">
          <span className="font-semibold">Message:</span> {contact.message}
        </p>
      </div>
    </div>
  );
};

export default ContactItem;
