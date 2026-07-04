import React, { useState } from "react";
import { motion } from "framer-motion";
import LoginForm from "./Login";
import SignupForm from "./Signup";
import { FiUser, FiLock, FiMail, FiUserPlus, FiLogIn, FiArrowLeft, FiArrowRight, FiBookOpen } from "react-icons/fi";
// import axios from "axios";
const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
  
    return (
      <div className="min-h-screen w-full bg-black flex flex-col md:flex-row overflow-hidden">
       
        <motion.div 
          className="md:w-1/2 h-screen bg-gray-900 relative overflow-hidden"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
  
          <div className="absolute inset-0 z-0">
            <img 
              src="/api/placeholder/1200/900" 
              alt="Campus" 
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-black/70" />
          </div>
  
          
          <div className="relative z-10 flex flex-col justify-center items-center h-full p-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.div 
                className="text-blue-400 text-6xl mb-6"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, 0, -2, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <FiBookOpen />
              </motion.div>
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-white mb-4"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Campus <span className="text-blue-400">Connect</span>
              </motion.h1>
              <p className="text-gray-300 text-xl mb-8">Your academic journey starts here</p>
              
              <motion.div 
                className="w-20 h-1 bg-blue-500 mx-auto mb-8"
                animate={{ width: ["20%", "60%", "20%"] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <p className="text-gray-400 italic">
                "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
              </p>
            </motion.div>
          </div>
        </motion.div>
  
        <motion.div 
          className="md:w-1/2 min-h-screen bg-black flex justify-center items-center p-8"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full max-w-md">
            
            <AnimatePresence mode="wait">
              {isLogin ? (
                <LoginForm key="login" toggleForm={() => setIsLogin(false)} />
              ) : (
                <SignupForm key="signup" toggleForm={() => setIsLogin(true)} />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    );
  };


  const AnimatePresence = ({ children, mode = "sync" }) => {
    return children;
  };

  export default AuthPage