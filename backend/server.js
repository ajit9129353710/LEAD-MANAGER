const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const leadRoutes = require("./routes/leadRoutes");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Lead Manager API is running",
  });
});

app.use("/api/leads", leadRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});