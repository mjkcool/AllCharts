const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port =process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', (req, res)=> res.json({name:'mjkim'}));

app.listen(port, ()=>{
    console.log(`express is running on http://127.0.0.1:${port}/`);
})