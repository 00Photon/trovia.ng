"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface Product {
  title: string;
  category: string;
  location: string;
  price: string;
  description: string;
  image?: string;
  createdAt: Date;
}

interface ProductCardProps {
  title: string;
  category: string;
  location: string;
  price: string;
  image?: string;
  isNew: boolean;
  onViewDetails: () => void;
  onBuyNow: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, category, location, price, image, isNew, onViewDetails, onBuyNow }) => {
  return (
    <div className="bg-teal-800 rounded-2xl p-6 text-white flex flex-col transform hover:scale-105 transition-transform duration-300 shadow-lg relative">
      {isNew && (
        <span className="absolute top-2 right-2 bg-yellow-300 text-gray-900 text-xs font-semibold px-2 py-1 rounded-full">
          New
        </span>
      )}
      <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden mb-4">
        {image ? (
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-lg mt-4"
          />
        ) : (
          <div className="w-full h-full bg-teal-700 flex items-center justify-center rounded-lg">
            <span className="text-teal-200">No Image</span>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center text-center mb-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-teal-200 text-sm mb-1">{category}</p>
        <p className="text-teal-200 text-sm flex items-center gap-1 mb-1">
          <span className="text-yellow-300">📍</span> {location}
        </p>
        <p className="text-teal-200 text-sm font-semibold">{price}</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onViewDetails}
          className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors text-sm flex-1"
        >
          View Details
        </button>
        <button
          onClick={onBuyNow}
          className="bg-black hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm flex-1"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

interface PostProductFormProps {
  onClose: () => void;
  onSubmit: (data: { user: { name: string; email: string; phone: string }; product: Product; image?: File }) => void;
}

const PostProductForm: React.FC<PostProductFormProps> = ({ onClose, onSubmit }) => {
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' });
  const [productData, setProductData] = useState({
    title: '',
    category: '',
    location: '',
    price: '',
    description: '',
  });
  const [image, setImage] = useState<File | null>(null);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      user: userData,
      product: { ...productData, createdAt: new Date() },
      image: image || undefined,
    });
    setUserData({ name: '', email: '', phone: '' });
    setProductData({ title: '', category: '', location: '', price: '', description: '' });
    setImage(null);
    onClose();
  };

  return (
    <div className="bg-teal-800 text-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Post a Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Your Information</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleUserChange}
              className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="e.g., John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleUserChange}
              className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="e.g., john.doe@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleUserChange}
              className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="e.g., +234 123 456 7890"
              required
            />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Product Details</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Product Title</label>
            <input
              type="text"
              name="title"
              value={productData.title}
              onChange={handleProductChange}
              className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="e.g., Handmade Dress"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={productData.category}
              onChange={handleProductChange}
              className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            >
              <option value="">Select Category</option>
              <option value="fashion">Fashion</option>
              <option value="hospitality">Hospitality</option>
              <option value="sales">Sales and Marketing</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={productData.location}
              onChange={handleProductChange}
              className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="e.g., Lagos"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="text"
              name="price"
              value={productData.price}
              onChange={handleProductChange}
              className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="e.g., ₦50,000"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleProductChange}
              className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300 h-32 resize-none"
              placeholder="Describe the product..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Product Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Post Product
          </button>
        </div>
      </form>
    </div>
  );
};

interface BuyNowFormProps {
  productTitle: string;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; shippingAddress: string; paymentMethod: string }) => void;
}

const BuyNowForm: React.FC<BuyNowFormProps> = ({ productTitle, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    shippingAddress: '',
    paymentMethod: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', shippingAddress: '', paymentMethod: '' });
    onClose();
  };

  return (
    <div className="bg-teal-800 text-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Buy: {productTitle}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="e.g., John Doe"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="e.g., john.doe@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Shipping Address</label>
          <textarea
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChange}
            className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300 h-24 resize-none"
            placeholder="e.g., 123 Main St, Lagos"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            required
          >
            <option value="">Select Payment Method</option>
            <option value="card">Credit/Debit Card</option>
            <option value="bank">Bank Transfer</option>
            <option value="mobile">Mobile Money</option>
          </select>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Confirm Purchase
          </button>
        </div>
      </form>
    </div>
  );
};

