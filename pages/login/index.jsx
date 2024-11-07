import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async () => {
    const res = await axios
      .post(
        'https://api-bootcamp.do.dibimbing.id/api/v1/login',
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
          },
        }
      )
      .then((res) => {
        // console.log(res);
        const tokenValue = res?.data?.token;
        setCookie('token', tokenValue);

        router.push('/');
      })
      .catch((error) => {
        // console.log(error.message);
        alert(`Login Failed : ${error.message}`);
      });
  };

  useEffect(() => {
    if (getCookie('token')) {
      router.push('/');
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-10 border-2 border-white m-9">
      {alert('Username: miftahfarhan@gmail.com Password: qwerty123')}
      <h1 className="text-2xl">Login Page</h1>
      <input
        className="px-1 text-black "
        type="email"
        placeholder="username"
        onChange={handleEmailChange}
      />
      <input
        className="px-1 text-black "
        type="password"
        placeholder="Password"
        onChange={handlePasswordChange}
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default LoginPage;
