import { errorHandler } from "../Utils/error.js";
import Listing from "../models/listing.model.js";
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Warning ! Listing not Found"));
  } // Not found

  if (req.user.id !== listing.userRef) {
    return next(
      errorHandler(401, "Warning ! You can only Delete your own listing")
    );
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(201).json("Listing has been deleted");
  } catch (error) {
    next(error);
  }
};
