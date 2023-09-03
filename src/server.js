require("dotenv").config();

const express = require("express"); 
const app = express();
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
 
const port = process.env.PORT; 

// communication mode
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(morgan('dev')); 
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
 
// config routers
const router = require("./routers/Router"); 
app.use(router);

// database configuration
const conn = require("./db/conn"); 

conn
.sync()
.then(() => {
 app.listen(port);
})
.catch((err) => console.log(err));



