import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();
  const { phone, otp , isLogin } = req.body;

  const user = await User.findOne({ phone, otp });
  if (!user || user.otpExpiresAt < new Date()) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }
  if(isLogin && !user.verified)
    return res.status(400).json({ error: 'you are not registered' });
  user.verified = true;
  user.otp = undefined;
  user.otpExpiresAt = undefined;
  await user.save();

  if(isLogin)
  {

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    //res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600, SameSite=Lax; Secure`);
    res.setHeader('Set-Cookie', `token=${token}; Domain=localhost; Path=/; Max-Age=3600; SameSite=Lax`);
  }
  res.status(200).json({ message: 'OTP verified successfully' });
}
