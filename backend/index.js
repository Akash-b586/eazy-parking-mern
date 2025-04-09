import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import authRoute from './routes/authRoute.js'
import getLocationsRoute from './routes/getParkingLot.js'
import adminAuthRoute from './routes/admin/authRoute.js'
import addParkingLotRoute from './routes/admin/addParkingLot.js'
import getPastBookingsRoute from './routes/user/getPastBookings.js'
import categoryRoutes from './routes/admin/categoryRoutes.js'
import showRegisteredUsersRoute from './routes/admin/showRegisteredUsers.js'
import generateReportRoute from './routes/admin/generateReport.js'
import getparkingsRoute from './routes/user/getParkings.js'

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
app.use('/api/user/getPastBookings', getPastBookingsRoute);
app.use('/api/admin/category', categoryRoutes);
app.use('/api/admin/showRegisteredUsers', showRegisteredUsersRoute);
app.use('/api/admin/generateReport', generateReportRoute);
app.use('/api/user/getParkings', getparkingsRoute);

app.get('/', (req, res) => {
    res.send('Hello, World! pyaaare kushagra');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});