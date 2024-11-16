import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();
  const { phone, otp, password } = req.body;

  const user = await User.findOne({ phone });

  if (!user) return res.status(400).json({ error: 'User not found' });

  if (otp) {
    if (user.otp !== otp || user.otpExpiresAt < new Date()) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
  } else if (password) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
  } else {
    return res.status(400).json({ error: 'Invalid login method' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600`);
  res.status(200).json({ message: 'Login successful' });
}
