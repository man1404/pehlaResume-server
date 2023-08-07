const mongoose=require("mongoose")

const connectDB=async()=>{
    const conn=await mongoose.connect("mongodb+srv://user:1234@cluster1.vs4f1uy.mongodb.net/LOGIN?retryWrites=true&w=majority",{
        useNewUrlParser: true,
      useUnifiedTopology: true,
    })
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})
}

module.exports={
    connectDB
}