const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/Carry",{
	useNewUrlParser:true,
	useUnifiedTopology:true,
	useCreateIndex:true
}).then(()=>{
	console.log(`Connection Sucessful`);
}).catch((e)=>{
	console.log(`No Connection`)
})