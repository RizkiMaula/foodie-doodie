import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen py-2 gap-4 text-4xl`}>
      <Link href="/foods-ssr">Foods pake SSR</Link>
      <Link href="/foods">Foods pake CSR</Link>
    </div>
  );
}
