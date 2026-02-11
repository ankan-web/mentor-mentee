import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // Allows users without email (or with fake emails)
  },
  password: {
    type: String,
    // Not required for UMS users
  },
  role: {
    type: String,
    enum: ['student', 'mentor', 'admin'],
    default: 'student',
  },
  department: String,
  phone: String,
  interests: [String],
  career_goal: String,

  // Specific to Students
  student_profile: {
    roll_no: String,  // This stores the AU/2024/... ID
    semester: String, // <--- ADDED THIS FIELD (Critical!)
    year: String,
    attendance: {
      percentage: { type: Number, default: 0 },
      attended: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    },
    attendance_last_updated: {
    type: Date,
    default: null
  },
    cgpa: { type: Number, default: 0 },
    assigned_mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },

  mentor_profile: {
    designation: String,
    office_hours: String,
    expertise: [String]
  }

}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;