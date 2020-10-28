
const mongoose =require("mongoose");
const Schema = mongoose.Schema;
const collection="tweets"; // referencia de la colleccion en base de datos

const schema = new Schema({
    text:{         type:String , require:true  },
    user:{     type: Schema.ObjectId, ref:"users" },
    comments:[{comment: {type:String , require:true}, 
               user:{type: Schema.ObjectId, ref:"users" }}],
     
},{timestamps :true});

const model =  mongoose.model(collection,schema)
module.exports = model;
