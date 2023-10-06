import express from "express";
import {
  createPreferences,
  getPreferences,
  updatePreferences,
} from "./handler/preferences.js";

export const router = express.Router();

router.post("/preferences", createPreferences);
router.get("/preferences", getPreferences);
router.put("/preferences", updatePreferences);
