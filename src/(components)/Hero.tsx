import React from 'react';
import Image from 'next/image';

import Link from 'next/link';

interface CandidateCardProps {
  name: string;
  title: string;
  image: string;
  className?: string;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ name, title, image, className }) => {
  return (
    <div className={`bg-teal-800 rounded-2xl p-6 text-white flex flex-col ${className}`}>
      <div className="flex flex-col items-center text-center mb-6">
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <p className="text-teal-200 text-sm">{title}</p>
      </div>
      <div className="flex-1 flex items-end justify-center">
        <div className="w-full max-w-48 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={200}
            height={280}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen bg-gray-50 pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-teal-800 leading-tight mb-6">
            Find the best people for candidates in your startup
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get more sales and maximize the converion rates. Discover the most productive channels.
          </p>
        <Link href='/coming-soon'>

          <button className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-colors text-lg">
            Get Started
          </button>
                  
          </Link>
        </div>

        {/* Candidate Cards */}
        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
            {/* James Samerton - Tall card */}
            <div className="w-full md:w-64">
              <CandidateCard
                name="James Samerton"
                title="Mobile Developer"
                image="/image.jpg"
                className="h-96"
              />
            </div>

            {/* Queen Raturly - Short card */}
            <div className="w-full md:w-64 md:mt-16">
              <CandidateCard
                name="Queen Raturly"
                title="Digital marketing"
                image="/image.jpg"
                className="h-80"
              />
            </div>

            {/* Wanderson james - Short card */}
            <div className="w-full md:w-64 md:mt-16">
              <CandidateCard
                name="Wanderson james"
                title="Product Designer"
                image="/image.jpg"
                className="h-80"
              />
            </div>

            {/* Sabrina Uliyana - Tall card */}
            <div className="w-full md:w-64">
              <CandidateCard
                name="Sabrina Uliyana"
                title="UI/UX Designer"
                image="/image.jpg"
                className="h-96"
              />
            </div>
          </div>
        </div>

        {/* Company Logos */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <div className="flex justify-center items-center space-x-12 md:space-x-20 opacity-40">
            {/* Google */}
            <div className="text-gray-400 text-4xl font-light">Google</div>
            
            {/* Facebook */}
            <div className="text-gray-400 text-4xl font-light">facebook</div>
            
            {/* Airbnb */}
            <div className="flex items-center text-gray-400 text-4xl font-light">
              <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.5 16.3c-.4.7-1.2 1.1-2 1.1s-1.6-.4-2-1.1L12 13.8l-1.5 2.5c-.4.7-1.2 1.1-2 1.1s-1.6-.4-2-1.1c-.2-.3-.2-.7 0-1L12 7.5l5.5 7.8c.2.3.2.7 0 1z"/>
              </svg>
              airbnb
            </div>
            
            {/* Slack */}
            <div className="flex items-center text-gray-400 text-4xl font-light">
              <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
              </svg>
              slack
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;