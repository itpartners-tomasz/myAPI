import express from 'express';
import logger from './middleware/logger.js';
import todoRouter from './routes/todoRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import { notFoundError } from './middleware/notFoundError.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(logger);
app.use('/api/todos/', todoRouter);
app.use(notFoundError);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});