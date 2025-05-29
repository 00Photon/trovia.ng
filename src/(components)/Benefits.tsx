'use client';

import { motion } from 'framer-motion';

interface BenefitItem {
  title: string;
  items: string[];
  icon: React.ReactNode;
  gradient: string;
}

const benefits: BenefitItem[] = [
  {
    title: 'For Workers',
    items: [
      'Access local job opportunities instantly',
      'Showcase skills to your community',
      'Reduce transportation costs and time',
      'Earn multiple income streams',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    gradient: 'from-blue-500 to-teal-500',
  },
  {
    title: 'For Employers',
    items: [
      'Hire verified local talent quickly',
      'Save on hiring costs and time',
      'Support your local economy',
      'Build trust through community connections',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    gradient: 'from-teal-500 to-green-500',
  },
  {
    title: 'For Communities',
    items: [
      'Empower local economies',
      'Reduce unemployment and underemployment',
      'Strengthen community ecosystems',
      'Promote digital inclusion for informal workers',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    gradient: 'from-green-500 to-yellow-400',
  },
];

const BenefitCard: React.FC<BenefitItem & { index: number }> = ({ 
  title, 
  items, 
  icon, 
  gradient, 
  index 
}) => {
  return (
    <motion.div
      className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ y: -12, scale: 1.02 }}
    >
      {/* Background Gradient */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
      
      {/* Icon and Title */}
      <div className="flex items-center mb-6">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mr-4 shadow-lg`}>
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-teal-800">{title}</h3>
      </div>

      {/* Benefits List */}
      <div className="space-y-4">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="flex items-start space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: (index * 0.2) + (i * 0.1) }}
          >
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient} mt-2 flex-shrink-0`} />
            <p className="text-gray-600 leading-relaxed font-medium">{item}</p>
          </motion.div>
        ))}
      </div>

      {/* Hover Effect Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
    </motion.div>
  );
};

const Benefits: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-teal-800 mb-6">
            Benefits for Everyone
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our platform creates value for workers, employers, and entire communities through innovative connections and opportunities.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              {...benefit}
              index={index}
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            { number: '10K+', label: 'Active Workers' },
            { number: '2K+', label: 'Local Employers' },
            { number: '50+', label: 'Communities Served' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-teal-800 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;