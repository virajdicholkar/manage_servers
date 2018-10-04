/** imports */
var mongoose=require('mongoose');

/** schema definition */
var Schema=mongoose.Schema;
var server=new Schema({
    host:String,
    port:Number,
    running:Boolean,
    api:Array,
});

module.exports=mongoose.model('server',server)