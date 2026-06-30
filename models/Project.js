const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
{
title:{
type:String,
required:true
},

description:{
type:String,
required:true
},

image:{
type:String,
required:true
},

githubLink:{
type:String
},

demoLink:{
type:String
},

technologies:[
String
],

featured:{
type:Boolean,
default:false
}
},
{
timestamps:true
}
);

module.exports=mongoose.model("Project",projectSchema);