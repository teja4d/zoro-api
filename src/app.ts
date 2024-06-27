import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJson from './docs/swagger.json';
import connectDB from './database/database';
import { RegisterRoutes } from './routes/routes';

const app = express();

// Middleware
app.use(bodyParser.json());
//cors
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
//swagger.json
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerJson);
});

// Routes
RegisterRoutes(app);

//missing routes
app.use(function notFoundHandler(_req, res: express.Response) {
    res.status(404).send({
        message: "Not Found",
    });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err.status) {
        res.status(err.status).json({ message: err.message });
    } else {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



//connect to database
connectDB();

export default app;