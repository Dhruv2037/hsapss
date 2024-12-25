import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import UserProcess from '../../../constants/UserProcess';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();
  const { phone, password } = req.body;

  const user = await User.findOne({ phone });
  if (!user || !user.verified) {
    return res.status(400).json({ error: 'User not verified' });
  }

  user.password = password;
  user.processStatus = UserProcess.COMPLETE_PROFILE;
  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  //res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600, SameSite=Lax; Secure`);
  res.setHeader('Set-Cookie', `token=${token}; Domain=localhost; Path=/; Max-Age=3600; SameSite=Lax`);
  res.status(200).json({ message: 'Password set successfully' });
}
