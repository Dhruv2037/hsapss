import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone, processStatus } = req.body;

  if (!phone || !processStatus) {
    return res.status(400).json({ error: "Phone number and process status are required" });
  }

  try {
    // Update user process status
    const user = await User.findOneAndUpdate(
      { phone },
      { processStatus },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Process status updated", user });
  } catch (error) {
    console.error("Error updating process status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
