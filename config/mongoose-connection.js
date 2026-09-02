const mongoose = require('mongoose');
const config = require('config');

const dbgr = require("debug")("development:mongoose");
mongoose
.connect(`${config.get("MONGODB_URI")}/traveleasy`)
.then(function(){
  dbgr("Connected");
  
}).catch(function(err){
    dbgr("Connection failed",err);
});




module.exports = mongoose.connection;
