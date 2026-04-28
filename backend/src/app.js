import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
const allowedOrigins = new Set([
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
].filter(Boolean));

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser tools and same-origin requests with no Origin header
    if (!origin) return callback(null, true);

    // Explicit allowlist first
    if (allowedOrigins.has(origin)) return callback(null, true);

    // In development, allow LAN Vite hosts (http://<lan-ip>:5173)
    if (
      process.env.NODE_ENV !== 'production' &&
      /^http:\/\/(?:\d{1,3}\.){3}\d{1,3}:5173$/.test(origin)
    ) {
      return callback(null, true);
    }

    return callback(new Error('CORS: Origin not allowed'));
  },
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check
app.get('/health', (req, res) => res.send('API is running...'));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/public', publicRoutes);
app.use('/api/v1/admin', adminRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
