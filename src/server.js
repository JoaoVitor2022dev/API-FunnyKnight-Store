require("dotenv").config();

const express = require("express"); 
const app = express();
const cors = require("cors");
const path = require("path");
 
const port = process.env.PORT; 

// communication mode
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
 
// upload diretory 
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

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



