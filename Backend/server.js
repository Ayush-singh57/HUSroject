// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// --- 1. CONFIGURATION ---
// Replace with your MongoDB Connection String
const MONGO_URI = "mongodb+srv://admin:admin123@cluster0.8oefutg.mongodb.net/urbanspace?appName=Cluster0";
const PORT = 5000;

// --- 2. MIDDLEWARE ---
app.use(cors()); // Allow React to connect
app.use(express.json()); // Parse JSON data

// --- 3. DATABASE CONNECTION ---
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ DB Connection Error:', err));

// --- 4. STRICT SCHEMAS (Matches your React UI exactly) ---

// Project: Matches { name, description, image }
const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

// Client: Matches { name, designation, description, image }
const ClientSchema = new mongoose.Schema({
  name: String,
  designation: String,
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

// Inquiry: Matches { name, email, mobile, city }
const InquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  city: String,
  createdAt: { type: Date, default: Date.now }
});

// Subscriber: Matches { email }
const SubscriberSchema = new mongoose.Schema({
  email: String,
  createdAt: { type: Date, default: Date.now }
});

// Models
const Project = mongoose.model('Project', ProjectSchema);
const Client = mongoose.model('Client', ClientSchema);
const Inquiry = mongoose.model('Inquiry', InquirySchema);
const Subscriber = mongoose.model('Subscriber', SubscriberSchema);

// --- 5. ROUTES ---

// --- PROJECTS ---
app.get('/api/projects', async (req, res) => {
  const data = await Project.find().sort({ createdAt: -1 });
  res.json(data);
});
app.post('/api/projects', async (req, res) => {
  const newDoc = new Project(req.body);
  await newDoc.save();
  res.json(newDoc);
});
app.delete('/api/projects/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// --- CLIENTS ---
app.get('/api/clients', async (req, res) => {
  const data = await Client.find().sort({ createdAt: -1 });
  res.json(data);
});
app.post('/api/clients', async (req, res) => {
  const newDoc = new Client(req.body);
  await newDoc.save();
  res.json(newDoc);
});
app.delete('/api/clients/:id', async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// --- INQUIRIES ---
app.get('/api/inquiries', async (req, res) => {
  const data = await Inquiry.find().sort({ createdAt: -1 });
  res.json(data);
});
app.post('/api/inquiries', async (req, res) => {
  const newDoc = new Inquiry(req.body);
  await newDoc.save();
  res.json(newDoc);
});

// --- SUBSCRIBERS ---
app.get('/api/subscribers', async (req, res) => {
  const data = await Subscriber.find().sort({ createdAt: -1 });
  res.json(data);
});
app.post('/api/subscribers', async (req, res) => {
  const newDoc = new Subscriber(req.body);
  await newDoc.save();
  res.json(newDoc);
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