const Marketplace: React.FC = () => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isPostProductModalOpen, setIsPostProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const products: Product[] = [
    {
      title: 'Handmade Dress',
      category: 'Fashion',
      location: 'Lagos',
      price: '₦50,000',
      description: 'A beautifully crafted handmade dress with intricate patterns.',
      image: '/img-1.jpg',
      createdAt: new Date('2025-05-30'),
    },
    {
      title: 'Luxury Dinner Set',
      category: 'Hospitality',
      location: 'Port Harcourt',
      price: '₦80,000',
      description: 'A premium dinner set for luxury dining experiences.',
      image: '/img-2.jpg',
      createdAt: new Date('2025-05-28'),
    },
    {
      title: 'Marketing Guide Book',
      category: 'Sales and Marketing',
      location: 'Agege',
      price: '₦20,000',
      description: 'A comprehensive guide to modern marketing strategies.',
      createdAt: new Date('2025-05-25'),
      image: '/img-3.jpg',
    },
    {
      title: 'Custom Necklace',
      category: 'Fashion',
      location: 'Ikotun',
      price: '₦30,000',
      description: 'A custom-made necklace with personalized design.',
      image: '/img-4.jpg',
      createdAt: new Date('2025-05-29'),
    },
    {
      title: 'Sales Training Kit',
      category: 'Sales and Marketing',
      location: 'Lagos',
      price: '₦45,000',
      description: 'A training kit for sales professionals to boost performance.',
      image: '/img-5.jpg',
      createdAt: new Date('2025-05-27'),
    },
  ];

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = category ? product.category.toLowerCase().includes(category.toLowerCase()) : true;
      const matchesLocation = location ? product.location.toLowerCase().includes(location.toLowerCase()) : true;
      const matchesSearch = searchQuery
        ? product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesLocation && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price') {
        return parseFloat(a.price.replace('₦', '').replace(',', '')) - parseFloat(b.price.replace('₦', '').replace(',', ''));
      }
      return b.createdAt.getTime() - a.createdAt.getTime(); // Default: newest
    });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handleViewDetails = (title: string) => {
    setSelectedProduct(title);
    setIsDetailsModalOpen(true);
  };

  const handleBuyNow = (title: string) => {
    setSelectedProduct(title);
    setIsBuyModalOpen(true);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePostProductSubmit = (data: { user: { name: string; email: string; phone: string }; product: Product; image?: File }) => {
    console.log('Product Posted:', data);
    alert('Product posted successfully!');
  };

  const handleBuySubmit = (data: { name: string; email: string; shippingAddress: string; paymentMethod: string }) => {
    console.log(`Purchase of ${selectedProduct}:`, data);
    alert(`Purchase of ${selectedProduct} confirmed!`);
  };

  return (
    <section className="bg-gray-50 py-16 min-h-screen">
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .carousel {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }
        .carousel-item {
          flex: 0 0 auto;
          scroll-snap-align: start;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-teal-800 mb-4">Marketplace</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Discover unique products from local sellers, from fashion to hospitality essentials.
            </p>
          </div>
          <button
            onClick={() => setIsPostProductModalOpen(true)}
            className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors shadow-md mt-4 md:mt-0"
          >
            Post a Product
          </button>
        </div>

        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full md:w-1/4 bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              <option value="">Select Category</option>
              <option value="fashion">Fashion</option>
              <option value="hospitality">Hospitality</option>
              <option value="sales">Sales and Marketing</option>
            </select>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full md:w-1/4 bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              <option value="">Select Location</option>
              <option value="Agege">Agege</option>
              <option value="Lagos">Lagos</option>
              <option value="Ikotun">Ikotun</option>
              <option value="Port Harcourt">Port Harcourt</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-1/4 bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              <option value="newest">Sort by: Newest</option>
              <option value="price">Sort by: Price (Low to High)</option>
            </select>
          </div>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by title or category..."
              className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <button className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded-lg transition-colors shadow-md">
              Search
            </button>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-teal-800 mb-4">Featured Products</h2>
          <div className="carousel gap-4 pb-4">
            {products.slice(0, 3).map((product) => (
              <div key={product.title} className="carousel-item w-64">
                <ProductCard
                  title={product.title}
                  category={product.category}
                  location={product.location}
                  price={product.price}
                  image={product.image}
                  isNew={product.createdAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)}
                  onViewDetails={() => handleViewDetails(product.title)}
                  onBuyNow={() => handleBuyNow(product.title)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <ProductCard
                key={product.title}
                title={product.title}
                category={product.category}
                location={product.location}
                price={product.price}
                image={product.image}
                isNew={product.createdAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)}
                onViewDetails={() => handleViewDetails(product.title)}
                onBuyNow={() => handleBuyNow(product.title)}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-1 sm:col-span-2 lg:col-span-3">No products found matching your criteria.</p>
          )}
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors shadow-md ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors shadow-md ${
              currentPage === totalPages || totalPages === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Next
          </button>
        </div>

        {isDetailsModalOpen && (
          <div className="fixed inset-0 bg-teal-900 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-teal-800 text-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl animate-fade-in">
              <h2 className="text-2xl font-bold mb-4">Product Details: {selectedProduct}</h2>
              <p className="text-teal-200 mb-6">{products.find((product) => product.title === selectedProduct)?.description}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {isBuyModalOpen && selectedProduct && (
          <div className="fixed inset-0 bg-teal-900 bg-opacity-75 flex items-center justify-center z-50">
            <BuyNowForm
              productTitle={selectedProduct}
              onClose={() => setIsBuyModalOpen(false)}
              onSubmit={handleBuySubmit}
            />
          </div>
        )}

        {isPostProductModalOpen && (
          <div className="fixed inset-0 bg-teal-900 bg-opacity-75 flex items-center justify-center z-50">
            <PostProductForm
              onClose={() => setIsPostProductModalOpen(false)}
              onSubmit={handlePostProductSubmit}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Marketplace;