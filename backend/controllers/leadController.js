const Lead = require("../models/Lead");
const asyncHandler = require("../utils/asyncHandler");

const getLeads = asyncHandler(async (req, res) => {
  const { search, status } = req.query;

  const filter = {};

  if (status && status !== "All") {
    filter.status = status;
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  const leads = await Lead.find(filter).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: leads.length,
    leads,
  });
});

const getLeadById = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    res.status(404);
    throw new Error("Lead not found");
  }

  res.status(200).json({
    success: true,
    lead,
  });
});

const createLead = asyncHandler(async (req, res) => {
  const { name, email, phone, company, source, status, notes } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Name, email and phone are required");
  }

  const lead = await Lead.create({
    name,
    email,
    phone,
    company,
    source,
    status,
    notes,
  });

  res.status(201).json({
    success: true,
    message: "Lead created successfully",
    lead,
  });
});

const updateLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!lead) {
    res.status(404);
    throw new Error("Lead not found");
  }

  res.status(200).json({
    success: true,
    message: "Lead updated successfully",
    lead,
  });
});
const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);

  if (!lead) {
    res.status(404);
    throw new Error("Lead not found");
  }

  res.status(200).json({
    success: true,
    message: "Lead deleted successfully",
  });
});
const getLeadStats = asyncHandler(async (req, res) => {
  const total = await Lead.countDocuments();

  const newLeads = await Lead.countDocuments({ status: "New" });

  const contacted = await Lead.countDocuments({ status: "Contacted" });

  const qualified = await Lead.countDocuments({ status: "Qualified" });

  const lost = await Lead.countDocuments({ status: "Lost" });

  res.status(200).json({
    success: true,
    stats: {
      total,
      newLeads,
      contacted,
      qualified,
      lost,
    },
  });
});

module.exports = {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  getLeadStats,
};