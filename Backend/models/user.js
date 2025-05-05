const mongoose = require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:String , required: true
    },
    email:{
        type:String , required: true , unique: true
    },
    password:{
        type:String , required:true
    },
    role:{
        type:String, enum:['user','contractor','admin'],default:'user'
    },
    location:{
        type:String
    },
    isVerified:{ type: Boolean , default:false}


});

//pre-save middleware to set is verified based on role 
userSchema.pre('save',function(next){
    if(this.role==='user'){
        this.isVerified=true;
    }
    next();
});

module.exports=mongoose.model('User',userSchema);