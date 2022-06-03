const mongoose= require("mongoose")

mongoose.connect(
    process.env.MONGO_URI,
    {
            UseNewUrlParser :true ,
            UseUnifiedTopology: true 
    }
)
.then(()=> console.log("Successfuly connection to database"))
.catch((err)=>console.log(err))