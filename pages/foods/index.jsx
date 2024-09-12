import axios from 'axios';
import { getCookie } from 'cookies-next';
import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const fetcher = async () => {
  const res = await axios
    .get('https://api-bootcamp.do.dibimbing.id/api/v1/foods', {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
        'Content-Type': 'application/json',
        apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
      },
    })
    .catch((error) => {
      console.log(error);
    });

  return res?.data?.data;
};

const Halaman1 = () => {
  const router = useRouter();
  const token = getCookie('token');

  useEffect(() => {
    if (token === undefined || token === '') {
      router.push('/login');
    }
  }, [token]);

  const { data, error } = useSWR('users', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="text-2xl">
      <h1>Halaman 1</h1>
      <br />
      <Link href="/">halaman awal</Link>
      <br />
      {data.map((user, index) => (
        <div key={user.id}>
          <h1>
            {index + 1}. {user.name}
          </h1>
          <img
            src={user.imageUrl}
            alt={user.name}
            className="w-96 h-96"
          />
          <br />
          <p>{user.description}</p>
          <br />
          <Link href={`/foods/${user.id}`}>See Details</Link>
        </div>
      ))}
    </div>
  );
};

export default Halaman1;
