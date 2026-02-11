import express from 'express';
import { registerUser , loginUser , updateUserProfile , loginWithUMS} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/profile', protect, (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
//login with UMS
router.post('/login-ums', loginWithUMS);
// When someone POSTs to /, run the registerUser function
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', protect, updateUserProfile);

export default router;