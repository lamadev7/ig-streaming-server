import { Router } from "express";
import { container } from "../../config/dependencyRegistration";


const router = Router();
const reelsController = container.resolve("reelsController");

router.post('/upload', reelsController.upload);

export default router;