import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useParams } from 'next/navigation';

const fetcher = async (foodId) => {
  const param = useParams();
  const res = await axios
    .get(`https://api-bootcamp.do.dibimbing.id/api/v1/foods/${foodId}`, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
        'Content-Type': 'application/json',
        apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
      },
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(res.data.data);
  // console.log(router.query.foodDetails);
  return res.data.data;
};

const FoodDetailsPage = () => {
  const { data, error } = useSWR('users', fetcher);
  const router = useRouter();

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <h1>Halaman food details: {router.query.foodDetails}</h1>
    </div>
  );
};

export default FoodDetailsPage;
