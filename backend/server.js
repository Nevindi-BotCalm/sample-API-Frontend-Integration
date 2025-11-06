const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = 5000;

// MongoDB connection string - replace with your actual connection string
const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'DummyJson';

app.use(cors());
app.use(express.json());

let db;

// Connect to MongoDB
MongoClient.connect(MONGO_URI)
  .then(client => {
    db = client.db(DB_NAME);
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Fetch users
app.get('/api/users', async (req, res) => {
  try {
    const users = await db.collection('users').find().toArray();
    res.json({ users, total: users.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Add user
app.post('/api/users', async (req, res) => {
  try {
    const result = await db.collection('users').insertOne(req.body);
    res.json({ ...req.body, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// Update user
app.put('/api/users/:id', async (req, res) => {
  try {
    const { ObjectId } = require('mongodb');
    await db.collection('users').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json({ ...req.body, _id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const { ObjectId } = require('mongodb');
    await db.collection('users').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
