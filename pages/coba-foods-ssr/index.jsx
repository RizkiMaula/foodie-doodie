import axios from 'axios';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export async function getServerSideProps(context) {
  const token = getCookie('token', context);

  try {
    if (!token) {
      throw new Error('Token not found'); // ga ada token langsung ke catch (kareba pakau throw new Error)
    }

    const response = await axios.get('https://api-bootcamp.do.dibimbing.id/api/v1/foods', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
      },
    });

    return {
      props: {
        foods: response.data.data,
      },
    };
  } catch (error) {
    console.error('Error fetching foods:', error);
    return {
      // notFound: true, // Uncomment this line to trigger the 404 page
      props: {
        foods: [],
        isError: true,
        errorMessage: error?.message || '',
      },
    };
  }
}

const CobaFoodSsr2 = ({ foods, isError, errorMessage = '' }) => {
  const router = useRouter();
  // const token = getCookie('token');

  return (
    <div>
      <h1>Halaman 2</h1>
      <br />

      <Link href="/">halaman awal</Link>
      <br />

      {isError && <p>Error fetching foods : {errorMessage}</p>}

      {foods.map((food, index) => (
        <div key={food.id}>
          <h1>
            {index + 1}. {food.name}
          </h1>
          <img
            src={food.imageUrl}
            alt={food.name}
            className="w-96 h-96"
          />
          <br />
          <p>{food.description}</p>
          <br />
          <Link href={`/coba-foods-ssr/${food.id}`}>See Details</Link>
        </div>
      ))}
    </div>
  );
};

export default CobaFoodSsr2;
