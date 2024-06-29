let express=require("express")
let app=express();
require("dotenv").config();
let cors=require("cors");
const { connection } = require("./connection");
app.use(cors());
app.use(express.json())
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken");
const { Users } = require("./userSchema");    
const {GiftRouter}=require("./giftRouter");
const { authenticate } = require("./middleware");





app.use("/gift",GiftRouter)

app.post("/signup",async function(req,res){
let {email,password}=req.body;

let obj=await Users.findOne({email});
if(obj){
    res.send("Email already exists")
}
else{

    const hash = bcrypt.hashSync(password, 6);
    let obj=req.body;
    obj.password=hash;
    await Users.create(obj);
    res.send("Successfully Signup")
}
})

app.post("/login", async function (req, res) {
    let { email, password } = req.body;
    let obj = await Users.findOne({ email });
  
    if (obj) {
      let ans = bcrypt.compareSync(password, obj.password);
  
      if (ans === false) {
        res.status(203).send("Wrong credentials"); // 401 Unauthorized
      } else {
        var token = jwt.sign({ userId: obj._id }, process.env.SECRET_KEY);
        res.status(200).send({ "msg": "Successfully login", token }); // 200 OK
      }
    } else {
      res.status(204).send("Email doesn't exist, Please sign up first"); // 404 Not Found
    }
});
  
//for adding any product to wishlist
app.patch("/user/wishlist",authenticate,async function(req,res){
    await Users.findByIdAndUpdate(req.userID,req.body) 
    res.send("Successfuly added produt in wishlist")
})

//for adding any product to cart
app.patch("/user/cart",authenticate,async function(req,res){
    await Users.findByIdAndUpdate(req.userID,req.body) 
    res.send("Succesfully added product in cart")
})

//for adding final product selected by a user
app.patch("/user/order",authenticate,async function(req,res){
    const userData=await Users.findById(req.userID)
    userData.completedOrderArray=req.body
    await Users.findByIdAndUpdate(req.userID,userData)
    res.send("Suceesfully added final order")
})

//for adding address
app.patch("/user/address",authenticate,async function(req,res){
   
    await Users.findByIdAndUpdate(req.userID,{address:req.body})
 
    res.send("Address Upadted")
})
 
app.get("/user",authenticate,async function(req,res){
  const obj=  await Users.findById(req.userID)
    res.send({data:obj})
})

app.patch("/user/remove/wishlist/:id",authenticate,async function(req,res){
    const {id}=req.params;
    await Users.findByIdAndUpdate(id,{wishlist:req.body});
    res.send("Gift successfully remove from wishlist")
})

app.patch("/user/remove/cart/:id",authenticate,async function(req,res){
    const {id}=req.params;
    // const {cart,deleteArr}=req.body
    await Users.findByIdAndUpdate(id,{cart:req.body});
    res.send("Gift successfully remove from cart")
})

app.patch("/user/quantity/:id/:quantity",authenticate,async function(req,res){
    const {id,quantity}=req.params;
    const obj =await Users.findById(req.userID)
  
    const newCartArr=obj.cart.map((ele,idx)=>{
        return(
            ele._id==id?{...ele,quantity}:ele
        )
    })
    const newFixedArr=obj.completedOrderArray.map((ele,idx)=>{
        return(
            ele._id==id?{...ele,quantity}:ele
        )
    })
   
    await Users.findByIdAndUpdate(req.userID,{cart:newCartArr,completedOrderArray:newFixedArr})
    res.send("Quantity updated")
}) 

app.listen(process.env.PORT,async function(){
    try{
await connection;

    }
    catch(err){
        console.log(err);
    }
})

