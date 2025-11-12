import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const AddListing = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    location: '',
    description: '',
    image: '',
    date: '',
    email: user?.email || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.image) {
      toast.error('Please fill in all required fields!');
      return;
    }

    const productData = {
      ...formData,
      price: formData.category === 'Pets' ? 0 : Number(formData.price),
      email: user?.email,
      date: new Date(formData.date),
    };

    try {
      const res = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error('Failed to add product');

      toast.success('Listing added successfully 🎉');
      setFormData({
        name: '',
        category: '',
        price: '',
        location: '',
        description: '',
        image: '',
        date: '',
        email: user?.email || '',
      });

    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-5">
      <h2 className="text-4xl font-bold text-center mb-10">
        Add New Listing (Adoption or Product)
      </h2>

      <form
        onSubmit={handleSubmit}
        className="card bg-base-100 shadow-2xl max-w-6xl mx-auto p-8 grid md:grid-cols-2 gap-8"
      >
        {/* LEFT SIDE */}
        <div className="space-y-3">
          <label className="label">Product / Pet Name</label>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label className="label">Category</label>
          <select
            name="category"
            className="select select-bordered w-full"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Pets">Pets</option>
            <option value="Food">Food</option>
            <option value="Accessories">Accessories</option>
            <option value="Care Products">Care Products</option>
          </select>

          {formData.category !== 'Pets' && (
            <>
              <label className="label">Price</label>
              <input
                type="number"
                name="price"
                className="input input-bordered w-full"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </>
          )}

          <label className="label">Location</label>
          <input
            type="text"
            name="location"
            className="input input-bordered w-full"
            value={formData.location}
            onChange={handleChange}
          />

          <label className="label">Pick Up Date</label>
          <input
            type="date"
            name="date"
            className="input input-bordered w-full"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-3">
          <label className="label">Description</label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full h-32"
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          <label className="label">Image URL</label>
          <input
            type="text"
            name="image"
            className="input input-bordered w-full"
            value={formData.image}
            onChange={handleChange}
            required
          />

          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full"
            value={user?.email || ''}
            readOnly
          />

          <button className="btn btn-neutral mt-5 w-full">
            Add Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddListing;
