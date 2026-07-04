import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { api } from './services/axios';

// First Component: Student Year Graph
const StudentYearGraph = ({ companyId }) => {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await api.get(`checking/${companyId}`);
        if (Array.isArray(response.data)) {
          const formattedData = response.data.map(item => ({
            year: item.year,
            students: item._count.id
          }));
          setStudentData(formattedData);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        setError('Failed to fetch student data');
        console.error('Error fetching student data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [companyId]);

  if (loading) {
    return (
      <motion.div
        className="flex justify-center items-center h-80 bg-gray-900/30 backdrop-blur-sm rounded-xl border border-blue-900/50 shadow-lg"
        animate={{
          boxShadow: ["0 0 0 rgba(59, 130, 246, 0)", "0 0 15px rgba(59, 130, 246, 0.3)", "0 0 0 rgba(59, 130, 246, 0)"]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 opacity-75"></div>
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: ["0 0 0 rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.5)", "0 0 0 rgba(59, 130, 246, 0)"]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-red-900/20 backdrop-blur-sm text-red-300 p-6 rounded-xl text-center h-80 flex flex-col justify-center border border-red-900/50 shadow-lg"
      >
        <Sparkles className="mx-auto mb-4 text-red-400 h-8 w-8" />
        <p className="text-xl">{error}</p>
        <p className="mt-2 text-red-400/70">Please try again later</p>
      </motion.div>
    );
  }

  // Enhanced custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/90 backdrop-blur-md p-4 border border-blue-500/30 rounded-lg shadow-lg"
        >
          <p className="text-blue-300 font-medium mb-1">{`Year: ${label}`}</p>
          <p className="text-white font-bold text-lg">
            {`${payload[0].value} Students`}
          </p>
        </motion.div>
      );
    }
    return null;
  };
  if (studentData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-blue-900/30 flex flex-col items-center justify-center h-80 text-center"
      >
        <Sparkles className="mx-auto mb-4 text-blue-400/50 h-8 w-8" />
        <p className="text-xl text-gray-300">No placement data yet for this company</p>
        <p className="mt-2 text-gray-500">Check back once students have been placed here.</p>
      </motion.div>
    );
  }
  return (
    <motion.div
      className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-xl flex flex-col h-full border border-blue-900/30 relative overflow-hidden"
      whileHover={{
        boxShadow: "0 0 25px rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 0.5)"
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.h2
        className="text-2xl font-bold mb-6 flex items-center justify-center"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100">
          Students Per Year
        </span>
        <motion.div
          className="ml-2 h-1 w-12 bg-gradient-to-r from-blue-500 to-transparent rounded-full"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.h2>

      <motion.div
        className="flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={studentData}
            margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                <stop offset="100%" stopColor="#1E40AF" stopOpacity={0.8} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
            <XAxis
              dataKey="year"
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              axisLine={{ stroke: '#4B5563' }}
            />
            <YAxis
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              axisLine={{ stroke: '#4B5563' }}
              label={{
                value: 'Students',
                angle: -90,
                position: 'insideLeft',
                style: { fill: '#9CA3AF', textAnchor: 'middle' }
              }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
            <Legend
              wrapperStyle={{ color: '#9CA3AF', paddingTop: '10px' }}
              formatter={(value) => <span className="text-blue-300">{value}</span>}
            />
            <Bar
              dataKey="students"
              name="Number of Students"
              fill="url(#barGradient)"
              radius={[6, 6, 0, 0]}
              animationDuration={1500}
              filter="url(#glow)"
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};


const PromptAnswerSection = ({ companyId }) => {
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // const response=await fetch.get(`/checking/getme/${companyId}`,{prompt:prompt})
      const response = await api.post(`checking/getme/${companyId}`, { prompt: prompt });
      if (response.data && response.data.data) {
        setAnswer(response.data.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError('Failed to get response from server');
      console.error('Error submitting prompt:', err);

      setTimeout(() => {
        setAnswer(`This is a simulated response to your prompt: "${prompt}". In a real implementation, this would be generated by your backend AI service.`);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-blue-900/30 relative overflow-hidden h-full"
      whileHover={{
        boxShadow: "0 0 25px rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 0.5)"
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />

      <motion.h2
        className="text-2xl font-bold mb-6 flex items-center justify-center"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100">
          Ask About This Company
        </span>
        <motion.div
          className="ml-2 h-1 w-12 bg-gradient-to-r from-blue-500 to-transparent rounded-full"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <motion.textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your question about the company..."
            className="w-full bg-gray-800/70 backdrop-blur-sm border-2 border-blue-800/70 rounded-xl py-4 px-6 text-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 placeholder-gray-400 text-lg transition-all duration-300 shadow-lg shadow-blue-900/20 min-h-32 resize-none"
            whileFocus={{
              borderColor: "rgba(59, 130, 246, 0.8)",
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.25)"
            }}
            rows={4}
          />
          <motion.button
            type="submit"
            disabled={loading || !prompt.trim()}
            className={`absolute bottom-4 right-4 rounded-lg px-4 py-2 text-white font-medium flex items-center gap-2 transition-all duration-300
              ${loading || !prompt.trim()
                ? 'bg-blue-700/50 cursor-not-allowed opacity-70'
                : 'bg-blue-700 hover:bg-blue-600'}`}
            whileHover={!loading && prompt.trim() ? { scale: 1.03 } : {}}
            whileTap={!loading && prompt.trim() ? { scale: 0.98 } : {}}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing
              </span>
            ) : 'Submit'}

            {!loading && prompt.trim() && (
              <motion.div
                className="absolute inset-0 bg-blue-500/20 rounded-lg -z-10"
                animate={{
                  boxShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 8px rgba(59, 130, 246, 0.5)", "0 0 0px rgba(59, 130, 246, 0)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.button>
        </div>
      </form>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-900/20 backdrop-blur-sm border border-red-800/70 text-red-300 p-4 rounded-lg mb-6 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-red-700/5"
              animate={{
                background: ["rgba(185, 28, 28, 0.05)", "rgba(185, 28, 28, 0.1)", "rgba(185, 28, 28, 0.05)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {answer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-blue-900/20 backdrop-blur-sm border border-blue-800/70 rounded-xl p-6 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"
              animate={{
                background: ["linear-gradient(to bottom right, rgba(59, 130, 246, 0.05), rgba(99, 102, 241, 0.05))",
                  "linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1))",
                  "linear-gradient(to bottom right, rgba(59, 130, 246, 0.05), rgba(99, 102, 241, 0.05))"]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            <motion.h3
              className="text-xl font-semibold text-blue-300 mb-3 flex items-center gap-2 justify-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="h-5 w-5" />
              <span>Response:</span>
            </motion.h3>

            <motion.div
              className="text-gray-300 leading-relaxed whitespace-pre-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {answer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main Page Component
const CompanyAnalyticsPage = () => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const param = useParams();
  const companyId = param.id;

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await api.get(`checking/company/${companyId}`);
        if (response.data) {
          setCompanyData(response.data.data);
        } else {
          throw new Error('Invalid data format');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch company data');
        setLoading(false);
        console.error('Error fetching company data:', err);
        setCompanyData({ id: companyId, name: 'Acme Corporation' });
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [companyId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-blue-950 p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="flex flex-col items-center mb-8 gap-4"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Link to="/" className="group bg-gray-900/50 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-blue-800/30 text-blue-400 hover:text-blue-300 transition-all duration-300 flex items-center">
            <motion.svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </motion.svg>
            <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all after:duration-300 group-hover:after:w-full">
              Back to Directory
            </span>
          </Link>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-10 w-60 bg-gray-800/80 animate-pulse rounded-lg"
              />
            ) : (
              <motion.h1
                key="title"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-center"
              >
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 relative">
                  {companyData?.name || 'Company Details'}
                  <motion.div
                    className="absolute -inset-1 -z-10 opacity-30 blur-xl bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.4, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </span>
              </motion.h1>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full"
          >
            <StudentYearGraph companyId={companyId} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="w-full"
          >
            <PromptAnswerSection companyId={companyId} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};






export default CompanyAnalyticsPage;
