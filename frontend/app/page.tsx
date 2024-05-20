'use client';
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import logo from '../public/Connection.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    user: '',
    pass: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.user) newErrors.user = 'Username is required';
    if (!formData.pass) newErrors.pass = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess('');
    } else {
      setErrors({});
      try {
        const params = new URLSearchParams();
        params.append('username', formData.user);
        params.append('password', formData.pass);

        const response = await axios.post(
          'http://127.0.0.1:8000/login/',
          params
        );
        if (
          response.status === 200 &&
          response.data.message === 'Login successfully!'
        ) {
          setSuccess('Login successfully!');
          localStorage.setItem('User', formData.user);
          setFormData({
            user: '',
            pass: '',
          });
          Router.push('/home');
        } else {
          setErrors({ form: response.data.message });
          setSuccess('');
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setErrors({ form: error.response.data.message });
          setSuccess('');
        } else {
          setErrors({
            form: 'There was an error submitting the form. Please try again.',
          });
          setSuccess('');
        }
      }
    }
  };

  return (
    <>
      <div className="bg-[--bg] py-24 h-[100vh]">
        <div className="md:w-[50%] lg:w-[30%] mx-auto rounded-3xl overflow-hidden shadow-2xl border-t-4 border-black shadow-black bg-white h-auto">
          <div className="w-full bg-[--green] flex">
            <Image
              className="mx-auto"
              width={150}
              alt="Connection Logo"
              src={logo}
            />
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="md:px-5 lg:px-10 py-3 space-y-2">
                <label
                  className="text-[--dark-green] font-sans text-xl font-semibold"
                  htmlFor="user"
                >
                  Username:
                </label>
                <input
                  className="px-3 text-[--dark-green] border-2 border-[--dark-green] w-full h-10 rounded-lg"
                  placeholder="username"
                  type="text"
                  id="user"
                  name="user"
                  value={formData.user}
                  onChange={handleChange}
                />
                {errors.user && <p className="text-red-500">{errors.user}</p>}
              </div>
              <div className="md:px-5 lg:px-10 py-3 space-y-2">
                <label
                  className="text-[--dark-green] font-sans text-xl font-semibold"
                  htmlFor="pass"
                >
                  Password:
                </label>
                <input
                  className="px-3 text-[--dark-green] border-2 border-[--dark-green] w-full h-10 rounded-lg"
                  placeholder="password"
                  type="password"
                  id="pass"
                  name="pass"
                  value={formData.pass}
                  onChange={handleChange}
                />
                {errors.pass && <p className="text-red-500">{errors.pass}</p>}
                {errors.form && <p className="text-red-500">{errors.form}</p>}
                <div className="pt-7">
                  <button
                    className="mx-auto py-4 text-white text-xl font-semibold rounded-xl w-full bg-[--green]"
                    type="submit"
                  >
                    Log in
                  </button>
                </div>
                {success && (
                  <p className="text-center py-2 text-green-500">{success}</p>
                )}
                <p className="text-center py-2">
                  Not a member?{' '}
                  <Link href={'/signup'} className="text-[--dark-green]">
                    <u>Sign up now</u>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
