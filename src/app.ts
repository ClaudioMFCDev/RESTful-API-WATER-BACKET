import express from "express";

import jugsRoute from './routes/jugsRoute';

const app = express();

// middleware
app.use(express.json());

// rutas
app.use('/api/jugs', jugsRoute);