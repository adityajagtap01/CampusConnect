import { useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import CompanyCardsPage from './HomePage.jsx'
import Companystatspage from './CompanystatsPage.jsx'
import Uploadpfd from './Uploadpdfs.jsx'
import AuthPage from './Authcover.jsx'
import Navbar from './Navbar.jsx'
import { useUserStore } from './services/atom.js'
import TeamManagement from './ForAllPage.jsx'
import TeamApplicants from './Admintnp.jsx'
import AdminSignupForm from './Admin_Signup.jsx'

function App() {
  const { user: authUser, isadmin } = useUserStore()

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <CompanyCardsPage /> : <Navigate to='/login' />} />
        <Route path='/company/:id' element={authUser ? <Companystatspage /> : <Navigate to='/login' />} />
        <Route path='/user/upload' element={authUser ? <Uploadpfd /> : <Navigate to="/login" />} />
        <Route path='/login' element={authUser ? <Navigate to="/" /> : <AuthPage />} />
        <Route path='/admin' element={authUser ? <Navigate to="/" /> : <AdminSignupForm />} />
        <Route path="/tnp" element={authUser ? <TeamManagement /> : <Navigate to="/login" />} />
        <Route path="/admin_tnp" element={authUser && isadmin ? <TeamApplicants /> : <Navigate to="/tnp" />} />
      </Routes>
    </>
  )
}

export default App