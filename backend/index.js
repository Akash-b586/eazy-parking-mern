import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import authRoute from './routes/authRoute.js'
import getLocationsRoute from './routes/getParkingLot.js'
import adminAuthRoute from './routes/admin/authRoute.js'
import addParkingLotRoute from './routes/admin/addParkingLot.js'

const app = express();

const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoute)
app.use('/api/locations', getLocationsRoute);
app.use('/api/admin/addParkingLot', addParkingLotRoute);
app.use('/api/admin/auth', adminAuthRoute);

app.get('/', (req, res) => {
    res.send('Hello, World! pyaaare kushagra');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});