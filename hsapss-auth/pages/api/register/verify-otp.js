import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
  await dbConnect();
  const { phone, otp } = req.body;

  const user = await User.findOne({ phone, otp });
  if (!user || user.otpExpiresAt < new Date()) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  user.verified = true;
  user.otp = undefined;
  user.otpExpiresAt = undefined;
  await user.save();

  res.status(200).json({ message: 'OTP verified successfully' });
}
