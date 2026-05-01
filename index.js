const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config()

const PORT = process.env.PORT;

app.use(cors({
  origin: 'http://localhost:3000',
  credential: true
}))

app.use(cookieParser());
app.use(express.json());
require('./DBConn/conn');

const fitnessRoutes = require('./Routes/fitness');
const MembershipRoutes = require('./Routes/membership');

app.use('/auth',fitnessRoutes);
app.use('/plans',MembershipRoutes);

app.listen(PORT,()=>{
  console.log("Server is running on Port",PORT)
})