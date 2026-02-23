import { Router } from "express";
import {
  createSubmission,
  listSubmissions,
  getSubmissionById,
  listJadwalSubmissions,
} from "../controllers/submissions.controller";

const router = Router();

router.post("/", createSubmission);
router.get("/", listSubmissions);
router.get("/jadwal", listJadwalSubmissions);
router.get("/:id", getSubmissionById);

export default router;
