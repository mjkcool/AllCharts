const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const { getMelonChart, getGenieChart } = require('./API/Data.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api', (req, res) => {
    res.json({name:'kim'})
});

app.get('/api/melon', async (req,res) => {
    const melonChart = await getMelonChart();
    const genieChart = await getGenieChart();
    res.send({
        melon: melonChart,
        genie: genieChart
    });
})

app.listen(port, ()=>{
    console.log(`express is running on http://127.0.0.1:${port}/`);
})