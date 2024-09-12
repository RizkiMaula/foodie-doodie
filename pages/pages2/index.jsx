import Link from 'next/link';
import axios from 'axios';
import { getCookie } from 'cookies-next';

export async function getServerSideProps() {
  const res = await axios.get('https://jsonplaceholder.typicode.com/todos').catch((error) => {
    console.log(error);
  });

  return {
    props: {
      todos: res?.data,
    },
  };
}

const FoodPage2 = ({ todos = [] }) => {
  return (
    <div>
      <h1>Halaman 2</h1>
      {todos.map((todo, index) => (
        <div key={todo.id}>
          <Link href={`/pages2/${todo.id}`}>
            {index + 1}. {todo.title}
          </Link>
        </div>
      ))}
      <br />
    </div>
  );
};

export default FoodPage2;
