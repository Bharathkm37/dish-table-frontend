'use client';

import { ReactNode, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';


export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <html lang="en">
      <head />
      <body>
        <header>
          <nav>
            <ul>
              <li><Link href="/signup">Sign Up</Link></li>
              <li><Link href="/login">Login</Link></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2024 My Application</p>
        </footer>
      </body>
    </html>
  );
}
