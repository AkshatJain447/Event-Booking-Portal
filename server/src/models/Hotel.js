import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    hotel_id: {
      type: Number,
      required: true,
      unique: true,
    },
    hotel_name: {
      type: String,
      required: true,
    },
    city: String,
    district: String,
    address: String,
    latitude: Number,
    longitude: Number,
    currency_code: String,
    review_score: Number,
    review_nr: Number,
    review_score_word: String,
    class: Number,
    accommodation_type_name: String,

    main_photo_url: String,
    max_photo_url: String,

    amenities: [String],

    checkin: {
      from: String,
      until: String,
    },

    checkout: {
      from: String,
      until: String,
    },

    is_free_cancellable: {
      type: Boolean,
      default: false,
    },
    is_no_prepayment_block: {
      type: Boolean,
      default: false,
    },
    cc_required: {
      type: Boolean,
      default: true,
    },

    room: {
      type: {
        type: String,
        required: true,
      },
      all_inclusive_price: {
        type: Number,
        required: true,
      },
      gross_price: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        required: true,
      },
      capacity: {
        type: Number,
        required: true,
      },
      total_rooms: {
        type: Number,
        required: true,
      },
    },

    hall: {
      type: {
        type: String,
      },
      all_inclusive_price: Number,
      gross_price: Number,
      currency: String,
      capacity: Number,
      total_halls: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
