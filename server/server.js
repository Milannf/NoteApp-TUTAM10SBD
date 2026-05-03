const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://note-app-tutam-10-sbd.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => console.log("MongoDB connection established!"))
  .catch(err => console.error("MongoDB connection error:", err));

app.get('/', (req, res) => {
  res.send('NoteApp API is live!');
});

const notesRouter = require('./routes/notes');
app.use('/api/notes', notesRouter);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;