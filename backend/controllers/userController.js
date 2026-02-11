import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { verifyAndScrapeUMS } from '../utils/umsScraper.js';
import jwt from 'jsonwebtoken';
import process from 'process';

// ----------------------
// Helper: Generate JWT
// ----------------------
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// ----------------------
// Register User
// ----------------------
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, department, roll_no } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'student',
      department,
      student_profile: {
        roll_no
      }
    });

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      message: "User Registered Successfully!"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ----------------------
// Standard Login
// ----------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      return res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    }

    return res.status(401).json({ message: 'Invalid email or password' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ----------------------
// Update Profile
// ----------------------
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.phone = req.body.phone || user.phone;
    user.department = req.body.department || user.department;
    user.interests = req.body.interests || user.interests;
    user.career_goal = req.body.career_goal || user.career_goal;

    if (req.body.student_profile) {
      user.student_profile = {
        ...user.student_profile,
        ...req.body.student_profile
      };
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      message: "Profile Updated Successfully!"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ----------------------
// Login via UMS (Smart Refresh)
// ----------------------
export const loginWithUMS = async (req, res) => {
  const { registration_no, password } = req.body;

  try {

    const fakeEmail = `${registration_no}@adamas.ac.in`;
    let user = await User.findOne({ email: fakeEmail });

    const ONE_DAY = 24 * 60 * 60 * 1000;

    const isExpired = (user) => {
      if (!user?.student_profile?.attendance_last_updated) return true;

      return (
        Date.now() -
        new Date(user.student_profile.attendance_last_updated).getTime()
      ) > ONE_DAY;
    };

    // ----------------------
    // CASE 1: User Exists
    // ----------------------
    if (user) {

      if (isExpired(user)) {

        // Scrape only if expired
        const umsData = await verifyAndScrapeUMS(registration_no, password);

        user.name = umsData.name;
        user.department = umsData.department;

        user.student_profile.roll_no = umsData.roll_no;
        user.student_profile.semester = umsData.semester;

        user.student_profile.attendance = {
          percentage: umsData.attendance,
          attended: umsData.attended,
          total: umsData.total
        };

        user.student_profile.attendance_last_updated = new Date();

        await user.save();
      }

    } 
    // ----------------------
    // CASE 2: New User
    // ----------------------
    else {

      const umsData = await verifyAndScrapeUMS(registration_no, password);

      user = await User.create({
        name: umsData.name,
        email: fakeEmail,
        password: "",
        role: 'student',
        department: umsData.department,
        student_profile: {
          roll_no: umsData.roll_no,
          semester: umsData.semester,
          attendance: {
            percentage: umsData.attendance,
            attended: umsData.attended,
            total: umsData.total
          },
          attendance_last_updated: new Date()
        }
      });
    }

    // ----------------------
    // Final Response
    // ----------------------
    res.json({
      _id: user._id,
      name: user.name,
      role: user.role,
      department: user.department,
      roll_no: user.student_profile.roll_no,
      attendance: user.student_profile.attendance,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error("UMS Error:", error.message);
    res.status(401).json({ message: "Invalid UMS Credentials or Network Error" });
  }
};
