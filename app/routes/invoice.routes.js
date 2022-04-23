const router = require('express').Router();
let Invoice = require('../invoice')

router.route('/all').get((req, res) => {
    Invoice.find()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {console.log(err)})
});

router.route('/add_invoice').post((req, res) => {
    const invoice = new Invoice(req.body)
    invoice.save()
    .then((result) => {
        res.json('Invoice added')
    })
})

module.exports = router;