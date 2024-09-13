import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';

const FoodDetailsPage = () => {
  const router = useRouter();

  // fetcher for fetching a single food
  const fetcher = async () => {
    const res = await axios
      .get(`https://api-bootcamp.do.dibimbing.id/api/v1/foods/${router?.query?.foodDetails}`, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
          'Content-Type': 'application/json',
          apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
        },
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(res?.data?.data);
    return res?.data?.data;
  };

  const { data, error } = useSWR('users', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>loading...</div>;

  const date = new Date(data.createdAt);
  const formattedDateDitambah = date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedDateDiubah = date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-2xl">
      <h1>Halaman food details: {data.name}</h1>
      <div className="flex flex-col items-center justify-center gap-4 p-8 border-4 border-white rounded-xl">
        <h1>{data.name}</h1>
        <img
          src={data.imageUrl}
          alt={data.name}
          className="w-96 h-96"
        />
        <p>{data.description}</p>

        <div>
          <p>Tanggal Ditambah: {formattedDateDitambah}</p>
          <p>Tanggal Diubah: {formattedDateDiubah}</p>
        </div>
        <Link href="/foods">Back</Link>
      </div>
    </div>
  );
};

export default FoodDetailsPage;
