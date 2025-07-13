import { useState, useEffect } from "react";
import toast from "react-hot-toast";

/**
 * HotelForm component for creating or updating hotel data.
 * Props:
 * - initialData: (optional) hotel data to prefill form for editing
 * - onSuccess: function to call on successful submission
 * - onCancel: function to call when cancelling the form
 */

export const validateHotelForm = (formData) => {
  const errors = [];

  if (!formData.hotel_id) errors.push("Hotel ID is required.");
  if (!formData.hotel_name) errors.push("Hotel name is required.");
  if (!formData.address) errors.push("Address is required.");
  if (!formData.city) errors.push("City is required.");
  if (!formData.district) errors.push("District is required.");

  const room = formData.room;
  if (!room.type) errors.push("Room type is required.");
  if (!room.gross_price || room.gross_price <= 0)
    errors.push("Valid room gross price is required.");
  if (!room.capacity || room.capacity <= 0)
    errors.push("Valid room capacity is required.");
  if (!room.total_rooms || room.total_rooms <= 0)
    errors.push("Valid total rooms is required.");

  if (formData.hall_available) {
    const hall = formData.hall;
    if (!hall.type) errors.push("Hall type is required.");
    if (!hall.gross_price || hall.gross_price <= 0)
      errors.push("Valid hall gross price is required.");
    if (!hall.capacity || hall.capacity <= 0)
      errors.push("Valid hall capacity is required.");
    if (!hall.total_halls || hall.total_halls <= 0)
      errors.push("Valid total halls is required.");
  }

  if (!formData.checkin.from || !formData.checkin.until)
    errors.push("Check-in range is required.");
  if (!formData.checkout.from || !formData.checkout.until)
    errors.push("Checkout range is required.");

  return {
    isValid: errors.length === 0,
    errors,
  };
};

