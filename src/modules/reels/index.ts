import { Router } from "express";
import upload from "../../config/multer";
import { container } from "../../config/dependencyRegistration";


const router = Router();
const reelsController = container.resolve("reelsController");

router.post('/reels/upload', upload.single("video"), reelsController.upload);

export default router;