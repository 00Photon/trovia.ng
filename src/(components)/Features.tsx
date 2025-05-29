'use client';

import { motion } from 'framer-motion';

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: FeatureProps[] = [
  {
    title: 'Location-Based Matching',
    description: 'Connect with verified local workers and jobs within your community using GPS-powered matching.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Dual User Profiles',
    description: 'Create profiles as a worker or employer, showcasing skills or hiring needs with verified badges.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    title: 'Smart Matching System',
    description: 'AI-powered recommendations to match jobs with skills, availability, and location preferences.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const FeatureCard: React.FC<FeatureProps & { index: number }> = ({ title, description, icon, index }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-teal-50 rounded-2xl flex items-center justify-center text-teal-700 mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-teal-800 mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const Features: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-teal-800 mb-6">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover powerful features designed to connect talent with opportunities seamlessly and efficiently.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-4 rounded-lg transition-colors text-lg shadow-sm hover:shadow-md">
            Explore All Features
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;