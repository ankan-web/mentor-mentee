import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './models/User.js';

dotenv.config();

const createTestAdmin = async () => {
  await connectDB();

  const adminExists = await User.findOne({ email: 'admin@adamas.ac.in' });

  if (adminExists) {
    console.log('Admin user already exists');
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await User.create({
    name: 'System Admin',
    email: 'admin@adamas.ac.in',
    password: hashedPassword,
    role: 'admin',
    department: 'Administration'
  });

  console.log('Admin user created:', admin.email);
  console.log('Login credentials:');
  console.log('  Email: admin@adamas.ac.in');
  console.log('  Password: admin123');
  
  process.exit(0);
};

createTestAdmin();
