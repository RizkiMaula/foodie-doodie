import axios from 'axios';
import useSWR from 'swr';

const fetcher = async () => {
  const res = await axios.get('https://api-bootcamp.do.dibimbing.id/api/v1/foods', {
    headers: {
      'Content-Type': 'application/json',
      apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
    },
  });
};

const Halaman1 = () => {
  const { data, error } = useSWR('users', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="text-2xl">
      <h1>Halaman 1</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Halaman1;
