'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import logo from '../../public/Connection.png';
import Image from 'next/image';
import axios from 'axios';
export default function page() {
  const Router = useRouter();
  const [username, setUsername] = useState('');
  const [message, setmessage] = useState('');
  const [allmsg, setmsg] = useState([]);
  const handelchange = (e) => {
    setmessage(e.target.value);
  };
  const msg = async () => {
    await axios.get('http://127.0.0.1:8000/msg/').then((res) => {
      setmsg(res.data);
    });
  };

  const submit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/add/', {
      name: username,
      content: message,
    });
    msg();
    setmessage('');
  };
  useEffect(() => {
    const User = localStorage.getItem('User');
    msg();
    if (User) {
      setUsername(User);
    } else {
      // If no remembered user, redirect to login page
      Router.push('/');
    }
  }, []);



  const handleLogout = () => {
    // Clear the remembered user from local storage
    localStorage.removeItem('User');
    // Redirect to the login page
    Router.push('/');
  };

  return (
    <div>
      <header className="w-full relative bg-[--green] flex justify-between">
        <Image width={150} alt="" src={logo} />{' '}
        <div className="py-10">
          <button
            className="w-36 h-16  bg-[--green] bg-opacity-5  text-[--dark-green] font-sans font-semibold text-2xl rounded-2xl"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </header>
      <div className=" w-full overflow-auto relative scrollbar-hide  py-5 px-2 space-y-4  h-[74vh] bg-slate-600">
        {allmsg.map((e) => (
          <div
            className={
              e.author_name === username
                ? 'text-white w-fit h-auto bg-[--green]  py-3 px-3 rounded-2xl  '
                : 'text-white w-fit h-auto bg-[--dark-green] py-3 px-3 rounded-2xl  '
            }
            key={e.id}
          >
            <p className="text-sm ">{e.author_name}</p>
            <p>{e.message_content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="flex relative py-1 bg-slate-600  px-2">
        <input
          onChange={handelchange}
          value={message}
          className="bg-gray-300 px-4 focus:outline-[--dark-green] text-red-500  w-[80vw] h-10 border-4 border-[--green] "
          type="text"
        />
        <button className="w-[17vw] bg-[--green]" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
