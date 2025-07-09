import Hotel from "../models/Hotel.js";
import enrichHotelWithImage from "../utils/fetchImage.js";

// Get all hotels
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json({ message: "Hotels fetched successfully", hotels });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ message: "Failed to fetch hotels" });
  }
};

// Get a hotel by ID
export const getHotelById = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    const hotelData = await enrichHotelWithImage(hotel);
    res.status(200).json({ hotel: hotelData });
  } catch (error) {
    console.error("Error fetching hotel:", error);
    res.status(500).json({ message: "Failed to fetch hotel" });
  }
};

// Get hotels by city
export const getHotelByCity = async (req, res) => {
  try {
    const { city, type } = req.params;
    const baseQuery = { city };
    if (type === "hall") {
      baseQuery.hall = { $exists: true }; // Only hotels with halls
    }

    const hotels = await Hotel.find(baseQuery).sort({ review_score: -1 });
    const queryHotelCount = await Hotel.countDocuments(baseQuery);

    if (hotels.length === 0) {
      return res.status(404).json({
        message: "No hotels found in the specified city and type",
        hotels: [],
        hotelCount: 0,
      });
    }
    const filteredHotels = hotels.filter((hotel) =>
      type === "hall"
        ? hotel.hall?.total_halls > 0
        : hotel.room?.total_rooms > 0
    );

    const enrichedHotels = await Promise.all(
      filteredHotels.map((hotel) => enrichHotelWithImage(hotel))
    );

    res.status(200).json({
      message: "Hotels fetched successfully",
      hotels: enrichedHotels,
      hotelCount: queryHotelCount,
    });
  } catch (error) {
    console.error("Error fetching hotels by city:", error);
    res.status(500).json({ message: "Failed to fetch hotels by city" });
  }
};

// Create a new hotel
export const createHotel = async (req, res) => {
  try {
    const newHotel = req.body.hotel;
    if (!newHotel) {
      return res.status(400).json({ message: "Hotel data is required" });
    }
    const hotel = new Hotel(newHotel);
    const response = await hotel.save();
    res.status(201).json({
      message: "Hotel created successfully",
      hotel: response,
    });
  } catch (error) {
    console.error("Error in creating new hotel", error);
    res.status(500).json({ message: "Failed to create hotel" });
  }
};

// Update a hotel by ID
export const updateHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const updatedData = req.body.hotel;
    if (!updatedData) {
      return res
        .status(400)
        .json({ message: "Hotel data is required for update" });
    }
    const hotel = await Hotel.findByIdAndUpdate(hotelId, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json({
      message: "Hotel updated successfully",
      hotel,
    });
  } catch (error) {
    console.error("Error updating hotel:", error);
    res.status(500).json({ message: "Failed to update hotel" });
  }
};

// Delete a hotel by ID
export const deleteHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const hotel = await Hotel.findByIdAndDelete(hotelId);
    if (!hotel) {
      res.status(404).json({ message: "Hotel not found" });
    } else {
      res.status(200).json({ message: "Hotel deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting hotel:", error);
    res.status(500).json({ message: "Failed to delete hotel" });
  }
};
