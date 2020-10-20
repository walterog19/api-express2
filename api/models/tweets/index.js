
const mongoose =require("mongoose");
const Schema = mongoose.Schema;
const collection="twitters"; // referencia de la colleccion en base de datos

const schema = new Schema({
    text:{         type:String , require:true  },
    username:{     type:String , require:true     },
    dateTime : { type : Date, default: Date.now }
   
});

const model =  mongoose.model(collection,schema)
module.exports = model;
