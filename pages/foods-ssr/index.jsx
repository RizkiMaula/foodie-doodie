import axios from 'axios';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const token = getCookie('token', context);

  try {
    if (!token) {
      throw new Error('Token not found'); // ga ada token langsung ke catch (karena pakai throw new Error)
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
    <div className="flex flex-col items-center justify-center gap-4 text-2xl">
      <h1>Halaman SSR</h1>

      <Link href="/">halaman awal</Link>

      {isError && <p>Error fetching foods : {errorMessage}</p>}

      <div className="grid w-full grid-cols-4 gap-4 px-5 ">
        {foods.map((food, index) => (
          <div
            key={food.id}
            className="border-4 border-white rounded-2xl w-[15rem] h-[24rem] flex flex-col items-center text-center justify-center gap-4"
          >
            <h1 className="text-2xl">
              {index + 1}. {food.name}
            </h1>
            <img
              src={food.imageUrl}
              alt={food.name}
              className="w-[60%] h-[50%]"
            />
            <p className="text-xl">{food.description}</p>
            <Link
              href={`/foods-ssr/${food.id}`}
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

export default CobaFoodSsr2;
