import Event from "../models/Event.js";
import User from "../models/User.js";
import Hotel from "../models/Hotel.js";

export const getEventInfo = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).select("event");
    if (!user?.event) {
      return res
        .status(404)
        .json({ message: "No event found for user", success: false });
    }

    const eventData = await Event.findById(user.event)
      .populate("roomHotel")
      .populate("hallHotel");

    res.status(200).json({ message: "Event found", eventData, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const createEvent = async (req, res) => {
  const eventData = req.body;
  const userId = req.user.id;

  if (
    !eventData.name?.trim() ||
    !eventData.date ||
    !eventData.duration ||
    !eventData.roomHotel ||
    !eventData.hallHotel ||
    !eventData.totalPrice
  ) {
    return res
      .status(400)
      .json({ message: "Missing required fields", success: false });
  }

  try {
    const user = await User.findById(userId).select("event");
    if (user?.event) {
      return res
        .status(409)
        .json({ message: "Event already exists", success: false });
    }

    const newEvent = new Event(eventData);
    await newEvent.save();

    await User.findByIdAndUpdate(userId, { event: newEvent._id });

    res.status(201).json({ message: "Event created", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// export const updateEvent = async (req, res) => {
//   const eventData = req.body;
//   const userId = req.user.id;

//   if (
//     !eventData.name?.trim() ||
//     !eventData.date ||
//     !eventData.duration ||
//     !eventData.roomHotel ||
//     !eventData.hallHotel ||
//     !eventData.totalPrice
//   ) {
//     return res
//       .status(400)
//       .json({ message: "Missing required fields", success: false });
//   }

//   try {
//     const user = await User.findById(userId).select("event");
//     const updatedEvent = await Event.findByIdAndUpdate(user.event, eventData, {
//       new: true,
//     });

//     if (!updatedEvent) {
//       return res
//         .status(500)
//         .json({ message: "Event update failed", success: false });
//     }

//     res.status(200).json({ message: "Event updated", success: true });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", success: false });
//   }
// };

// export const deleteEvent = async (req, res) => {
//   const userId = req.user.id;

//   try {
//     const user = await User.findById(userId).select("event");
//     await Event.findByIdAndDelete(user.event);
//     await User.findByIdAndUpdate(userId, { event: null });

//     res.status(200).json({ message: "Event deleted", success: true });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", success: false });
//   }
// };
