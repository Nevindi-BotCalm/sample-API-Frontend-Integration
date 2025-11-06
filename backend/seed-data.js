const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'DummyJson';

const sampleUsers = [
  { name: 'John Doe', email: 'john@example.com', age: 30 },
  { name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { name: 'Bob Johnson', email: 'bob@example.com', age: 35 }
];

async function seedData() {
  try {
    const client = await MongoClient.connect(MONGO_URI);
    const db = client.db(DB_NAME);
    
    await db.collection('users').insertMany(sampleUsers);
    console.log('Sample data inserted successfully');
    
    client.close();
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

seedData();