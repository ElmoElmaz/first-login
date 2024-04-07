const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
require('dotenv').config()


const app = express();
app.use(bodyParser.json());


// MongoDB Connection 
const mongoURI = process.env.MONGO_URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error' ,err));



app.use('/api', authRoutes);

const PORT = 3800;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


