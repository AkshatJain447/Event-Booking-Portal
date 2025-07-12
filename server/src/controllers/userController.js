import User from "../models/User.js";
import Hotel from "../models/Hotel.js";

export const bookHotel = async (req, res) => {
  const { hotelId, duration, type } = req.body;

  // Accessing user from req.user set by middleware
  const userId = req.user.id;

  if (!hotelId || !duration || !type) {
    return res
      .status(400)
      .json({ message: "Incomplete booking data", success: false });
  }

  const bookingData = { hotelId, duration, type };

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { bookings: bookingData } },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    res
      .status(200)
      .json({ message: "Hotel booked successfully", success: true });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const userInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDoc = await User.findById(userId).select("-password");

    if (!userDoc) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    res.status(200).json({
      message: "User found",
      success: true,
      user: userDoc,
    });
  } catch (error) {
    console.error("User info error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const findHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const hotelData = await Hotel.findById(id).select(
      "hotel_name address room hall -_id"
    );
    res.status(200).json({ message: "Hotel found", hotelData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
