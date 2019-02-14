const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');
const queryController = require('./queryController.js')
const app = express();
const PORT = 3477;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome back Aetos working with jarvis');
});

app.get('/cpuusage', queryController.getCpu, (req, res) => {
    res.json(res.locals);
});

app.get('/networktraffic', queryController.getNetworkTraffic, (req, res) => {
    res.json(res.locals);
});

app.get('/memusage', queryController.getMemUsage, (req, res) => {
    res.json(res.locals);
});

app.get('/nodecount', queryController.getNodeCount, (req, res) => {
    res.json(res.locals);
});

app.get('/cpuutilization', queryController.getCpuUtilization, (req, res) => {
    res.json(res.locals);
});

app.get('/saturation', queryController.getSaturation, (req, res) => {
    res.json(res.locals);
});

app.get('/memoryutilization', queryController.getMemoryUtilization, (req, res) => {
    res.json(res.locals);
});

app.get('/networksaturation', queryController.getNetworkSaturation, (req, res) => {
    res.json(res.locals);
});

app.listen(PORT, () => console.log(`AETOS node server is listening on PORT: ${PORT}`));
