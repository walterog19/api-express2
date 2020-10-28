const mongoose =require("mongoose");
const Schema = mongoose.Schema;
const collection="users"; // referencia de la colleccion en base de datos

const schema = new Schema({
    name:{         type:String , require:true  },
    username:{     type:String , require:true , lowercase:true,trim:true     },
    email:{        type:String , require:true , lowercase:true,trim:true   },
    password:{      type:String , require:true    }
}, {timestamps:true});

const model =  mongoose.model(collection,schema)
module.exports = model;


