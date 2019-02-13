const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3477;

const data = [
    { time: 1, pods: 3 },
    { time: 2, pods: 2 },
    { time: 3, pods: 3 },
    { time: 4, pods: 1 },
    { time: 5, pods: 2 },
    { time: 6, pods: 3 },
    { time: 7, pods: 4 },
    { time: 8, pods: 3 }
]

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome back Aetos working with travis');
});

app.get('/data', (req, res) => {
    res.json(data);
});

app.listen(PORT, () => console.log(`AETOS node server is listening on PORT: ${PORT}`));