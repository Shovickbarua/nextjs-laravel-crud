"use client";  // Add this line at the top of your file
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import ItemApi from '@/app/api/ItemApi';

const Items = () => {
  const [state, setState] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    const res = await ItemApi.index();
    if (res.success) {
      setState(res.data.data);
    }
  };

  const itemDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      const res = await ItemApi.delete(id);
      if (res.success) {
        setMessage(res.data.message);
        getItem(); // Refresh the items list after deletion
      }
    }
  };

  return (
    <div>
      {message && 
        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
          <p className="font-bold">{message}</p>
        </div>
      }
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex justify-between ">
          <div className="text-lg text-gray-500">
            <h1>All Items</h1>
          </div>
          <div>
            <Link href="/" passHref>
              <button className="mr-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-4">
                Inventory                    
              </button>
            </Link>
            <Link href="/add-item" passHref>
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-4">
                Add
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                          <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                        </div>
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Name
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Inventory
                      </th>
                      <th scope="col" className="p-4">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {state.map((item, index) => (
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700" key={index}>
                        <td className="p-4 w-4">
                          <div className="flex items-center">
                            <input id={`checkbox-table-${index}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor={`checkbox-table-${index}`} className="sr-only">checkbox</label>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center">
                            <img src={item.image} alt={item.name} className="h-14 w-20 object-fill rounded" />
                            <span className='ml-2'>{item.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"> {item?.inventory?.name}</td>
                        <td className="py-8 px-6 text-sm font-medium float-right whitespace-nowrap flex my-auto">
                          <Link href={`/edit-item/${item.id}`} passHref>
                            <a className="text-blue-600 dark:text-blue-500 hover:underline text-2xl"><FaEdit/></a>
                          </Link>
                          <button onClick={() => itemDelete(item.id)} className="ml-2 text-blue-600 dark:text-blue-500 hover:underline text-2xl"><MdDelete /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;
