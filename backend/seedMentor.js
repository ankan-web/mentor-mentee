import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './models/User.js';

dotenv.config();

const createTestMentor = async () => {
  await connectDB();

  const mentorExists = await User.findOne({ email: 'mentor@adamas.ac.in' });

  if (mentorExists) {
    console.log('Mentor user already exists');
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash('mentor123', 10);

  const mentor = await User.create({
    name: 'Dr. A. Chatterjee',
    email: 'mentor@adamas.ac.in',
    password: hashedPassword,
    role: 'mentor',
    department: 'Computer Science',
    mentor_profile: {
      designation: 'Senior Faculty',
      employee_id: 'EMP-2048',
      expertise: ['Data Structures', 'Algorithms', 'Database Management'],
      mentees: []
    }
  });

  console.log('Mentor user created:', mentor.email);
  console.log('Login credentials:');
  console.log('  Registration No: mentor');
  console.log('  Password: mentor123');
  
  process.exit(0);
};

createTestMentor();
