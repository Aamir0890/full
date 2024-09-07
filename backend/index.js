const express=require('express');
const app=express();

const cors = require('cors');


// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', 
  optionsSuccessStatus: 200 
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

const PORT=8000;


const db = require('./models')

const userRoutes=require('./routes/index')

app.use(express.json());


app.use('/api',userRoutes);

db.sequelize.sync().then(() => {
    console.log("database connected")
    app.listen(PORT, () => {
        console.log("App is listening in port 8000");
    })
}).catch((err) => {
    console.log("unable to connect to database", err)
})







