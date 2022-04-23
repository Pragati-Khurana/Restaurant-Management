const router = require('express').Router();
let Order = require('../order')

router.route('/all').get((req, res) => {
    Order.find()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {console.log(err)})
});

router.route('/add_order').post((req, res) => {
    const order = new Order(req.body)
    order.save()
    .then((result) => {
        res.json('Order added')
    })
})

module.exports = router;