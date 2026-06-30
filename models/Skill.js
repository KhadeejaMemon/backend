const mongoose=require("mongoose");
const skillSchema=new mongoose.Schema({
name:{
type:String,
required:true,
},
category: {
      type: String,
      required:true
    },
level:{
type:String,
required:true,
},
image:{
type:String,
},
},
{
  timestamps: true
}
);
module.exports=mongoose.model("Skill",skillSchema);