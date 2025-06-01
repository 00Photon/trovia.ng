"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface Artisan {
  name: string;
  title: string;
  image?: string;
  location: string;
  skills: string[];
  rating: number;
}

interface ArtisanCardProps {
  name: string;
  title: string;
  image?: string;
  location: string;
  rating: number;
  onViewProfile: () => void;
  onHire: () => void;
}

const ArtisanCard: React.FC<ArtisanCardProps> = ({ name, title, image, location, rating, onViewProfile, onHire }) => {
  const isTopRated = rating >= 4.5;
  return (
    <div className="bg-teal-800 rounded-2xl p-6 text-white flex flex-col transform hover:scale-105 transition-transform duration-300 shadow-lg relative">
      {isTopRated && (
        <span className="absolute top-2 right-2 bg-yellow-300 text-gray-900 text-xs font-semibold px-2 py-1 rounded-full">
          Top Rated
        </span>
      )}
      <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden mb-4">
        {image ? (
          <Image
            src={image}
            alt={name}
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
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-teal-200 text-sm mb-1">{title}</p>
        <p className="text-teal-200 text-sm flex items-center gap-1 mb-1">
          <span className="text-yellow-300">📍</span> {location}
        </p>
        <p className="text-teal-200 text-sm">Rating: {rating}/5</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onViewProfile}
          className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors text-sm flex-1"
        >
          View Profile
        </button>
        <button
          onClick={onHire}
          className="bg-black hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm flex-1"
        >
          Hire
        </button>
      </div>
    </div>
  );
};

interface HireFormProps {
  artisanName: string;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; phone: string; projectDetails: string }) => void;
}

const HireForm: React.FC<HireFormProps> = ({ artisanName, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectDetails: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', phone: '', projectDetails: '' });
    onClose();
  };

  return (
    <div className="bg-teal-800 text-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Hire: {artisanName}</h2>
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
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="e.g., +234 123 456 7890"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Project Details</label>
          <textarea
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleChange}
            className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300 h-32 resize-none"
            placeholder="Describe the project or service needed..."
            required
          />
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
            Submit Hire Request
          </button>
        </div>
      </form>
    </div>
  );
};

const HireSignatureArtisans: React.FC = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [selectedArtisan, setSelectedArtisan] = useState<string | null>(null);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [skill, setSkill] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const artisansPerPage = 6;

  const artisans: Artisan[] = [
    {
      name: 'Ikenna Kenneth',
      title: 'Fashion Designer',
      image: '/img-1.jpg',
      location: 'Agege',
      skills: ['Sewing', 'Pattern Making', 'Fashion Illustration'],
      rating: 4.8,
    },
    {
      name: 'Susana Elijah Archibong',
      title: 'Hospitality Expert',
        image: '/img-2.jpg',
      location: 'Lagos',
      skills: ['Event Planning', 'Catering', 'Customer Service'],
      rating: 4.5,
    },
    {
      name: 'Josephine Grace Owuama',
      title: 'Fashion Stylist',
      image: '/img-3.jpg',
      location: 'Ikotun',
      skills: ['Wardrobe Styling', 'Personal Shopping', 'Image Consulting'],
      rating: 4.2,
    },
    {
      name: 'Samuel Udoakah',
      title: 'Sales and Marketing Expert',
      image: '/img-4.jpg',
      location: 'Port Harcourt',
      skills: ['Digital Marketing', 'Sales Strategy', 'Branding'],
      rating: 4.7,
    },
    {
      name: 'Amaka Nwosu',
      title: 'Fashion Designer',
      image: '/img-5.jpg',
      location: 'Lagos',
      skills: ['Textile Design', 'Tailoring', 'Couture'],
      rating: 4.9,
    },
  ];

  const filteredArtisans = artisans
    .filter((artisan) => {
      const matchesCategory = category ? artisan.title.toLowerCase().includes(category.toLowerCase()) : true;
      const matchesLocation = location ? artisan.location.toLowerCase().includes(location.toLowerCase()) : true;
      const matchesSkill = skill ? artisan.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase())) : true;
      const matchesSearch = searchQuery
        ? artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artisan.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesLocation && matchesSkill && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return a.name.localeCompare(b.name); // Sort by name
    });

  const totalPages = Math.ceil(filteredArtisans.length / artisansPerPage);
  const startIndex = (currentPage - 1) * artisansPerPage;
  const paginatedArtisans = filteredArtisans.slice(startIndex, startIndex + artisansPerPage);

  const handleViewProfile = (name: string) => {
    setSelectedArtisan(name);
    setIsProfileModalOpen(true);
  };

  const handleHire = (name: string) => {
    setSelectedArtisan(name);
    setIsHireModalOpen(true);
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

  const handleHireSubmit = (data: { name: string; email: string; phone: string; projectDetails: string }) => {
    console.log(`Hire request for ${selectedArtisan}:`, data);
    alert(`Hire request for ${selectedArtisan} submitted!`);
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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-800 mb-4">Our Signature Artisans</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with skilled craftsmen and creative experts to bring your vision to life with passion and precision.
          </p>
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
            <input
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="Search by skill..."
              className="w-full md:w-1/4 bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-1/4 bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              <option value="rating">Sort by: Rating</option>
              <option value="name">Sort by: Name</option>
            </select>
          </div>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search artisans by name or title..."
              className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <button className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded-lg transition-colors shadow-md">
              Search
            </button>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-teal-800 mb-4">Featured Artisans</h2>
          <div className="carousel gap-4 pb-4">
            {artisans
              .filter((artisan) => artisan.rating >= 4.5)
              .slice(0, 3)
              .map((artisan) => (
                <div key={artisan.name} className="carousel-item w-64">
                  <ArtisanCard
                    name={artisan.name}
                    title={artisan.title}
                    image={artisan.image}
                    location={artisan.location}
                    rating={artisan.rating}
                    onViewProfile={() => handleViewProfile(artisan.name)}
                    onHire={() => handleHire(artisan.name)}
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedArtisans.length > 0 ? (
            paginatedArtisans.map((artisan) => (
              <ArtisanCard
                key={artisan.name}
                name={artisan.name}
                title={artisan.title}
                image={artisan.image}
                location={artisan.location}
                rating={artisan.rating}
                onViewProfile={() => handleViewProfile(artisan.name)}
                onHire={() => handleHire(artisan.name)}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-1 sm:col-span-2 lg:col-span-3">No artisans found matching your criteria.</p>
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

        {isProfileModalOpen && (
          <div className="fixed inset-0 bg-teal-900 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-teal-800 text-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl animate-fade-in">
              <h2 className="text-2xl font-bold mb-4">Profile: {selectedArtisan}</h2>
              <p className="text-teal-200 mb-4">
                {selectedArtisan} is a skilled artisan specializing in their craft. With years of experience, they bring creativity and dedication to every project.
              </p>
              <p className="text-teal-200 mb-4">
                Skills: {artisans.find((artisan) => artisan.name === selectedArtisan)?.skills.join(', ')}
              </p>
              <p className="text-teal-200 mb-6">
                Rating: {artisans.find((artisan) => artisan.name === selectedArtisan)?.rating}/5
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsProfileModalOpen(false)}
                  className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {isHireModalOpen && selectedArtisan && (
          <div className="fixed inset-0 bg-teal-900 bg-opacity-75 flex items-center justify-center z-50">
            <HireForm
              artisanName={selectedArtisan}
              onClose={() => setIsHireModalOpen(false)}
              onSubmit={handleHireSubmit}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default HireSignatureArtisans;