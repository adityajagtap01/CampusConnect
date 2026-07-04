import { create } from 'zustand';

import { api } from './axios.js';

const saveUserToStorage = (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
};

const loadUserFromStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const useUserStore = create((set) => {
  const savedUser = loadUserFromStorage();

  return {
    user: savedUser,
    isadmin: savedUser?.admin || false,

    checkSession: async () => {
      try {
        const { data } = await api.get('auth/getprofile');
        set({ user: data, isadmin: data?.admin || false });
        saveUserToStorage(data);
      } catch (error) {
        console.warn('Session not found or expired:', error.response?.data || error.message);
        set({ user: null, isadmin: false });
        saveUserToStorage(null);
      }
    },

    login: async (credentials) => {
      try {
        const { data } = await api.post('auth/login', credentials);
        set({ user: data, isadmin: false });
        saveUserToStorage(data);
      } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
      }
    },

    signup: async (userData) => {
      try {
        const { data } = await api.post('auth/signup', userData);
        set({ user: data, isadmin: false });
        saveUserToStorage(data);
      } catch (error) {
        console.error('Signup failed:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Signup failed. Please try again.');
      }
    },

    adminlogin: async (credentials) => {
      try {
        const { data } = await api.post('auth/admin_login', credentials);
        const adminData = { ...data, admin: true };
        set({ user: adminData, isadmin: true });
        saveUserToStorage(adminData);
      } catch (error) {
        console.error('Admin login failed:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Admin login failed. Please try again.');
      }
    },

    adminsignup: async (credentials) => {
      try {
        const { data } = await api.post('auth/admin_signup', credentials);
        const adminData = { ...data, admin: true };
        set({ user: adminData, isadmin: true });
        saveUserToStorage(adminData);
      } catch (error) {
        console.error('Admin signup failed:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Admin signup failed.');
      }
    },

    logout: async () => {
      try {
        await api.post('auth/logout');
        set({ user: null, isadmin: false });
        saveUserToStorage(null);
      } catch (error) {
        console.error('Logout error:', error.response?.data || error.message);
        throw new Error('Logout failed. Please try again.');
      }
    },

    setuser: (user) => {
      set({ user, isadmin: user?.admin || false });
      saveUserToStorage(user);
    },
  };
});


export const useTeamStore = create((set) => ({
  teamdata: null,
  setteamdata: (data) => set({ teamdata: data }),
}))

export const useSendtoAdmin = create((set) => ({
  dataforadmin: null,
  setadmindata: (data) => set({ dataforadmin: data }),
}))
