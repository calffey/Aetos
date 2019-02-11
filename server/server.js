const express = require('express');

const app = express();
const PORT = 3477;

app.get('/', (req, res) => {
    res.send('Welcome back Aetos this is working');
});

app.listen(PORT, () => console.log(`AETOS node server is listening on PORT: ${PORT}`));