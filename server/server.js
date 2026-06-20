const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const requireActiveUser = require('./middleware/requireActiveUser');
const errorHandler = require('./middleware/errorHandler');
const { port } = require('./config/env');

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api', requireActiveUser);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
