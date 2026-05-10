const Fitness = require('../Modals/fitness')
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');

exports.register = async(req,res)=>{
    try{
        const{username,password,profilePic,email} = req.body;

        const isExist = await Fitness.findOne({username});

        if(isExist){
            res.status(400).json({
                error:"User already exists"
            })
        }
        else{
            const hashedPassword = await bcrypt.hash(password,10)
            console.log(hashedPassword)


            const newFitness = new Fitness({username,password : hashedPassword,profilePic,email});
            await newFitness.save();
            
            res.status(201).json({ message:'User registered successfully',success:"yes",data:newFitness });
        }
    }catch(err){
        res.status(500).json({
            error:"Server Error"
        })
    }
}  

const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'LAX'
};


exports.login = async(req,res)=>{
    try{       
        const {username,password} = req.body;
        const fitness = await Fitness.findOne({username});

        if(fitness && await bcrypt.compare(password,fitness.password)){

            const token = jwt.sign({fitness_id:fitness._id},process.env.JWT_SecretKey);

            res.cookie("cookie_token",token,cookieOptions)

            res.json({message:"Login Success",success:"true",fitness,token});

        }else{
            res.status(400).json({error:"Invalid Credentials"});
        }


    }catch(err){
        res.status(500).json({
            error:"Server Error"
        })
            
    }
}


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});


exports.resetPassword=async (req,res) => {
    try{
        const {email,newPassword} = req.body;
        const fitness = await Fitness.findOne({email});

        if(!fitness){
            return res.status(400).json({error:'Some technical issue, please try again later'});

        }

        const hashedPassword = await bcrypt.hash(newPassword,10);
        fitness.password = hashedPassword;
        fitness.resetPasswordToken = undefined;
        fitness.resetPasswordExpires = undefined;

        await fitness.save();

        res.status(200).json({message:"Password Reset Successfully"})

    }catch(err){
        res.status(500).json({
            error:"Server Error"
        })
    }
}

exports.logout = async ()=>{
    res.clearCookie('cookie_token', cookieOptions).json({ message: 'Logout successful' });
}
