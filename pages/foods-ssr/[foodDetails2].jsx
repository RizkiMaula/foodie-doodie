import Link from 'next/link';
import axios from 'axios';
import { getCookie } from 'cookies-next';

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
  const date = new Date(food.createdAt);
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
    <div className="flex flex-col items-center justify-center gap-4 m-4 text-2xl">
      <h1>Halaman foood details 2: {food.name}</h1>

      <div className="flex flex-col items-center justify-center gap-4 border-4 border-white rounded-xl">
        <h1>{food.name}</h1>
        <img
          src={food.imageUrl}
          alt={food.name}
          className="w-96 h-96"
        />
        <p>{food.description}</p>
        <div className="flex gap-2">
          <h1>Ingredients: </h1>
          {food.ingredients.map((ingredient, index) => (
            <p key={index}>{ingredient}</p>
          ))}
        </div>
        <div>
          <p>Tanggal Ditambah: {formattedDateDitambah}</p>
          <p>Tanggal Diubah: {formattedDateDiubah}</p>
        </div>
        <Link href="/foods-ssr">kembali</Link>
      </div>
    </div>
  );
};

export default foodDetails2;
