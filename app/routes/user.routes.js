const router = require('express').Router();
let User = require('../user')
router.route('/add_user').post((req, res) => {
    const user = new User(req.body)
    user.save()
    .then((result) => {
        res.status(201).json('user added')
    })
});

router.route('/user_all').get((req, res) => {
    User.find()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {console.log(err)})
});


router.route('/login').post((req,res)=> {
    User.findOne({user_email:req.body.user_email})
   .then(user=>{
       if(!user)
       {
           return res.status(400).json({msg:"user not found"});
       }
       else
       {
           console.log(user);
           console.info(user.user_password);
           if(req.body.user_password==user.user_password)
           {
            return res.json(user);
           }
           else
           {
            return res.status(400).json({msg:"password mismatched"});   
           }
       }
   })
   .catch(err=>res.status(400).json('Error' + err));
});


router.route('/update_user/:id').put(function(req,res){
    User.findByIdAndUpdate(req.params.id,req.body)
    .then(user=>res.json(user))
    .catch(err=>res.status(400).json('Error' + err));
})

router.route('/delete_user/:id').delete((req,res)=> {
    User.findByIdAndRemove(req.params.id)
   .then(user=>res.json(user))
   .catch(err=>res.status(400).json('Error' + err));
});

module.exports = router;