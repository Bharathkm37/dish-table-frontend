"use client"

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';


import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    // await supabase.auth.signOut();
    setUser(null);
    router.push('/login');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.email}</h1>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <h1>Please login or sign up to access this page</h1>
      )}
    </div>
  );
}
