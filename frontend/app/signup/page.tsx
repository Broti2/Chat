'use client';
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import logo from '../../public/Connection.png';
import Link from 'next/link';

import { useRouter } from 'next/navigation';

export default function Signup() {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    user: '',
    gmail: '',
    pass: '',
    cpass: ''
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
    if (!formData.gmail) newErrors.gmail = 'Gmail is required';
    if (!formData.pass) newErrors.pass = 'Password is required';
    if (formData.pass !== formData.cpass) newErrors.cpass = 'Passwords do not match';
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
        const response = await axios.post('http://127.0.0.1:8000/signup/', new URLSearchParams({
          user: formData.user,
          gmail: formData.gmail,
          password: formData.pass,
        }));
        if (response.status === 201) {
          setSuccess('Account created successfully!');
          // Optionally, handle response data or redirect user
          setFormData({
            user: '',
            gmail: '',
            pass: '',
            cpass: ''
          });
          console.log(response);
          Router.push('/')
        }
      } catch (error) {
        console.error('There was an error submitting the form:', error);
        setSuccess('There was an error submitting the form. Please try again.');
      }
    }
  };
  return (
    <>
      <div className="bg-[--bg] py-16 h-[100vh]">
        <div className="md:w-[50%] lg:w-[30%] mx-auto rounded-3xl overflow-hidden shadow-2xl border-t-4 border-black shadow-black bg-white h-auto">
          <div className="w-full bg-[--green] flex">
            <Image className="mx-auto" width={150} alt="" src={logo} />
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="md:px-5 lg:px-10 py-1">
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
              <div className="md:px-5 lg:px-10 py-1">
                <label
                  className="text-[--dark-green] font-sans text-xl font-semibold"
                  htmlFor="gmail"
                >
                  Gmail:
                </label>
                <input
                  className="px-3 text-[--dark-green] border-2 border-[--dark-green] w-full h-10 rounded-lg"
                  placeholder="example@gmail.com"
                  type="email"
                  id="gmail"
                  name="gmail"
                  value={formData.gmail}
                  onChange={handleChange}
                />
                {errors.gmail && <p className="text-red-500">{errors.gmail}</p>}
              </div>
              <div className="md:px-5 lg:px-10 py-1">
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
              </div>
              <div className="md:px-5 lg:px-10 py-1">
                <label
                  className="text-[--dark-green] font-sans text-xl font-semibold"
                  htmlFor="cpass"
                >
                  Confirm Password:
                </label>
                <input
                  className="px-3 text-[--dark-green] border-2 border-[--dark-green] w-full h-10 rounded-lg"
                  placeholder="password"
                  type="password"
                  id="cpass"
                  name="cpass"
                  value={formData.cpass}
                  onChange={handleChange}
                />
                {errors.cpass && <p className="text-red-500">{errors.cpass}</p>}
              </div>
              <div className="md:px-5 lg:px-10 pt-5">
                <button
                  className="mx-auto py-4 text-white text-xl font-semibold rounded-xl w-full bg-[--green]"
                  type="submit"
                >
                  Sign up
                </button>
              </div>
              {success && (
                <p className="text-green-500 text-center py-2">{success}</p>
              )}
              <p className="text-center py-5">
                Not a member?{' '}
                <Link href={'/'} className="text-[--dark-green]">
                  <u>Log in</u>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
