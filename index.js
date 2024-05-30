const express=require('express');
const app=express();
const port=5000
const mongoDb=require("./db")
const cors = require('cors');
mongoDb();
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Header",
//         "Origin,X-Requested-With,Content-Type,Accept"
//     );
//     next();
// })
app.use(cors( {origin: 'http://localhost:3000'}));

app.get('/',(req,res)=>{
    res.send('Hello World')
})
app.use(express.json())
app.use('/api',require("./Routes/CreateUser"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))


app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
})