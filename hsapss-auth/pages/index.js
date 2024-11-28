import Link from "next/link";
export default function Home() {
    return (
      <div>
        <h1>Welcome to the Homepage</h1>
        <p>This is the new homepage served from pages/index.js</p>
        <Link href="/register">Login</Link>
      </div>
    );
  }
  
