const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Allows your Next.js frontend to connect
app.use(express.json()); // Parses incoming JSON requests

// MongoDB Connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => console.log("🍃 MongoDB connection established!"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Test Route
app.get('/', (req, res) => {
  res.send('NoteApp API is live!');
});

const PORT = process.env.PORT || 5000;

const notesRouter = require('./routes/notes');
app.use('/api/notes', notesRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});