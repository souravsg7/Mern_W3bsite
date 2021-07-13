const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({

	 firstname : {
        type:String,
        required:true
    },
    lastname: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    gender: {
        type:String,
        required:true
    },  
    phone: {
        type:Number,
        required:true,
        unique:true
    },
    age: {
        type:Number,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    confirmpassword: {
        type:String,
        required:true
    },
    state:{
            type:String,
            required:true
    },
    address:{
      type:String,
      required:true
    }
})
//creating a collection

const User = new mongoose.model("User", userSchema);
module.exports = User ;