const HotelForm = ({ initialData = {}, onSuccess, onCancel }) => {
  const AMENITIES_LIST = [
    "Free WiFi",
    "Swimming Pool",
    "Fitness Center",
    "Airport Shuttle",
    "Free Parking",
    "Room Service",
    "Restaurant",
    "Spa",
    "Air Conditioning",
    "Pet Friendly",
    "24-Hour Front Desk",
    "Laundry Service",
    "Non-Smoking Rooms",
    "Bar",
    "Family Rooms",
    "Electric Vehicle Charging Station",
  ];

  const [formData, setFormData] = useState({
    hotel_id: "",
    hotel_name: "",
    address: "",
    city: "",
    district: "",
    latitude: "",
    longitude: "",
    review_score: 0,
    review_nr: 0,
    review_score_word: "",
    class: 0,
    accommodation_type_name: "",
    main_photo_url: "",
    max_photo_url: "",
    amenities: [],
    checkin: { from: "", until: "" },
    checkout: { from: "", until: "" },
    is_free_cancellable: false,
    is_no_prepayment_block: false,
    cc_required: true,
    hall_available: initialData?._id ? true : false,
    room: {
      type: "",
      all_inclusive_price: 0,
      gross_price: 0,
      currency: "INR",
      capacity: 1,
      total_rooms: 1,
    },
    hall: {
      type: "",
      all_inclusive_price: 0,
      gross_price: 0,
      currency: "INR",
      capacity: 0,
      total_halls: 0,
    },
  });

  useEffect(() => {
    if (initialData?._id) {
      setFormData({ ...formData, ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("room.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        room: { ...prev.room, [key]: type === "number" ? +value : value },
      }));
    } else if (name.startsWith("hall.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        hall: { ...prev.hall, [key]: type === "number" ? +value : value },
      }));
    } else if (name.startsWith("checkin.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        checkin: { ...prev.checkin, [key]: value },
      }));
    } else if (name.startsWith("checkout.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        checkout: { ...prev.checkout, [key]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid, errors } = validateHotelForm(formData);
    if (!isValid) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    const hotelData = {
      ...formData,
      currency_code: "INR",
    };
    if (!formData.hall_available) {
      delete hotelData.hall;
    }
    try {
      const response = await fetch(
        initialData?._id
          ? `https://event-booking-portal.onrender.com/api/hotels/update/${initialData._id}`
          : "https://event-booking-portal.onrender.com/api/hotels/",
        // initialData?._id
        //   ? `http://localhost:5000/api/hotels/update/${initialData._id}`
        //   : "http://localhost:5000/api/hotels/",
        {
          method: initialData?._id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(hotelData),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success(
          `Hotel ${initialData?._id ? "updated" : "created"} successfully`
        );
      } else {
        toast.error(data.message);
      }
      onSuccess();
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Submission failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 w-[90vw] mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">
        {initialData?._id ? "Update Hotel" : "Add New Hotel"}
      </h2>

      {/* Main Fields */}
      <h4 className="text-gray-600 my-1 text-sm">Basic Hotel Info</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-3 rounded-lg shadow-md">
        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">Hotel ID</label>
          <input
            name="hotel_id"
            type="number"
            placeholder="Hotel ID"
            value={formData.hotel_id}
            onChange={handleChange}
            className="border rounded-md py-1 px-3"
            required
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">Hotel Name</label>
          <input
            name="hotel_name"
            placeholder="Hotel Name"
            value={formData.hotel_name}
            onChange={handleChange}
            className="border rounded-md py-1 px-3"
            required
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">Address</label>
          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border rounded-md py-1 px-3"
            required
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">City</label>
          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="border rounded-md py-1 px-3"
            required
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">District</label>
          <input
            name="district"
            placeholder="District"
            value={formData.district}
            onChange={handleChange}
            className="border rounded-md py-1 px-3"
            required
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">Latitude</label>
          <input
            name="latitude"
            placeholder="Latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="border rounded-md py-1 px-3"
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">Longitude</label>
          <input
            name="longitude"
            placeholder="Longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="border rounded-md py-1 px-3"
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">Review Score</label>
          <input
            name="review_score"
            type="number"
            placeholder="Review Score"
            value={formData.review_score}
            onChange={handleChange}
            className="border rounded-md py-1 px-3"
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">No. of Reviews</label>
          <input
            name="review_nr"
            type="number"
            placeholder="No. of Reviews"
            value={formData.review_nr}
            onChange={handleChange}
            className="border rounded-md py-1 px-3"
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">Review Word</label>
          <input
            name="review_score_word"
            placeholder="Review Word"
            value={formData.review_score_word}
            onChange={handleChange}
            className="border rounded-md py-1 px-3"
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">Hotel Class</label>
          <input
            name="class"
            type="number"
            placeholder="Hotel Class"
            value={formData.class}
            onChange={handleChange}
            className="border rounded-md py-1 px-3"
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">Accommodation Type</label>
          <input
            name="accommodation_type_name"
            placeholder="Accommodation Type"
            value={formData.accommodation_type_name}
            onChange={handleChange}
            className="border rounded-md py-1 px-3"
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">Photo URL</label>
          <input
            name="main_photo_url"
            placeholder="Main Photo URL"
            value={formData.main_photo_url}
            onChange={handleChange}
            className="border rounded-md py-1 px-3"
          />
        </div>
      </div>

      <h4 className="text-sm mt-4 mb-1 text-gray-600">Amenities</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 border rounded-lg p-3 shadow-md">
        {AMENITIES_LIST.map((item) => (
          <label key={item} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={item}
              checked={formData.amenities.includes(item)}
              onChange={(e) => {
                const { checked, value } = e.target;
                setFormData((prev) => ({
                  ...prev,
                  amenities: checked
                    ? [...prev.amenities, value]
                    : prev.amenities.filter((a) => a !== value),
                }));
              }}
            />
            <span>{item}</span>
          </label>
        ))}
      </div>

      {/* Checkin / Checkout */}
      <h4 className="text-sm text-gray-600 mt-4 mb-1">Check-In/Check-Out</h4>
      <div className="grid grid-cols-2 gap-4 mb-4 border rounded-lg shadow-md p-3">
        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">Check-in From</label>
          <input
            name="checkin.from"
            placeholder="Check-in From"
            value={formData.checkin.from}
            onChange={handleChange}
            className="border rounded-md py-1 px-3"
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">Check-in Until</label>
          <input
            name="checkin.until"
            placeholder="Check-in Until"
            value={formData.checkin.until}
            onChange={handleChange}
            className="border rounded-md py-1 px-3"
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">Checkout From</label>
          <input
            name="checkout.from"
            placeholder="Checkout From"
            value={formData.checkout.from}
            onChange={handleChange}
            className="border rounded-md py-1 px-3"
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">Checkout Until</label>
          <input
            name="checkout.until"
            placeholder="Checkout Until"
            value={formData.checkout.until}
            onChange={handleChange}
            className="border rounded-md py-1 px-3"
          />
        </div>
      </div>

      {/* Booleans */}
      <div className="flex gap-6 justify-between mt-4 border rounded-lg shadow-md p-3">
        <label>
          <input
            type="checkbox"
            name="is_free_cancellable"
            checked={formData.is_free_cancellable}
            onChange={handleChange}
          />{" "}
          Free Cancellation
        </label>
        <label>
          <input
            type="checkbox"
            name="is_no_prepayment_block"
            checked={formData.is_no_prepayment_block}
            onChange={handleChange}
          />{" "}
          No Prepayment
        </label>
        <label>
          <input
            type="checkbox"
            name="cc_required"
            checked={formData.cc_required}
            onChange={handleChange}
          />{" "}
          Credit Card Required
        </label>
      </div>

      {/* Room & Hall Fields */}
      <h4 className="text-sm text-gray-600 mt-4 mb-1">Room Info</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border rounded-lg shadow-md p-3">
        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">Room Type</label>
          <input
            name="room.type"
            placeholder="Room Type"
            value={formData.room.type}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">Gross Price</label>
          <input
            name="room.gross_price"
            type="number"
            placeholder="Gross Price"
            value={formData.room.gross_price}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">All Inclusive Price</label>
          <input
            name="room.all_inclusive_price"
            type="number"
            placeholder="All Inclusive Price"
            value={formData.room.all_inclusive_price}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">Currency</label>
          <input
            name="room.currency"
            placeholder="Currency"
            value={formData.room.currency}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">Capacity</label>
          <input
            name="room.capacity"
            type="number"
            placeholder="Capacity"
            min={1}
            value={formData.room.capacity}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="flex flex-col justify-start">
          <label className="text-gray-500 text-sm">Total Rooms</label>
          <input
            name="room.total_rooms"
            type="number"
            placeholder="Total Rooms"
            min={1}
            value={formData.room.total_rooms}
            onChange={handleChange}
            className="input"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-1 mt-4">
        <h3 className="text-sm text-gray-600">Hall Info</h3>
        <label className="flex items-center gap-2 text-sm text-gray-500">
          <input
            type="checkbox"
            name="hall_available"
            checked={formData.hall_available}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                hall_available: e.target.checked,
              }))
            }
          />
          Hall Available
        </label>
      </div>
      {formData.hall_available && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border rounded-lg shadow-md p-3">
          <div className="flex flex-col justify-start">
            <label className="text-gray-500 text-sm">Hall Type</label>
            <input
              name="hall.type"
              placeholder="Hall Type"
              value={formData.hall.type}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="flex flex-col justify-start">
            <label className="text-gray-500 text-sm">Gross Price</label>
            <input
              name="hall.gross_price"
              type="number"
              placeholder="Gross Price"
              value={formData.hall.gross_price}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="flex flex-col justify-start">
            <label className="text-gray-500 text-sm">All Inclusive Price</label>
            <input
              name="hall.all_inclusive_price"
              type="number"
              placeholder="All Inclusive Price"
              value={formData.hall.all_inclusive_price}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="flex flex-col justify-start">
            <label className="text-gray-500 text-sm">Currency</label>
            <input
              name="hall.currency"
              placeholder="Currency"
              value={formData.hall.currency}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="flex flex-col justify-start">
            <label className="text-gray-500 text-sm">Capacity</label>
            <input
              name="hall.capacity"
              type="number"
              placeholder="Capacity"
              min={1}
              value={formData.hall.capacity}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="flex flex-col justify-start">
            <label className="text-gray-500 text-sm">Total Halls</label>
            <input
              name="hall.total_halls"
              type="number"
              placeholder="Total Halls"
              min={1}
              value={formData.hall.total_halls}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>
      )}

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 px-4 py-2 rounded-md hover:bg-red-100 hover:text-red-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-accent3 text-white px-4 py-2 rounded-md hover:bg-accent2"
        >
          {initialData?._id ? "Update Hotel" : "Create Hotel"}
        </button>
      </div>
    </form>
  );
};

export default HotelForm;
