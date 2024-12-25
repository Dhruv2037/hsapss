import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  street: { type: String },
  postalCode: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
});

export default mongoose.models.UserProfile ||
  mongoose.model("UserProfile", UserProfileSchema);
