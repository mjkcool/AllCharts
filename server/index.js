const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const { getMelonChart } = require('./API/Data.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api', (req, res) => {
    res.json({name:'kim'})
});

app.get('/api/melon', async (req,res) => {
    const melonChart = await getMelonChart();
    res.send({
        melon: melonChart
    });
})

app.listen(port, ()=>{
    console.log(`express is running on http://127.0.0.1:${port}/`);
})