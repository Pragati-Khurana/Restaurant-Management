require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const app = express();

  
  const PORT = process.env.PORT || 3000;
  
  app.listen(PORT, () => {
    console.log(`Port Listening on ${PORT}`);
  });
  
app.use(express.json());

//routing
const userRouter = require('./app/routes/user.routes');
app.use('/user',userRouter);

const catRouter = require('./app/routes/category.routes');
app.use('/category',catRouter);

const food_itemsRouter = require('./app/routes/food_items.routes');
app.use('/food_items',food_itemsRouter);

const orderRouter = require('./app/routes/order.routes');
app.use('/order',orderRouter);

const invoiceRouter = require('./app/routes/invoice.routes');
app.use('/invoice',invoiceRouter);

const reservationRouter = require('./app/routes/reservation.routes');
app.use('/Reserve',reservationRouter);

const cartRouter = require('./app/routes/cart.routes');
app.use('/Cart/',cartRouter.add_cart_item);

const path = require("path");
const static_path = path.join(__dirname,"public");
app.use(express.static(static_path));
app.set("view engine","hbs");

app.get("/",(req,res)=>{
  res.render("index");
});

app.get("/team.html",(req,res)=>{
  res.render("team");
});

app.get("/about.html",(req,res)=>{
  res.render("about");
});

app.get("/menu.html",(req,res)=>{
  res.render("menu");
});

app.get("/order.html",(req,res)=>{
  res.render("order");
});

app.get("/logout.html",(req,res)=>{
  res.render("logout");
});

app.get("/reservation.html",(req,res)=>{
  res.render("reservation");
});

app.get("/login.html",(req,res)=>{
  res.render("login");
});

app.get("/registration.html",(req,res)=>{
  res.render("registration");
});

  mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase Connected...");
  })
  .catch((err) => {
    console.log(err);
  });