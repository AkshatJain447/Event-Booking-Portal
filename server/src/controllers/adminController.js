import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const addHotel = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const bookingData = { hotelId: id, duration: 1, type: "admin" };

  try {
    const adminDoc = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { bookings: bookingData } },
      { new: true }
    );
    if (!adminDoc) {
      return res
        .status(404)
        .json({ message: "Admin not found", success: false });
    }
    res.status(201).json({ message: "Hotel added", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const displayHotel = async (req, res) => {
  const userId = req.user.id;

  try {
    const { bookings } = await User.findById(userId).select("bookings -_id");
    const hotelIds = bookings.map((b) => b.hotelId);
    if (hotelIds.length === 0) {
      return res.status(200).json({ message: "No hotel in list" });
    }
    const adminHotelList = await Hotel.find({
      _id: { $in: hotelIds },
    });
    res.status(200).json({ message: "Hotels found", adminHotelList });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
