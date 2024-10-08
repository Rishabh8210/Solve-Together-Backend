import express from 'express'
import UserRoutes from './user-routes'
import QuestionsRoutes from './questions-related-routes'
import parseData from '../../controllers/question-controller';
import storage from '../../configs/multer-config';
import multer from 'multer';
const upload = multer({storage})
const router = express.Router();
import { AuthController, FriendRequestController, QuestionController } from '../../controllers/index'
import { validateUserAuthSignup, validateUserAuthSignin, isAuthenticated } from '../../middlewares/index'

const authController = new AuthController()
const friendRequestController = new FriendRequestController();
const questionController = new QuestionController();


// Users routes
router.use('/users', UserRoutes)

// Auth routes
router.post('/signup', validateUserAuthSignup, authController.signup);
router.post('/signin', validateUserAuthSignin, authController.signin);

// Uploads files/questions
router.post('/uploads', upload.single('file'), questionController.parseData);
// Friends and all routes
router.patch('/friends', isAuthenticated, friendRequestController.removeFriend);
router.get('/search', isAuthenticated, friendRequestController.getAllByName);
router.post('/:username', isAuthenticated, friendRequestController.sendFriendRequest);
router.patch('/:username', isAuthenticated, friendRequestController.acceptFriendRequest);
    
router.use('/questions', QuestionsRoutes);

export default router;