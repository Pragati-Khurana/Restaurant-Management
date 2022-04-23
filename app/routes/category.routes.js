const router = require('express').Router();
let Category = require('../category')

router.route('/all').get((req, res) => {
    Category.find()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {console.log(err)})
});

router.route('/add_cat').post((req, res) => {
    const category = new Category(req.body)
    category.save()
    .then((result) => {
        res.json('Category added')
    })
})

module.exports = router;