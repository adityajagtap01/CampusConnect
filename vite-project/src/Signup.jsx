import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiLock, FiMail, FiUserPlus, FiLogIn, FiArrowLeft, FiArrowRight, FiBookOpen } from "react-icons/fi";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { useUserStore } from "./services/atom";

const SignupForm = ({ toggleForm }) => {
    const navigate =useNavigate();
    const{signup}=useUserStore();
    const [formData, setFormData] = useState({
      registrationNo: "",
      password: "",
      confirmPassword: "",
      // email: "",
      department: "cs"
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
  
    const departments = [
      { value: "cs", label: "Computer Science" },
      { value: "entc", label: "Electronics & Telecommunication" },
      { value: "ece", label: "Electronics & Communication" },
      { value: "aids", label: "AI & Data Science" }
    ];
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      
      setIsLoading(true);
      setError("");
  
      try {
        const response=await signup(formData)
      // const response=await api.post(`/currentstudent/signup`,formData)
      // console.log("signuup successful", response.data);
      setuser(response.data)
        navigate("/");
      } catch (err) {
        setError("Failed to create account. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
  
  
    const formVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.6,
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      },
      exit: { 
        opacity: 0, 
        y: -20,
        transition: { duration: 0.4 }
      }
    };
  
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    };
  
    return (
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-gray-900 p-8 rounded-2xl shadow-xl border border-blue-900/30"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-400">Create Account</h2>
          <p className="text-gray-400 mt-2">Join us and start your academic journey</p>
        </motion.div>
  
        {error && (
          <motion.div 
            className="mb-6 p-3 bg-red-900/30 border border-red-700 rounded text-red-400 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}
  
        <form onSubmit={handleSubmit}>
          <motion.div variants={itemVariants} className="mb-5">
            <label className="block text-blue-300 text-sm font-semibold mb-2">
              Registration Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <FiUser />
              </span>
              <input
                type="text"
                name="registrationNo"
                value={formData.registrationNo}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="Enter your registration number"
                required
              />
            </div>
          </motion.div>
  
          {/* <motion.div variants={itemVariants} className="mb-5">
            <label className="block text-blue-300 text-sm font-semibold mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <FiMail />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="Enter your email address"
                required
              />
            </div>
          </motion.div> */}
  
          <motion.div variants={itemVariants} className="mb-5">
            <label className="block text-blue-300 text-sm font-semibold mb-2">
              Department
            </label>
            <div className="relative">
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 px-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none"
                required
              >
                {departments.map((dept) => (
                  <option key={dept.value} value={dept.value}>
                    {dept.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </motion.div>
  
          <motion.div variants={itemVariants} className="mb-5">
            <label className="block text-blue-300 text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <FiLock />
              </span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="Create a password"
                required
              />
            </div>
          </motion.div>
  
          <motion.div variants={itemVariants} className="mb-7">
            <label className="block text-blue-300 text-sm font-semibold mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <FiLock />
              </span>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="Confirm your password"
                required
              />
            </div>
          </motion.div>
  
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(66, 153, 225, 0.5)" }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center">
                <FiUserPlus className="mr-2" /> Create Account
              </span>
            )}
          </motion.button>
  
          <motion.div variants={itemVariants} className="text-center mt-6">
            <p className="text-gray-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={toggleForm}
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                <FiArrowLeft className="inline mr-1" /> Login
              </button>
            </p>
          </motion.div>
        </form>
      </motion.div>
    );
  };

  export default SignupForm