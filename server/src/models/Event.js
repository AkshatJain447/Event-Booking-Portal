import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    catererVendor: {
      type: {
        name: String,
        price: Number,
      },
      default: null,
    },
    decoratorVendor: {
      type: {
        name: String,
        price: Number,
      },
      default: null,
    },
    djVendor: {
      type: {
        name: String,
        price: Number,
      },
      default: null,
    },
    roomHotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      default: null,
    },
    hallHotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      default: null,
    },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
