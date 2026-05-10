const Member = require('../Modals/member');
const Membership = require('../Modals/membership')


function addMonthsToDate(months,joiningDate){

    let today = joiningDate;
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    const futureMonth = currentMonth + months;
    const futureYear = currentYear + Math.floor(futureMonth /12);

    const adjustedMonth = futureMonth %12;

    const futureDate = new Date(futureYear, adjustedMonth, 1);

    const lastDayOfFutureMont = new Date(futureYear, adjustedMonth +1, 0).getDate();

    const adjustedDay = Math.min(currentDay, lastDayOfFutureMonth);

    futureDate.setDate(adjustedDay);

    return futureDate;
}

exports.registerMember = async(req,res)=>{
    try{
        const {name,mobileNo,address,membership,profilePic,joiningDate} = req.body;
        const member = await Member.findOne({fitness:req.fitness._id,mobileNo});
        if(member){
            return res.status(409).json({ error: 'Already registered with this Mobile No' });
        }

        const memberShip = await Membership.findOne({_id:membership,fitness:req.fitness._id});
        const membershipMonth = memberShip.months;
        if(memberShip){
            let jngDate = new Date(joiningDate);
            const nextBillDate = addMonthsToDate(membershipMonth,jngDate);
            let newmember = new Member({name,mobileNo,address,membership,fitness:req.fitness._id,profilePic,nextBillDate});
            await newmember.save();
            res.status(200).json({message:"Member Registered Successfully",newmember});

        }else{
            return res.status(409).json({error:"No such Membership are there"})
        }

    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Server error' });
    }
}

exports.monthlyMember = async(req,res)=>{
    try{
        const now = new Date();

        //  Get the first day of the current month (e.g., 2024-11-30 00:00:00)
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // Get the last day of the current month (e.g., 2024-09-30 23:59:59)
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

        const member = await Member.find({fitness:req.fitness._id,
            createdAt: {
                $gte: startOfMonth,  // Greater than or equal to the first day of the month
                $lte: endOfMonth     // Less than or equal to the last day of the month
            }
        }).sort({ createdAt: -1 });

        res.status(200).json({
            message:member.length?"Fetched Members SuccessFully":"No Such Member Registered yet",
            members:member,
            totalMembers:member.length
        })


    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Server error' });
    }
}

exports.expiringWithin3Days= async(req,res)=>{
    try{
        const today = new Date();
        const nextThreeDays = new Date();
        nextThreeDays.setDate(today.getDate() + 3);

        const member = await Member.find({fitness:req.fitness._id,
            nextBillDate: {
                $gte: today,
                $lte: nextThreeDays
            }
        });

        res.status(200).json({
            message:member.length?"Fetched Members Successfully":"No Such Membership Expiring Within 3 Days",
            members:member,
            totalMembers:member.length
        })

    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Server error' });
    }
}

exports.expiringWithIn4To7Days = async(req,res)=>{
    try{
        const today = new Date();
        const next4Days = new Date();
        next4Days.setDate(today.getDate()+4);

        const next7Days=new Date();
        next7Days.setDate(today.getDate()+7);

        const member = await Member.find({fitness:req.fitness._id,
            nextBillDate: {
                $gte: next4Days,
                $lte: next7Days
            }
        });

        res.status(200).json({
            message:member.length?"Fetched Members Successfully":"No Such Membership Expiring Within 4 To 7 Days",
            members:member,
            totalMembers:member.length
        })

    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Server error' });
    }
}

exports.expiredMember = async(req,res)=>{
    try{
        const today = new Date();

        const member = await Member.find({fitness:req.fitness._id,
            nextBillDate:{
                $lt: today
            }
        })

        res.status(200).json({
            message:member.length?"Fetched Members Successfully":"No Such Membership Expired",
            members:member,
            totalMembers:member.length
        })

    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Server error' });
    }
}


exports.inActiveMember = async(req,res)=>{
    try{
        const member = await Member.find({fitness:req.fitness._id});
        res.status(200).json({
            message:member.length?"Fetched Members Successfully":"No Such Membership is Pending",
            member:member,
            totalMembers:member.length
        })

    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Server error' });
    }
}

