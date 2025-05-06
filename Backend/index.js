import express from 'express'
import authRoute from './router/auth-router.js';
import connectDb from './utils/db.js';

const app = express();
const port = 3000;

//middleware
app.use(express.json())

//routes
app.use("/api/auth", authRoute);

connectDb().then(()=>{
    app.listen(port,()=>{
        console.log(`App Running on port ${port}`)
    })
}).catch((error)=>{
    console.log("connection feiled",error);
})

