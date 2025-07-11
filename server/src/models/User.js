import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 100,
      unique: 1,
    },
    role: {
      type: String,
      required: true,
      max: 6,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
    },
    bookings: [
      {
        hotelId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        duration: {
          type: Number,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
