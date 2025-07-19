import React from "react";
import { useDispatch } from "react-redux";

const VendorCard = ({
  vendors,
  selectedVendor,
  setVendor,
  labelIcon,
  label,
}) => {
  const dispatch = useDispatch();

  const getStyleByType = (type) => {
    switch (type) {
      case "Premium":
        return "border-yellow-400 shadow-yellow-200";
      case "Elite":
        return "border-purple-400 shadow-purple-200";
      case "Regular":
      default:
        return "border-blue-400 shadow-blue-200";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-4 w-[90vw] mx-auto my-4">
      <h5 className="flex font-semibold text-gray-600 items-center gap-1 border-b pb-2">
        {labelIcon}
        {label}
      </h5>
      <div className="flex flex-wrap gap-3 mt-2">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className={`flex items-center py-2 px-5 rounded-lg shadow-md border-2 w-full md:w-[49%] lg:max-w-[32%] justify-between ${getStyleByType(
              vendor.type
            )} hover:scale-105 transition-all duration-150 cursor-pointer ${
              vendor.name === selectedVendor?.name ? "ring-4 ring-accent3" : ""
            }`}
            onClick={() => dispatch(setVendor(vendor))}
          >
            <div>
              <h6 className="text-lg font-semibold">{vendor.name}</h6>
              <p className="text-xs text-gray-600 italic">{vendor.type}</p>
            </div>
            <div className="text-xs text-right">
              ₹<span className="text-lg">{vendor.price}</span>
              {label === "Caterer Vendor" && (
                <>
                  <br />
                  /per person
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorCard;
