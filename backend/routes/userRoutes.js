import express from 'express';
import { registerUser , loginUser , updateUserProfile , loginWithUMS, getUserById} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

router.get('/profile', protect, (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Get user by ID (for fetching mentor details)

//login with UMS
router.post('/login-ums', loginWithUMS);
// When someone POSTs to /, run the registerUser function
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', protect, updateUserProfile);
router.get('/:id', protect, getUserById);

export default router;