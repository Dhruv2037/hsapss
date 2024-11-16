import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
  await dbConnect();
  const { phone, password } = req.body;

  const user = await User.findOne({ phone });
  if (!user || !user.verified) {
    return res.status(400).json({ error: 'User not verified' });
  }

  user.password = password;
  await user.save();

  res.status(200).json({ message: 'Password set successfully' });
}
