const router = require('express').Router();
const async = require('hbs/lib/async');
let Reserv = require('../Reservation')

router.route('/').post(async(req, res) => {
   
    try{
        console.log(req.body);
        let reserv = await Reserv.findOne({To: {$gte:req.body.From},From: {$lte:req.body.From}, Date1 : req.body.Date1,Table:req.body.Table});
        console.log(req.body);
        console.log(reserv);
        if(!reserv)
        {
            const newReserv = await Reserv.create({
                
                From:req.body.From,
                To:(parseInt(req.body.From)+parseInt(6)),
                Date1:req.body.Date1,
                Table:req.body.Table,
                Message:req.body.Message,
                Name:req.body.Name,
                email:req.body.email,
                phone:req.body.phone,

              });
              newR = await newReserv.save();
              return res.status(201).send(newR);
       
        }
        else
        {
            return res.status(406).send("alredy exist");
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send(err);
    }

})


module.exports = router;

