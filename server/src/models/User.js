import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, max: 100 },
    email: { type: String, required: true, unique: true, max: 100 },
    role: { type: String, required: true },
    password: { type: String, required: true },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      default: null,
    },
    bookings: [
      {
        hotelId: {
          type: mongoose.Schema.Types.ObjectId,
          default: null,
        },
        checkInDate: {
          type: String,
        },
        duration: {
          type: Number,
          min: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
