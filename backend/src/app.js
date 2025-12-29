const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv').config();
const port = 3000;
const connectDB = require('./config/db');
const apiRouter = require('./routes/index');
const cors = require('cors');

// ✅ Enable CORS before routes
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Define your routes after middleware
app.use('/api', apiRouter);

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running at http://localhost:${port}`);
});
