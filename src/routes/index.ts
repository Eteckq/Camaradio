import { Router } from 'express';
import AuthRouter from './Auth';
import SpotifyRouter from './Spotify';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/auth', AuthRouter);
router.use('/spotify', SpotifyRouter);

// Export the base-router
export default router;
