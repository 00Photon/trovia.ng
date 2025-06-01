"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface Job {
  title: string;
  category: string;
  location: string;
  salary: string;
  description: string;
  image?: string;
}

interface JobCardProps {
  title: string;
  category: string;
  location: string;
  salary: string;
  image?: string;
  onViewDetails: () => void;
  onApply: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ title, category, location, salary, image, onViewDetails, onApply }) => {
  return (
    <div className="bg-teal-800 rounded-2xl p-6 text-white flex flex-col transform hover:scale-105 transition-transform duration-300 shadow-lg">
      <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden mb-4">
        {image ? (
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-lg"
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
        <p className="text-teal-200 text-sm">{salary}</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onViewDetails}
          className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors text-sm flex-1"
        >
          View Details
        </button>
        <button
          onClick={onApply}
          className="bg-black hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm flex-1"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

interface PostJobFormProps {
  onClose: () => void;
  onSubmit: (data: { user: { name: string; email: string; company: string }; job: Job; image?: File }) => void;
}

const PostJobForm: React.FC<PostJobFormProps> = ({ onClose, onSubmit }) => {
  const [userData, setUserData] = useState({ name: '', email: '', company: '' });
  const [jobData, setJobData] = useState({
    title: '',
    category: '',
    skills: '',
    location: '',
    salary: '',
    description: '',
  });
  const [image, setImage] = useState<File | null>(null);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleJobChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ user: userData, job: jobData, image: image || undefined });
    setUserData({ name: '', email: '', company: '' });
    setJobData({ title: '', category: '', skills: '', location: '', salary: '', description: '' });
    setImage(null);
    onClose();
  };

  return (
    <div className="bg-teal-800 text-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Post a Job</h2>
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
            <label className="block text-sm font-medium mb-1">Company</label>
            <input
              type="text"
              name="company"
              value={userData.company}
              onChange={handleUserChange}
              className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="e.g., Acme Corp"
              required
            />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Job Details</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Job Title</label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleJobChange}
              className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="e.g., Fashion Designer"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={jobData.category}
              onChange={handleJobChange}
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
            <label className="block text-sm font-medium mb-1">Skills</label>
            <input
              type="text"
              name="skills"
              value={jobData.skills}
              onChange={handleJobChange}
              className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="e.g., Sewing, Design, React"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleJobChange}
              className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="e.g., Lagos"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Salary</label>
            <input
              type="text"
              name="salary"
              value={jobData.salary}
              onChange={handleJobChange}
              className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="e.g., ₦200,000/month"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleJobChange}
              className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300 h-32 resize-none"
              placeholder="Describe the job requirements..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Job Image (Optional)</label>
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
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

interface ApplyFormProps {
  jobTitle: string;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; resume: File }) => void;
}

const ApplyForm: React.FC<ApplyFormProps> = ({ jobTitle, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', email: '', resume: null as File | null });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.resume) {
      onSubmit({
        name: formData.name,
        email: formData.email,
        resume: formData.resume,
      });
      setFormData({ name: '', email: '', resume: null });
      onClose();
    } else {
      alert('Please upload a resume.');
    }
  };

  return (
    <div className="bg-teal-800 text-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Apply for: {jobTitle}</h2>
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
          <label className="block text-sm font-medium mb-1">Resume</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none"
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
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

const AllJobs: React.FC = () => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;

  const jobs: Job[] = [
    {
      title: 'Fashion Designer',
      category: 'Fashion',
      location: 'Lagos',
      salary: '₦200,000/month',
      description: 'Design and create fashionable clothing for a leading brand.',
      image: '/img-1.jpg',
    },
    {
      title: 'Hospitality Manager',
      category: 'Hospitality',
      location: 'Port Harcourt',
      salary: '₦300,000/month',
      description: 'Manage operations for a luxury hotel.',
      image: '/img-2.jpg',
    },
    {
      title: 'Sales Associate',
      category: 'Sales and Marketing',
      location: 'Agege',
      salary: '₦150,000/month',
      description: 'Drive sales for a retail company.',
      image: '/img-3.jpg',
    },
    {
      title: 'Fashion Stylist',
      category: 'Fashion',
      location: 'Ikotun',
      salary: '₦180,000/month',
      description: 'Style clients for events and photoshoots.',
      image: '/img-4.jpg',
    },
    {
      title: 'Marketing Specialist',
      category: 'Sales and Marketing',
      location: 'Lagos',
      salary: '₦250,000/month',
      description: 'Develop marketing campaigns for a tech startup.',
     image: '/img-5.jpg',
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesCategory = category ? job.category.toLowerCase().includes(category.toLowerCase()) : true;
    const matchesLocation = location ? job.location.toLowerCase().includes(location.toLowerCase()) : true;
    const matchesSearch = searchQuery
      ? job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesLocation && matchesSearch;
  });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  const handleViewDetails = (title: string) => {
    setSelectedJob(title);
    setIsDetailsModalOpen(true);
  };

  const handleApply = (title: string) => {
    setSelectedJob(title);
    setIsApplyModalOpen(true);
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

  const handlePostJobSubmit = (data: { user: { name: string; email: string; company: string }; job: Job; image?: File }) => {
    console.log('Job Posted:', data);
    alert('Job posted successfully!');
  };

  const handleApplySubmit = (data: { name: string; email: string; resume: File }) => {
    console.log(`Application for ${selectedJob}:`, data);
    alert(`Application for ${selectedJob} submitted!`);
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
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-800 mb-4">All Available Jobs</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Discover exciting job opportunities tailored to your skills and preferences.
          </p>
          <button
            onClick={() => setIsPostJobModalOpen(true)}
            className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors shadow-md"
          >
            Post a Job
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
          </div>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs by title or category..."
              className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <button className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded-lg transition-colors shadow-md">
              Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paginatedJobs.length > 0 ? (
            paginatedJobs.map((job) => (
              <JobCard
                key={job.title}
                title={job.title}
                category={job.category}
                location={job.location}
                salary={job.salary}
                image={job.image}
                onViewDetails={() => handleViewDetails(job.title)}
                onApply={() => handleApply(job.title)}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-1 md:col-span-3">No jobs found matching your criteria.</p>
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
              <h2 className="text-2xl font-bold mb-4">Job Details: {selectedJob}</h2>
              <p className="text-teal-200 mb-6">{jobs.find((job) => job.title === selectedJob)?.description}</p>
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

        {isApplyModalOpen && selectedJob && (
          <div className="fixed inset-0 bg-teal-900 bg-opacity-75 flex items-center justify-center z-50">
            <ApplyForm
              jobTitle={selectedJob}
              onClose={() => setIsApplyModalOpen(false)}
              onSubmit={handleApplySubmit}
            />
          </div>
        )}

        {isPostJobModalOpen && (
          <div className="fixed inset-0 bg-teal-900 bg-opacity-75 flex items-center justify-center z-50">
            <PostJobForm
              onClose={() => setIsPostJobModalOpen(false)}
              onSubmit={handlePostJobSubmit}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default AllJobs;