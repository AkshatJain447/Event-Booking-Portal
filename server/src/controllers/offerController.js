import Offer from "../models/Offer.js";

export const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json({
      message: "Offers fetched successfully",
      offers,
    });
  } catch (error) {
    console.log("Error in fetching errors", error);
    res.status(500).json({
      message: "Error fetching offers",
    });
  }
};

export const createOffer = async (req, res) => {
  try {
    const newOffer = req.body;
    const offer = new Offer(newOffer);
    const response = await offer.save();
    res.status(201).json({
      message: "Offer created successfully",
      offer: response,
    });
  } catch (error) {
    console.log("Error create offer", error);
    res.status(500).json({
      message: "Error creating offer",
    });
  }
};
