import { Router } from "express";
const router = Router();

import UserRoutes from './UserRoutes.js'
import ProjectRoutes from './ProjectRoutes.js'
import TaskRoutes from './TaskRoutes.js'

// Rotas
router.use('/api/users', UserRoutes)
router.use('/api/projects', ProjectRoutes)
router.use('/api/tasks', TaskRoutes)

export default router;