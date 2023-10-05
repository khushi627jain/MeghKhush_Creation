let mongoose=require("mongoose")

const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: Number,
      required: true
    },
    cart:Array,
    wishlist:Array,
 address:Object,
    completedOrderArray:Array,
  });

let Users=mongoose.model("userDetails",userSchema)

// {
//   "name":"khushi",
//   "email":"khushi@gmail.com",
//   "password":"khushi",
//   "phoneNumber":1234567890
// }



module.exports={Users}