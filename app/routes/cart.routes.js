const router = require('express').Router();
// const Cart = require('../cart');
const Item = require('../food_items');

module.exports.get_cart_items = async (req,res) => {
    const userId = req.params.id;
    try{
        let cart = await Cart.findOne({userId});
        if(cart && cart.items.length>0){
            res.send(cart);
        }
        else{
            res.send(null);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

module.exports.add_cart_item = async (req,res) => {
    const userId = req.params.id;
    const { food_item_id, quantity } = req.body;

    try{
        console.log(food_item_id,quantity);
        let cart = await Cart.findOne({userId});
        let item = await food_items.findOne({_id: food_item_id});
        if(!item){
            res.status(405).send('Item not found!')
        }
        const price = item.price;
        const name = item.food_item_name;
        const qty = req.body.quantity;
        
        if(cart){
            // if cart exists for the user
            let itemIndex = cart.items.findIndex(p => p.food_item_id == food_item_id);

            // Check if product exists or not
            if(itemIndex > -1)
            {
                let productItem = cart.items[itemIndex];
                productItem.quantity = parseInt(productItem.quantity) + parseInt(qty);
                cart.items[itemIndex] = productItem;
            }
            else {
                cart.items.push({ food_item_id, name, quantity, price });
            }
            cart.bill += quantity*price;
            cart = await cart.save();
            return res.status(201).send(cart);
        }
        else{
            // no cart exists, create one
            const newCart = await Cart.create({
                userId,
                items: [{ food_item_id, name, quantity, price }],
                bill: quantity*price
            });
            return res.status(201).send(newCart);
        }       
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

module.exports.update_cart_item = async (req, res) => {
    const userId = req.params.id;
    const { food_item_id, qty } = req.body;

    try{
        let cart = await Cart.findOne({userId});
        let item = await Item.findOne({_id: food_item_id});

        if(!item)
            return res.status(404).send('Item not found!'); // not returning will continue further execution of code.
        
        if(!cart)
          return res.status(400).send("Cart not found");
        else{
            // if cart exists for the user
            let itemIndex = cart.items.findIndex(p => p.food_item_id == food_item_id);

            // Check if product exists or not
            if(itemIndex == -1)
              return res.status(404).send('Item not found in cart!');
            else {
                let productItem = cart.items[itemIndex];
                productItem.quantity = qty;
                cart.items[itemIndex] = productItem;
            }
            cart.bill = cart.items.reduce((sum, item) => sum + item.price * item.quantity,0);
            cart = await cart.save();
            return res.status(201).send(cart);
        }     
    }
    catch (err) {
        // just printing the error wont help us find where is the error. Add some understandable string to it.
        console.log("Error in update cart", err);
        res.status(500).send("Something went wrong");
    }
}

module.exports.delete_item = async (req,res) => {
    const userId = req.params.userId;
    const food_item_id = req.params.itemId;
    console.log(userId,food_item_id);
    try{
        let cart = await Cart.findOne({userId});
        console.log(cart);
        let itemIndex = cart.items.findIndex(p => p.food_item_id == food_item_id);
        if(itemIndex > -1)
        {
            let productItem = cart.items[itemIndex];
            cart.bill -= productItem.quantity*productItem.price;
            cart.items.splice(itemIndex,1);
        }
        cart = await cart.save();
        return res.status(201).send(cart);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}