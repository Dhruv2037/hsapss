import dbConnect from '../../../lib/dbConnect'; // Ensure this connects to your MongoDB
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  await dbConnect();

  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ error: 'Phone and password are required' });
  }

  try {
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ error: 'Invalid phone or password' });
    }

    if (!user.verified) {
      return res.status(400).json({ error: 'User is not verified' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid phone or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the cookie
    res.setHeader('Set-Cookie', `token=${token}; Domain=localhost; Path=/; Max-Age=3600; SameSite=Lax`);

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
