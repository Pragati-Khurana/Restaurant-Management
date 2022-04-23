const router = require('express').Router();
let Food_Items = require('../food_items')

router.route('/all').get((req, res) => {
    Food_Items.find()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {console.log(err)})
});

router.route('/:id').get((req, res) => {
    Food_Items.findById(req.params.id)
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {console.log(err)})
});

router.route('/add_food').post((req, res) => {
    const food_items = new Food_Items(req.body)
    food_items.save()
    .then((result) => {
        res.json('Food item added')
    })
})

module.exports = router;