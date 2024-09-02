'use client';
import AuthApi from '@/app/api/AuthApi';
import { useAuth } from '@/app/context/UserContext';
import Link from 'next/link';
import React, { useState } from 'react'

const Login = () => {
// const navigate = useNavigate();
const { setUser } = useAuth();
const [state, setState] = useState({
    email: "",
    password: "",
});
const [loading, setLoading] = useState(false); // Loading state added
const [message, setMessage] = useState("");
const [error, setError] = useState("");

const handleChange = (e) => {
    const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    const res = await AuthApi.login(state);
    console.log('data', res.errors);
    if (res.success) {
        setMessage(res.data.message);
        setUser(res.data.data);
        redirect('/inventories');
    }else if (res.errors){
        setError(res.errors.message)
    }
    setLoading(false); 
};

  return (
    <div>
        {message && 
            <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                <p className="font-bold">{message}</p>
            </div>
        }
        {error && 
            <div className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3" role="alert">
                <p className="font-bold">{error}</p>
            </div>
        }
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Login Form with Floating Labels</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <form onSubmit={handleSubmit} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" onChange={handleChange} required/>
                                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                </div>
                                <div className="relative">
                                    <input autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" onChange={handleChange} required/>
                                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                </div>
                                <div className='flex justify-between'>
                                    <div className="relative">
                                        <button className="bg-blue-500 text-white rounded-md px-2 py-1">{loading ? 'Submitting...' : 'Submit'}</button>
                                    </div>
                                    <Link href='/register' className="text-blue-500">Register</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login