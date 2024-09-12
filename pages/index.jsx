import Image from 'next/image';
import localFont from 'next/font/local';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const token = getCookie('token');

  useEffect(() => {
    if (token === undefined || token === '') {
      router.push('/login');
    }
  }, [token]);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen py-2 gap-4 text-4xl`}>
      <Link href="/foods">Foods pake CSR</Link>
      <Link href="/foods-ssr">Foods pake SSR</Link>
    </div>
  );
}
