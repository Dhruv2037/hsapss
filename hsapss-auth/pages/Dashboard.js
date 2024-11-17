import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the token exists in the cookies
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    console.log("Token:", token);
    if (!token) {
      // If no token, redirect to sign-in page
      router.push('/signin');
    } else {
      // Simulate token verification (e.g., make an API request to verify the token)
      setLoading(false);
    }
  }, [router]);

  const handleClick = async () => {
    try {
      const response = await axios.post('/api/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        console.log('Logout successful');
        // Redirect to sign-in page after logout
        router.push('/signin');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default Dashboard;
