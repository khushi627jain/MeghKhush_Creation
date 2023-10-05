const mongoose = require("mongoose");

const categoryEnum = [
  "explosion",
  "frame",
  "bouquet",
  "mantra frame",
  "wedding",
  "home decor",
  "nameplate",
  "resin gifts",
  "phone cover",
  "wooden box",
  "ring platter",
  "keychain",
  "random",
  "wall hanging",
  "return gift",

];

const occasionEnum = [
  "anniversary",
  "birthday",
  "proposal",
  "baby shower",
  "raksha bandhan",
  "valentine day",
  "marriage",
  "spiritual",
"engagement",
"inauguration",
  "houseWarming",
];

const tagsEnum = [
  "mother",
  "father",
  "husband",
  "wife",
  "girlfriend",
  "boyfriend",
  "him",
  "her",
  "friend",
  "decor",
  "budget friendly",
  "expensive and royal",
  "family",
  "spirituality",
  "inauguration",
  "houseWarming",
  "sister",
  "brother",
  "unique",
  "couple",
"office",
"wedding"
];

const giftSchema = mongoose.Schema({
  title: String,
  category: {
    type: [String],
    enum: categoryEnum
  },
  realPrice: Number,
  price: Number,
  occasion: {
    type: [String],
    enum: occasionEnum
  },
  tags: {
    type: [String],
    enum: tagsEnum
  },
  description: String,
  size: String,
  makingTime: String,
  deliveryTime: String,
  image: [String],
  video: [String],
  popular:Boolean
});

const Gift = mongoose.model("Gift", giftSchema);

module.exports = {Gift};


// {
//     "title":"Navkar Mantra Frame",
//     "description":"The customizable Navkar Mantra frame is a visually appealing representation of devotion. It can be personalized with a preferred mantra, size, color, and design. This frame radiates positivity, spreading its uplifting energy and invoking the blessings of the associated deity. Its presence enhances the spiritual atmosphere, promoting harmony and tranquility.",
//     "price":5200,
//     "realPrice":7000,
//     "occasion":["marriage","anniversary","spiritual"],
//     "tags":["mother","father","family","expensive and royal","spirituality"],
//     "category":["mantra frame","home decor","resin gifts"],
//     "image":["https://i.imgur.com/fYBNFJg.jpg","https://i.imgur.com/jAppxeD.jpg","https://i.imgur.com/CdcBei1.jpg"],
//     "video":[],
//     "size":"25 by 20 inch",
//     "makingTime":"3 to 20 days",
//     "deliveryTime":"4 to 10 days",
//     "popular":true
//  }
