

import fs from 'fs';
import cloudinary from 'cloudinary';
import client from '../prisma/db.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';


export const uploadimage = async (req, res) => {
    const userid = req.userId

    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded');
    }

    try {
        const uploadedFiles = [];
        for (let file of req.files) {
            const options = {
                resource_type: file.mimetype === 'application/pdf' ? 'raw' : 'auto',
                type: 'upload',
            };
            const cloudinaryResponse = await cloudinary.v2.uploader.upload(file.path, options);
            uploadedFiles.push(cloudinaryResponse.secure_url);

            // Clean up the local temp file now that it's safely in Cloudinary
            fs.unlink(file.path, (err) => {
                if (err) console.error(`Failed to delete temp file ${file.path}:`, err);
            });
        }

        const document = await client.documents.create({
            data: {
                twelth_result_file: uploadedFiles[0] || null,
                cgpa_result_file: uploadedFiles[1] || null,
                resume_result_file: uploadedFiles[2] || null,
            },
        });

        await client.currentStudents.update({
            where: {
                id: userid,
            },
            data: {
                documentId: document.id,
            },
        });

        res.status(200).send({
            message: 'Files uploaded successfully',
            fileUrls: uploadedFiles,
        });
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);

        // Clean up any temp files even if the upload/DB step failed partway through
        if (req.files) {
            req.files.forEach(file => {
                fs.unlink(file.path, () => { });
            });
        }

        res.status(500).send('Error uploading files');
    }
};

// import bcrypt from 'bcryptjs';
// import { generateToken } from '../utils/jwt.js';

// import bcrypt from 'bcryptjs';
// import { generateToken } from '../utils/jwt.js';
// import client from '../prisma/db.js';

export const signup = async (req, res) => {
    const { password, department: branch, registrationNo: regno } = req.body;

    try {
        const existingUser = await client.currentStudents.findUnique({
            where: { regno },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await client.currentStudents.create({
            data: {
                username: 'yash',
                regno,
                password: hashedPassword,
                branch,
            },
        });

        const token = generateToken(newUser.id);

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.status(201).json({ message: 'User created successfully', userId: newUser.id });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const admin_login = async (req, res) => {
    const { password, username } = req.body;
    try {
        const admin = await client.admin.findUnique({
            where: { username: username }
        });

        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(admin.id);

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: 'Login successful', userId: admin.id, admin: true });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('auth_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
        });

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const getProfile = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await client.currentStudents.findUnique({
            where: { id: userId },
            include: { document: true },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ profile: user });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const admin_signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingAdmin = await client.admin.findUnique({
            where: { username },
        });

        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await client.admin.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        const token = generateToken(newAdmin.id);

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(201).json({ message: 'Admin created successfully', userId: newAdmin.id, admin: true });
    } catch (error) {
        console.error('Admin signup error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
export const login = async (req, res) => {
    const { password, registrationNo: regno } = req.body;

    try {
        const user = await client.currentStudents.findUnique({
            where: { regno },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user.id);

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: 'Login successful', userId: user.id });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};