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

  return (
    <div>
      <h1>Halaman food details: {router.query.foodDetails}</h1>
      <br />
      <h1>{data.name}</h1>
      <img
        src={data.imageUrl}
        alt={data.name}
        className="w-96 h-96"
      />
      <Link href="/foods">Back</Link>
    </div>
  );
};

export default FoodDetailsPage;
