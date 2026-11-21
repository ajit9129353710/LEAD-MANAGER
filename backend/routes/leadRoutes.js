const express = require("express");

const router = express.Router();

const {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  getLeadStats,
} = require("../controllers/leadController");

router.get("/", getLeads);

router.get("/stats", getLeadStats);

router.get("/:id", getLeadById);

router.post("/", createLead);

router.put("/:id", updateLead);

router.delete("/:id", deleteLead);

module.exports = router;