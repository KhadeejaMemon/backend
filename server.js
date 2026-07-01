const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv")
const authRoutes=require("./routes/authRoutes")
const projectRoutes=require("./routes/projectRoutes")
const skillRoutes=require("./routes/skillRoutes")
const path = require("path");
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]); 
const contactRoutes=require("./routes/contactRoutes")
dotenv.config()
const app=express();
const cors = require('cors')
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
require("dotenv").config()



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "Uploads")));
app.use("/api/auth",authRoutes)
app.use("/api/projects",projectRoutes)
app.use("/api/skills", skillRoutes)
app.use("/api/contacts",contactRoutes)


// mongoose.connect(process.env.MONGO_URL,{
// }).then(()=>console.log("mongodb connection successfull")).catch((err)=>{
// console.log(err)
// });
let isConnected = false;



 async function connectToMongoDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URL);

  isConnected = true;

  console.log("MongoDB Connected");
}

  
app.use(async (req, res, next) => {
  try {
    await connectToMongoDB();
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Database connection failed" });
  }
});
app.get("/",(req,res)=>{
res.send("portfolio backend running")
});

module.exports=app;
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });