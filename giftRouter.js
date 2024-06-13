
 
const {Gift} =require("./giftSchema")
const express=require("express");
const { authenticate } = require("./middleware");
const GiftRouter=express.Router();


GiftRouter.get("/",async function(req,res,next){

    let query = Gift.find();

let {tags,occasion,category,priceType,price,name,page}=req.query


if(priceType){
  if(priceType==="asc"){ 
  query=query.sort({price:1})
  }
  else{
    query=query.sort({price:-1})
  }
}


if(name){
  query=query.where({
    $or:[
      {title:{$regex:name,$options:"i"}},
      {description:{$regex:name,$options:"i"}}
    ]
  })
}


if(tags){
  query=query.where("tags").in(tags)
  }
  
  if(occasion){
    query=query.where("occasion").in(occasion)
  }
  
  if(category){
    query=query.where("category").in(category)
  }
  
if(price){
const priceArr=price.map((ele,idx)=>{
  if(ele=="4000+"){
    return {$gte:parseInt(ele)}
  }
   const[minPrice,maxPrice]=ele.split("-");  
   return {$gte:Number(minPrice),$lte:Number(maxPrice)}
})
query=query.where({
  $or:
    priceArr.map((ele)=>({price:ele}))
  
})
}


const totalGifts=await Gift.countDocuments(query);
query=query.skip((page-1)*8).limit(8);

query.exec((err, obj) => {
  if (err) {
    // Handle the error appropriately
    return res.status(500).send({ error: "An error occurred" });
  }
  res.send({ data: obj,totalGifts});
});


})

GiftRouter.get("/category/:type",async function(req,res,next){

  let query = Gift.find();
let type=req.params.type;

let {tags,occasion,category,priceType,price,name,page}=req.query
if(type=="anniversary"||type==
"birthday"||type==
"proposal"||type==
"baby shower"||type==
"raksha bandhan"||type==
"valentine day"||type==
"marriage"||type==
"spiritual"||type==
"engagement"||type==
"inauguration"||type==
"houseWarming")
occasion=[type];
else if(type=="explosion"||type=="frame"||type=="bouquet"||type=="mantra frame"||type=="wedding"||type=="home decor"||type=="nameplate"||type=="resin gifts"||type=="phone cover"||type=="wooden box"||type=="ring platter"||type=="keychain"||type=="random"||type=="wall hanging"||type=="return gift"){
category=[type]
}
else
 tags=[type];




if(priceType){
if(priceType==="asc"){ 
query=query.sort({price:1})
}
else{
  query=query.sort({price:-1})
}
}

if(name){
query=query.where({
  $or:[
    {title:{$regex:name,$options:"i"}},
    {description:{$regex:name,$options:"i"}}
  ]
})
}


if(tags){
query=query.where("tags").in(tags)
}

if(occasion){
  query=query.where("occasion").in(occasion)
}

if(category){
  query=query.where("category").in(category)
}

if(price){
const priceArr=price.map((ele,idx)=>{
if(ele=="4000+"){
  return {$gte:parseInt(ele)}
}
 const[minPrice,maxPrice]=ele.split("-");  
 return {$gte:Number(minPrice),$lte:Number(maxPrice)}
})
query=query.where({
$or:
  priceArr.map((ele)=>({price:ele}))

})
}


const totalGifts=await Gift.countDocuments(query);

query=query.skip((page-1)*8).limit(8);

query.exec((err, obj) => {
if (err) {
  // Handle the error appropriately
  return res.status(500).send({ error: "An error occurred" });
}
res.send({ data: obj,totalGifts});
});


})

GiftRouter.get("/all",async function(req,res,next){

  let query = Gift.find();

let {tags,occasion,category,priceType,price,name,page}=req.query


if(priceType){
if(priceType==="asc"){
query=query.sort({price:1})
}
else{
  query=query.sort({price:-1})
}
}

if(name){
query=query.where({
  $or:[
    {title:{$regex:name,$options:"i"}},
    {description:{$regex:name,$options:"i"}}
  ]
})
}

if(tags){
query=query.where("tags").in(tags)
}

if(occasion){
  query=query.where("occasion").in(occasion)
}

if(category){
  query=query.where("category").in(category)
}

if(price){
const priceArr=price.map((ele,idx)=>{
if(ele=="4000+"){
  return {$gte:parseInt(ele)}
}
 const[minPrice,maxPrice]=ele.split("-");  
 return {$gte:Number(minPrice),$lte:Number(maxPrice)}
})
query=query.where({
$or:
  priceArr.map((ele)=>({price:ele}))

})
}


const totalGifts=await Gift.countDocuments(query);


// query=query.skip((page-1)*6).limit(6);

query.exec((err, obj) => {
if (err) {
  // Handle the error appropriately
  return res.status(500).send({ error: "An error occurred" });
}
res.send({ data: obj,totalGifts});
});


})

GiftRouter.get("/popular",async function(req,res,next){
let allGift=Gift.find();
allGift=allGift.where({popular:true})  

allGift.exec((err,obj)=>{
  res.send({data:obj})
})
})

GiftRouter.get("/single/:id",async function(req,res,next){
let query= Gift.findById(req.params.id)
query.exec((err,obj)=>{
    if(err){
        return res.status(500).send({error:"An error occured"})
    }
    res.send({data:obj})
})
})

GiftRouter.post("/",async function(req,res,next){
    await Gift.create(req.body);
    res.send("Gifts successfully added")
}) 

GiftRouter.delete("/:id",async function(req,res,next){

await Gift.findByIdAndDelete(req.params.id);
res.send("Successfully Deleted")
})

GiftRouter.patch("/:id", async function(req, res, next) {
  try {
    const updatedGift = await Gift.updateOne({ _id: req.params.id }, { $set: req.body });
    if (updatedGift.nModified === 0) {
      return res.status(404).send("Item not found");
    }

    return res.status(200).json(updatedGift);
  } catch (error) {
    return res.status(500).send("Error updating item: " + error.message);
  }
 
 
});

module.exports={GiftRouter}