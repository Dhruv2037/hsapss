// pages/api/check-registration.js
import { serialize } from 'cookie';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
    await dbConnect();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  try {
    // Check the database for the user
    var isExistingUser = false;
    const user = await User.findOne({phone}); // Replace with your database query logic
    if(!user){
      return res.status(200).json({isExistingUser});
    }
    isExistingUser = Boolean(user.verified);

    if(!isExistingUser){
        return res.status(200).json({isExistingUser});
    }
    // Set an HTTP-only cookie with user details
    const cookie = serialize(
      'userSession',
      JSON.stringify({ phone, isExistingUser }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 15, // 15 minutes
        path: '/',
      }
    );

    res.setHeader('Set-Cookie', cookie);

    // Return the registration status
    res.status(200).json({ isExistingUser });
  } catch (error) {
    console.error('Error checking registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
