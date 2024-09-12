import Image from 'next/image';
import localFont from 'next/font/local';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import Link from 'next/link';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function Home() {
  const router = useRouter();
  const token = getCookie('token');

  useEffect(() => {
    if (token === undefined || token === '') {
      router.push('/login');
    }
  }, [token]);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}>
      <Link href="/foods">Foods pake CSR</Link>
      <Link href="/coba-foods-ssr">Foods pake SSR</Link>
    </div>
  );
}
