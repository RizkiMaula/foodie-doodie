'use client'; // tanda buat client side redering. kalo engga defaultnya ssr
import { getCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AppWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const token = getCookie('token');
  const pathnameNotAuthorize = ['/login'];

  useEffect(() => {
    console.log({ pathname, token });
    if (!token) {
      if (!pathnameNotAuthorize.includes(pathname)) {
        router.push('/login');
      }
    }
  }, []);

  return <div>{children}</div>;
}

// cannot run lah

// middleware better

// i know how to use react router dom
