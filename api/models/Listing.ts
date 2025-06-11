import mongoose, { Schema, Document, model } from "mongoose";

export interface IListing extends Document {
  title: string;
  description: string;
  images: string[];
  pricePerNight: number;
  availableFrom: Date;
  availableTo: Date;
  address: string;
  coordinates: [number, number];
  amenities?: string[];
  maxGuests: number;
  houseRules?: string;
  owner: mongoose.Types.ObjectId;
  propertyType: "house" | "apartment" | "room";
  country: string;
  isActive: boolean;
}

const ListingSchema = new Schema<IListing>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    pricePerNight: { type: Number, required: true },
    availableFrom: { type: Date, required: true },
    availableTo: { type: Date, required: true },
    address: { type: String, required: true },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: (val: number[]) => val.length === 2,
        message: "Coordinates must be an array of [latitude, longitude]",
      },
    },
    amenities: [{ type: String }],
    maxGuests: { type: Number, required: true },
    houseRules: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    propertyType: {
      type: String,
      enum: ["house", "apartment", "room"],
      required: true,
    },
    country: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const ListingModel = model<IListing>("Listing", ListingSchema);

export default ListingModel;
