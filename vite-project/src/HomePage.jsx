import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { api } from './services/axios';

const CompanyCardsPage = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // const response = await axios.get('http://localhost:3000/api/v1/checking');
        const response = await api.get(`checking`);
        if (response.data && response.data.data) {
          setCompanies(response.data.data);
          setFilteredCompanies(response.data.data);
        } else {
          throw new Error('Invalid data format');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch companies');
        setLoading(false);
        console.error('Error fetching companies:', err);
        const demoData = [
          { id: 1, name: "Acme Corporation" },
          { id: 2, name: "TechGlobal Solutions" },
          { id: 3, name: "Infinite Systems" },
          { id: 4, name: "Nexus Innovations" },
          { id: 5, name: "Quantum Enterprises" },
          { id: 6, name: "Apex Technologies" }
        ];
        setCompanies(demoData);
        setFilteredCompanies(demoData);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredCompanies(companies);
    } else {
      const filtered = companies.filter(company =>
        company.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  };

  return (
    // <div className="min-h-screen bg-gradient-to-b from-gray-950 to-blue-950 p-8">
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col items-center justify-center mb-12">
          <h1 className="text-5xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Company Directory
          </h1>


          <div className="w-full max-w-2xl mx-auto relative group">
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full bg-gray-800/70 backdrop-blur-sm border-2 border-blue-800 rounded-xl py-4 px-8 text-gray-100 
                         focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 
                         placeholder-gray-400 text-lg transition-all duration-300
                         shadow-lg shadow-blue-900/20 group-hover:shadow-blue-500/20"
            />
            <svg
              className="absolute right-5 top-4 h-6 w-6 text-blue-400 transition-all duration-300 group-hover:text-blue-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        {/* Loading/Error/Empty State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 opacity-75"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/30 backdrop-blur-sm border-2 border-red-800 text-red-300 p-6 rounded-xl mx-auto max-w-lg text-center shadow-lg">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <p className="text-xl">{error}</p>
            <button className="mt-4 px-6 py-2 bg-red-800/50 hover:bg-red-700/50 border border-red-700 rounded-lg transition-all duration-300">
              Retry
            </button>
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="text-center py-16 bg-gray-900/30 backdrop-blur-sm rounded-xl max-w-lg mx-auto border border-blue-900">
            <svg className="w-16 h-16 text-blue-400 mx-auto mb-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
            <p className="text-gray-300 text-xl mb-2">No companies found matching</p>
            <p className="text-blue-400 text-2xl font-bold mb-6">"{searchTerm}"</p>
            <button
              onClick={() => { setSearchTerm(''); setFilteredCompanies(companies); }}
              className="px-6 py-3 bg-blue-700/30 hover:bg-blue-600/40 text-blue-300 hover:text-blue-200 rounded-lg transition-all duration-300 border border-blue-700 hover:border-blue-500 shadow-lg hover:shadow-blue-500/20"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {filteredCompanies.map((company) => (
              <Link
                key={company.id}
                to={`/company/${company.id}`}
                className="block group perspective"
              >
                <div className="relative bg-gray-900/80 backdrop-blur-sm border-2 border-blue-900/50 rounded-xl overflow-hidden shadow-xl 
                                transition-all duration-500 ease-out transform 
                                hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-700
                                group-hover:rotate-y-2 group-hover:-rotate-x-2 h-64">
                  {/* Glowing border effect on hover */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-blue-500/10 to-blue-800/20"></div>

                  {/* Card Content */}
                  <div className="p-8 flex flex-col justify-between h-full relative z-10">
                    <div>
                      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100 
                                     group-hover:from-blue-200 group-hover:to-white transition-all duration-500 mb-2">
                        {company.name}
                      </h2>
                      <p className="text-gray-400 text-lg mt-3">ID: {company.id}</p>
                    </div>
                    <div className="flex justify-end items-center mt-6">
                      <span className="inline-flex items-center text-blue-400 text-lg font-medium group-hover:text-blue-300 transition-all duration-300">
                        View Details
                        <svg
                          className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-500 ease-out"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyCardsPage;