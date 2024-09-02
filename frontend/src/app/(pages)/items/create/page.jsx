"use client"; 
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import InventoryApi from '@/app/api/InventoryApi';
import ItemApi from '@/app/api/ItemApi';


const ItemForm = () => {
    const router = useRouter();
    const { id } = router.query;
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchingItem, setFetchingItem] = useState(false);
    const [message, setMessage] = useState("");
    const [state, setState] = useState({
        name: "",
        description: "",
        inventory_id: "",
        quantity: "",
        image: "",
        previewImage: null, 
    });

    useEffect(() => {
        getInventory();
    }, []);

    useEffect(() => {
        if (id) {
            getItem(id);
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "image") {
            const file = e.target.files[0];
            setState({
                ...state,
                image: file,
                previewImage: URL.createObjectURL(file)
            });
        } else {
            setState({
                ...state,
                [name]: value,
            });
        }
    };

    const getItem = async (id) => {
        setFetchingItem(true);
        const res = await ItemApi.show(id);
        if (res.success) {
            setState(res.data.data);
        }
        setFetchingItem(false);
    };

    const getInventory = async () => {
        const res = await InventoryApi.index();
        if (res.success) {
            setInventory(res.data.data);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (id) state.id = id;

        let formData = new FormData(); 
        Object.keys(state).forEach((key) => {
            formData.append(key, state[key]);
        });

        const res = await ItemApi.save(formData);
        if (res.success) {
            setMessage(res.data.message);
            router.push('/item'); // Navigate to '/item'
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
            {!fetchingItem ? (
                <section className="max-w-7xl p-6 mx-auto rounded-md">
                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-2'>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">{id ? 'Edit' : 'Add'} Item</h2>
                            </div>
                            <div className="flex justify-end">
                                <button type='submit' className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-6">
                            <div className="w-7/12 gap-4">
                                <div>
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="name">Name</label>
                                    <input id="name" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" name="name"
                                        value={state.name} onChange={handleChange} required />
                                </div>

                                <div className="mt-2">
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="description">Description</label>
                                    <textarea id="description" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" name="description"
                                        value={state.description} onChange={handleChange} />
                                </div>
                                <div className="mt-2">
                                    <label className="text-gray-700 dark:text-gray-200">
                                        Image
                                    </label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-700 dark:text-gray-200" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div className="flex text-sm text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="image" accept='image/*' type="file" className="sr-only" onChange={handleChange} />
                                                </label>
                                                <p className="pl-1 text-gray-700 dark:text-gray-200">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-700 dark:text-gray-200">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {state.previewImage || state.image ? <img src={state.previewImage || state.image} alt="Preview" className="h-32 mt-2 w-auto mx-auto" />
                                    : ''}
                            </div>
                            <div className="w-5/12 gap-4">
                                <div>
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="inventory_id">Inventory</label>
                                    <select
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                        id="inventory_id"
                                        name="inventory_id"
                                        value={state.inventory_id}
                                        onChange={handleChange}
                                    >
                                        <option value="">--Select Inventory--</option>
                                        {inventory?.map((inv) => (
                                            <option key={inv.id} value={inv.id}>
                                                {inv.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mt-2'>
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="quantity">Quantity</label>
                                    <input id="quantity" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" name="quantity"
                                        value={state.quantity} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            ) : (
                <div className='m-auto'>
                    <p className='text-2xl text-bold text-center'>Loading...</p>
                </div>
            )}
        </div>
    )
}

export default ItemForm;
