import React, { useEffect, useState } from 'react'
import InventoryApi from '../../api/InventoryApi';
import { useNavigate, useParams } from 'react-router-dom';

const InventoryForm = () => {
const { id } = useParams();
const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    description: "",
});
const [loading, setLoading] = useState(false); // Loading state added
const [message, setMessage] = useState("");
const [fetchData, setFetchingData] = useState(false);

useEffect(() => {
    if(id){
        getInventory(id);
    }
}, [id]);

const handleChange = (e) => {
    const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
};

const getInventory = async (id) => {
    setFetchingData(true);
    const res = await InventoryApi.show(id);
    if(res.success){
        setFetchingData(false);
        setState(res.data.data);
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    id ? (state.id = id) : "";
    const res = await InventoryApi.save(state);
    if (res.success) {
        setMessage(res.data.message);
        navigate('/inventory');
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
        {!fetchData ?
        <section className="max-w-7xl p-6 mx-auto">
        <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-2'>
                <div>
                    <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">{id ? 'Edit' : 'Add'}  Category</h2>
                </div>
                <div className="flex justify-end">
                    <button type='submit' className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                    {loading ? 'Submiting...' : 'Submit'} 
                    </button>
                </div>
            </div>
                <div className="grid grid-cols-1 gap-6 mt-4 ">
                    <div className="">
                        <label className="text-gray-700 dark:text-gray-200" for="name">Name</label>
                        <input id="name" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        name="name" value={state.name} onChange={handleChange} required/>
                    </div>
                    <div className="">
                        <label className="text-gray-700 dark:text-gray-200" for="">Description</label>
                        <textarea id="description" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        name="description" value={state.description} onChange={handleChange} />
                    </div>
                </div>
            </form>
        </section>
        : <div className='m-auto'><p className='text-2xl text-bold text-center'>Loading...</p> </div>}
    </div>
  )
}

export default InventoryForm