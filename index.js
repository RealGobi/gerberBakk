
const express = require('express');
const path = require('path');
const app = express();


//Bodyparser Middleware

app.use(express.json());

//cors-error handeling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, x-auth-token, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
   next(); 
});

app.get("/", (req, res) => {
    res.status(200).send("hej hej!");
  });

app.use('/gerber', require('./gerber/gerber'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));