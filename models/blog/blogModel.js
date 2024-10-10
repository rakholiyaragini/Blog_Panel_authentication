const mongoose = require('mongoose');

const blogModelSchema = mongoose.Schema({
    title : {
        type:String,
        required:true
    },
    content : {
        type:String,
        required:true,
    },
    blog_img : {
        type:String,
        required:true
    },
    user_id : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})

const blogModel = mongoose.model('blog',blogModelSchema);

module.exports = blogModel;
