import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import HospitalsRoutes from './routes/hospitals.routes';

const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
const corsOptions = {};
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my application' });
});

app.use('/api/hospitals', HospitalsRoutes);

export default app;