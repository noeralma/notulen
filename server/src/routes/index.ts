import { Router } from "express";
import healthRoutes from "./health.routes";
import submissionsRoutes from "./submissions.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/submissions", submissionsRoutes);

export default router;
