const express = require('express')
const route = require('./routes/route')
const mongoose = require('mongoose')
const app = express()


app.use(express.json())


mongoose.connect("mongodb+srv://Manasvi29:bharat2909@cluster0.r7a9dpa.mongodb.net/raftLabs?retryWrites=true&w=majority",
                  {
                    useNewUrlParser: true,
                  }
                )
                .then(() => console.log("MongoDb connected Successfully"))
                .catch((err) => console.log(err));


app.use('/',route)

app.listen(process.env.port || 3000, function(){
    console.log("Express app running on port " + (process.env.PORT || 3000))
})