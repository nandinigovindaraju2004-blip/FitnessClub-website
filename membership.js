const Membership = require('../Modals/membership');



exports.addMembership = async (req,res)=>{
    try{
        const {months, price} = req.body;
        const memberShip = await Membership.findOne({fitness:req.fitness._id,months});
        if(memberShip){
            memberShip.price = price;
            await memberShip.save();
            res.status(200).json({
                message:"Updated Successfully"
            })
        }else{
            const nuwMembership = new Membership({price,months,fitness:req.fitness._id});
            await nuwMembership.save();
            res.status(200).json({
                message:"Added Successfully",
                data:nuwMembership
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"Server Error"
        })
    }
}


exports.getmembership=async(req,res)=>{
    try{
        const loggedInId = req.fitness._id;
        const memberShip = await Membership.find({fitness:loggedInId});
        res.status(200).json({
            message:"Membership Fetched Successfully",
            memberShip: memberShip
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"Server Error"
        })
    }
}