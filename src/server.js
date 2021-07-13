const express=require("express");
const path=require("path");
const app=express();
const hbs=require("hbs");

require("./db/conn");
const User=require("./models/users.js");

const port =process.env.PORT || 5000;

const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");


require("dotenv").config();
const nodemailer = require("nodemailer");
const config = require("../config/auth.config");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);


app.get("/", (req,res)=>{
	res.render("index");
});
app.get("/register", (req,res)=>{
	res.render("register");
});
app.get("/login",(req,res)=>{
	res.render("login");

});
//create a new user in database;
app.post("/register", async (req,res)=>{
	try{
		const password = req.body.password;
		const cpassword = req.body.confirmpassword;

		if(password === cpassword){
			const registerEmployee = new User({
				firstname : req.body.firstname,
				lastname : req.body.lastname,
				email : req.body.email,
				gender : req.body.gender,
				phone : req.body.phone,
				age : req.body.age,
				password : password,
				confirmpassword : cpassword,
				state:req.body.state,
				address:req.body.address
			})

			const registered = await registerEmployee.save();
			res.status(201).render("index");

		}else{
			res.send("Password Are Not Matching");
		}

	}
	catch(error){
		res.status(400).send(error);
	}
	
});
var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);

app.post("/login", async(req,res)=>{
				try{
					const email=req.body.email;
					const password=req.body.password;

					const useremail = await User.findOne({email});

					if(useremail.password===password){
					    const transporter = nodemailer.createTransport({
					    host: 'smtp.ethereal.email',
					    port: 587,
					    auth: {
						user: config.user,
						pass: config.password
					    }
					});

					// send email
					await transporter.sendMail({
					    from: 'from_address@example.com',
					    to: 'to_address@example.com',
					    subject: 'Test Email Subject',
					    text: 'Example Plain Text Message Body'
					});

		res.status(201).send("You Are Logged In Kindly Verify Your Email");
		if(req.body.otp==otp){
			res.send("You has been successfully registered");
		    }
		    else{
			res.render('otp',{msg : 'otp is incorrect'});
		  };

		}else{
			res.send("Invalid Login Credentials")
		}		
	}
	catch(error){
		res.status(400).send("Invalid Login Credentials");
	}
	
	

});


app.listen(port, ()=>{
	console.log(`Server running on localhost:${port}`)
})
