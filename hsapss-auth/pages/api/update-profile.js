import dbConnect from "../../lib/dbConnect";
import UserProfile from "../../models/UserProfile";
import UserProcess from '../../constants/UserProcess';
import User from "../../models/User";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone, firstname, lastname, email, street, postalCode, city, state, country } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "phone is required." });
  }

  try {
    // Find and update the UserProfile, or create a new one if it doesn't exist
    const user = await User.findOne({phone});
    if (!user || !user.verified) {
      return res.status(400).json({ error: 'User not verified' });
    }
    const userProfile = await UserProfile.findOneAndUpdate(
      { user: user._id },
      { firstname, lastname, email, street, postalCode, city, state, country },
      { new: true, upsert: true }
    );
    user.processStatus = UserProcess.COMPLETED ;
    user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    //res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600, SameSite=Lax; Secure`);
    res.setHeader('Set-Cookie', `token=${token}; Domain=localhost; Path=/; Max-Age=3600; SameSite=Lax`);
    res.status(200).json({ message: "Profile updated successfully.", userProfile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
