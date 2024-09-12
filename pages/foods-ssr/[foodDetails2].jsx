import Link from 'next/link';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const token = getCookie('token', context);
  const foodId = context.query.foodDetails2;

  try {
    const response = await axios.get(`https://api-bootcamp.do.dibimbing.id/api/v1/foods/${foodId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
      },
    });

    return {
      props: {
        food: response.data.data,
      },
    };
  } catch (error) {
    console.error('Error fetching foods:', error);
    return {
      notFound: true,
    };
  }
}

const foodDetails2 = ({ food }) => {
  const router = useRouter();
  console.log(food);

  return (
    <div>
      <h1>Halaman foood details 2: {food.name}</h1>

      <h1>{food.name}</h1>
      <img
        src={food.imageUrl}
        alt={food.name}
        className="w-96 h-96"
      />
      <br />
      <p>{food.description}</p>
      <br />
      <Link href="/foods-ssr">kembali</Link>
    </div>
  );
};

export default foodDetails2;
