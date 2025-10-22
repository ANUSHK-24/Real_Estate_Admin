

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { PuffLoader } from "react-spinners";
import { FaStar } from "react-icons/fa";
import {
  MdLocationOn,
  MdSquareFoot
} from "react-icons/md";
import { CgRuler } from "react-icons/cg";
import Map from "../components/Map";

import { getProperty, deleteResidencyApi } from "../utils/api";
import { toast } from "react-toastify";

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const navigate = useNavigate();

  const { data, isError, isLoading } = useQuery(["resd", id], () => getProperty(id));

  // Handler for deleting property
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      await deleteResidencyApi(id);
      toast.success("Residency deleted successfully");
      navigate("/Delete_Property");
    } catch (err) {
      toast.error("Failed to delete residency");
    }
  };

  if (isError) {
    return <div><span>Error fetching property</span></div>;
  }

  if (isLoading) {
    return (
      <div className="h-64 flex justify-center">
        <PuffLoader height="80" width="80" radius={1} color="#555" aria-label="puff-loading" />
      </div>
    );
  }

  return (
    <section className="max-padd-container mx-[2px] my-[99px]">
      {/* Image & Heart button */}
      <div className="pb-2 relative">
        <img
          src={data?.image}
          alt={data?.title}
          className="rounded-tr-3xl rounded-tl-3xl max-h-108 w-full object-cover aspect-square"
        />
        <div className="absolute top-8 right-8">
        
        </div>
      </div>

      <div className="xl:flex justify-between gap-8">
        {/* Left Column: Property Details */}
        <div className="flex-1">
          <p className="flex gap-x-2">
            <MdLocationOn />
            <span>{data?.address} {data?.city} {data?.country}</span>
          </p>

          <div className="flex justify-between pt-3">
            <h4 className="font-bold text-[20px]">{data.title}</h4>
            <div className="font-bold text-[20px]">${data.price}.00</div>
          </div>

          <div className="flex justify-between py-1">
            <h5 className="bold-16 text-green-700">{data?.city}</h5>
            <div className="flex items-baseline gap-2">
              <h4 className="font-bold text-[18px] text-black">5.0</h4>
              {[...Array(5)].map((_, i) => <FaStar key={i} />)}
            </div>
          </div>

          <div className="flex gap-x-4">
            <div className="flex gap-x-2 border-r pr-4 font-medium">
              <MdSquareFoot />{data?.facilities.area}
            </div>
            <div className="flex gap-x-2 border-r pr-4 font-medium">
              <CgRuler />400
            </div>
          </div>

          <h4 className="h4 mt-3">Property Details</h4>
          <p className="mb-4">{data?.description}</p>

          {/* Delete button */}
          <div className="pt-5">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            >
              Delete Property
            </button>
          </div>
        </div>

        {/* Right Column: Map */}
        <div className="flex-1">
          <Map address={data?.address} city={data?.city} country={data?.country} />
        </div>
      </div>
    </section>
  );
};

export default Property;

