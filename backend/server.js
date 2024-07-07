import express  from 'express';
import connectDB from './db/index.js';
import dotenv from 'dotenv';
dotenv.config();
import authRoute from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import productRoute from './routes/productRoute.js'
import cors from 'cors';
// connecting db
connectDB();

const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());



// routes
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/category',categoryRoute);
app.use('/api/v1/products',productRoute);





// rest api

app.listen(3000, () => {  
  console.log('Server started on http://localhost:3000');
});