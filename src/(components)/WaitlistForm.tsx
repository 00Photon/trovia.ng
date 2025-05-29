'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  userType: z.enum(['worker', 'employer', 'both']),
});

type FormData = z.infer<typeof schema>;

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, error, children }) => {
  return (
    <div className="mb-6">
      <label className="block text-teal-800 font-semibold mb-3 text-sm uppercase tracking-wide">
        {label}
      </label>
      {children}
      {error && (
        <motion.p
          className="text-red-500 text-sm mt-2 flex items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  );
};

const WaitlistForm: React.FC = () => {
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      userType: 'worker',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitMessage('🎉 Welcome aboard! You\'re now on our exclusive waitlist.');
      setIsSuccess(true);
      reset();
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setSubmitMessage('');
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitMessage('Something went wrong. Please try again.');
      setIsSuccess(false);
    }
  };

  const userTypeOptions = [
    { value: 'worker', label: '👷 Worker/Artisan', description: 'Looking for job opportunities' },
    { value: 'employer', label: '🏢 Employer/Resident', description: 'Looking to hire talent' },
    { value: 'both', label: '🤝 Both', description: 'I wear multiple hats' },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 via-white to-yellow-50">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-teal-800 mb-6">
            Join Our Exclusive Waitlist
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
            Be among the first to experience the future of local hiring and get early access to amazing opportunities.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Background Decorations */}
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full opacity-20 blur-xl" />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-teal-200 to-teal-300 rounded-full opacity-20 blur-xl" />
          
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 backdrop-blur-sm"
          >
            {/* Email Field */}
            <FormField label="Email Address" error={errors.email?.message}>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 text-gray-700 placeholder-gray-400"
                  placeholder="your.email@example.com"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </FormField>

            {/* User Type Field */}
            <FormField label="I am a..." error={errors.userType?.message}>
              <div className="space-y-3">
                {userTypeOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-teal-300 hover:bg-teal-50 transition-all duration-300 group"
                  >
                    <input
                      type="radio"
                      value={option.value}
                      {...register('userType')}
                      className="sr-only"
                    />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full mr-4 relative group-hover:border-teal-500 transition-colors">
                      <div className="w-3 h-3 bg-teal-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-teal-800 transition-colors">
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-500 group-hover:text-teal-600 transition-colors">
                        {option.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </FormField>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Joining Waitlist...
                  </>
                ) : (
                  <>
                    Join Exclusive Waitlist
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </span>
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-10 transform skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700" />
            </motion.button>

            {/* Success/Error Message */}
            {submitMessage && (
              <motion.div
                className={`mt-6 p-4 rounded-xl text-center font-medium ${
                  isSuccess 
                    ? 'bg-green-50 text-green-700 border-2 border-green-200' 
                    : 'bg-red-50 text-red-700 border-2 border-red-200'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {submitMessage}
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Bottom Text */}
        <motion.p
          className="text-center text-gray-500 text-sm mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          🔒 Your information is secure and will never be shared with third parties.
        </motion.p>
      </div>
    </section>
  );
};

export default WaitlistForm;