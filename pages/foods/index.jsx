import axios from 'axios';
import { getCookie } from 'cookies-next';
import useSWR from 'swr';
import Link from 'next/link';
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
  const { data, error } = useSWR('users', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-2xl">
      {alert(
        'pada halaman jika ditekan tombol see details akan pergi ke halaman food details dan saat kembali ke halaman food list malah error dan jika di refresh malah berjalan seperti biasa. saya binggung disitu. tapi yang pake ssr tuh lancar. karena itu saya lebih prefer pakai SSR'
      )}

      <h1>Halaman CSR</h1>

      <Link href="/">halaman awal</Link>
      <div className="grid w-full grid-cols-2 gap-4 px-5 md:grid-cols-4">
        {data.map((user, index) => (
          <div
            key={user.id}
            className="flex flex-col items-center justify-center gap-4 p-4 text-center border-4 border-white rounded-2xl"
          >
            <h1 className="text-2xl">
              {index + 1}. {user.name}
            </h1>
            <img
              src={user.imageUrl}
              alt={user.name}
              className="w-[60%] h-[50%]"
            />
            <p className="text-xl">{user.description}</p>
            <Link
              href={`/foods/${user.id}`}
              className="text-xl hover:text-blue-500"
            >
              See Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Halaman1;
