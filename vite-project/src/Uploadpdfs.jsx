import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { FiUpload, FiCheckCircle, FiX, FiFile } from "react-icons/fi";
import { api } from "./services/axios";


const DocumentUpload = () => {
  const [documents, setDocuments] = useState({
    result: null,
    cgpa: null,
    class12: null
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    result: "",
    cgpa: "",
    class12: ""
  });
  const [success, setSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

 
  const createDropzone = (docType, label) => {
    const onDrop = (acceptedFiles) => {
      if (acceptedFiles.length === 1) {
        setDocuments(prev => ({
          ...prev,
          [docType]: acceptedFiles[0]
        }));
        setErrors(prev => ({
          ...prev,
          [docType]: ""
        }));
      } else if (acceptedFiles.length > 1) {
        setErrors(prev => ({
          ...prev,
          [docType]: "Please upload only one file."
        }));
      }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      multiple: false,
      accept: {
        'application/pdf': ['.pdf'],
        'image/jpeg': ['.jpg', '.jpeg'],
        'image/png': ['.png'],
        'application/msword': ['.doc'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
      }
    });

    return (
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-xl font-semibold text-blue-400 mb-2"
          whileHover={{ scale: 1.05 }}
        >
          {label}
        </motion.h2>
        
        <motion.div
          {...getRootProps()}
          className={`relative w-full p-6 border-2 border-dashed rounded-xl bg-gray-900 text-center cursor-pointer transition-all duration-300 ${
            isDragActive ? "border-blue-400 bg-gray-800" : "border-blue-600"
          } ${documents[docType] ? "border-green-500" : ""}`}
          whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(66, 153, 225, 0.5)" }}
          whileTap={{ scale: 0.98 }}
          onMouseEnter={() => setActiveSection(docType)}
          onMouseLeave={() => setActiveSection(null)}
        >
          <input {...getInputProps()} />
          
          <AnimatePresence>
            {!documents[docType] ? (
              <motion.div
                className="flex flex-col items-center justify-center h-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    scale: activeSection === docType ? 1.1 : 1
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <FiUpload className="text-blue-400 text-3xl mx-auto mb-2" />
                </motion.div>
                <p className="text-blue-300">
                  {isDragActive ? "Drop file here" : "Drag & drop or click to select"}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Accepts PDF, DOCX, JPG, PNG
                </p>
              </motion.div>
            ) : (
              <motion.div 
                className="flex items-center justify-between h-24 px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center">
                  <FiFile className="text-blue-400 text-xl mr-2" />
                  <span className="text-blue-300 text-sm truncate max-w-xs">
                    {documents[docType].name}
                  </span>
                </div>
                <motion.button
                  className="text-red-400 hover:text-red-300 p-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDocuments(prev => ({
                      ...prev,
                      [docType]: null
                    }));
                  }}
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiX />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {errors[docType] && (
          <motion.p 
            className="mt-2 text-red-500 text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {errors[docType]}
          </motion.p>
        )}
      </motion.div>
    );
  };

  const handleSubmit = async () => {
    let hasError = false;
    const newErrors = {...errors};
    
    // Object.keys(documents).forEach(key => {
    //   if (!documents[key]) {
    //     newErrors[key] = `Please upload your ${key === 'class12' ? 'Class 12 results' : key === 'cgpa' ? 'CGPA certificate' : 'results document'}.`;
    //     hasError = true;
    //   }
    // });
    
    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setSuccess(false);

    const formData = new FormData();
    console.log(documents)
    
    Object.keys(documents).forEach(key => {
      if (documents[key]) {
        formData.append("files", documents[key]);
      }
    });
    try {
      const response = await api.post(
        "auth/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess(true);
      setDocuments({
        result: null,
        cgpa: null,
        class12: null
      });
    } catch (error) {
      setErrors({
        result: "Upload failed. Please try again.",
        cgpa: "Upload failed. Please try again.",
        class12: "Upload failed. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 0 20px rgba(66, 153, 225, 0.7)",
      transition: { duration: 0.3, yoyo: Infinity }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <motion.div
        className="w-full max-w-2xl bg-gray-900 rounded-2xl p-8 shadow-xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <motion.h1
          className="text-3xl font-bold text-blue-400 mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Academic Document Upload
        </motion.h1>

        <AnimatePresence>
          {success && (
            <motion.div
              className="mb-6 p-4 bg-blue-900/30 border border-blue-500 rounded-lg flex items-center justify-center text-green-400"
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FiCheckCircle className="mr-2 text-xl" />
              <span>All documents uploaded successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result Document Upload */}
        {createDropzone("result", "Semester Result Document")}
        
        {/* CGPA Document Upload */}
        {createDropzone("cgpa", "CGPA Certificate")}
        
        {/* Class 12 Results Upload */}
        {createDropzone("class12", "Class 12 Result Document")}

        <motion.button
          onClick={handleSubmit}
          className="w-full mt-8 px-6 py-4 bg-blue-600 text-white rounded-lg text-xl font-semibold"
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <ClipLoader color="#ffffff" size={24} className="mr-2" />
              <span>Uploading...</span>
            </div>
          ) : (
            <span>Submit Documents</span>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default DocumentUpload;