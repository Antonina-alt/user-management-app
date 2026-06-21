const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const corsOptions = require('./config/cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const requireActiveUser = require('./middleware/requireActiveUser');
const errorHandler = require('./middleware/errorHandler');
const { port, nodeEnv } = require('./config/env');

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api', requireActiveUser);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

if (nodeEnv === 'production') {
  const clientDistPath = path.join(__dirname, '..', 'client', 'dist');

  app.use(express.static(clientDistPath));

  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});