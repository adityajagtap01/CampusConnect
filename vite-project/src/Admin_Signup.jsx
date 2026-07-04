import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiLock, FiLogIn, FiUserPlus, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "./services/atom";

const AdminSignupForm = () => {
    const navigate = useNavigate();
    const { adminlogin, adminsignup } = useUserStore();

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            if (isLogin) {
                await adminlogin(formData);
            } else {
                await adminsignup(formData);
            }
            navigate("/");
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-black flex justify-center items-center p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-900 p-8 rounded-2xl shadow-xl border border-blue-900/30 w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-400">
                        {isLogin ? "Admin Login" : "Create Admin Account"}
                    </h2>
                    <p className="text-gray-400 mt-2">Training & Placement Cell Access</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-900/30 border border-red-700 rounded text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block text-blue-300 text-sm font-semibold mb-2">Username</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                                <FiUser />
                            </span>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                placeholder="Enter admin username"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-7">
                        <label className="block text-blue-300 text-sm font-semibold mb-2">Password</label>
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
                                placeholder="Enter password"
                                required
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            "Processing..."
                        ) : isLogin ? (
                            <span className="flex items-center"><FiLogIn className="mr-2" /> Login</span>
                        ) : (
                            <span className="flex items-center"><FiUserPlus className="mr-2" /> Create Admin</span>
                        )}
                    </motion.button>

                    <div className="text-center mt-6">
                        <p className="text-gray-400">
                            {isLogin ? "Need to create an admin account?" : "Already have an account?"}{" "}
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                            >
                                <FiArrowLeft className="inline mr-1" /> {isLogin ? "Sign up" : "Login"}
                            </button>
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminSignupForm;