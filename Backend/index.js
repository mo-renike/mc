const express = require('express');
const cors = require('cors')
const config = require('config');
const morgan = require('morgan')
const sequelize = require('./src/lib/database/connection')
const serverConfig = config.get('databaseConfig');
const landRouter = require('./src/api/landRouter')
const jobService = require('./jobs/cron')
const terraceRouter = require('./src/api/terraceRouter')
const registerRouter = require('./src/api/registerRouter');
const os = require('os');
const cluster = require('cluster');


const num_cpu = os.cpus().length;

const checkConnectionStatus = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

checkConnectionStatus()
sequelize.sync()


jobService.initJob('0 * * * * *');
jobService.startJob();

async function startServer() {

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(morgan('dev'))

  app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Methods', '*');
    res.append('Access-Control-Allow-Headers', '*');
    res.append('Access-Control-Allow-Credentials', true);
    next();
  });

  app.use("/api/v1/terrace", terraceRouter);
  app.use("/api/v1/registration", registerRouter);
  app.use("/api/v1/land", landRouter);
  app.get('/', (req, res) => {
    res.send("hello")
  })

  app.listen(serverConfig.serverPort || 3000, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`server is ready ! process id ${process.pid}`);
  });
}

startServer();

