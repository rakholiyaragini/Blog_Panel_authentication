const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
    topic : {
        type:String,
        required:true
    },
    user_id : {
        type:String,
        ref:'user'   
    },
    creater_name : {
        type: String
    }
})

const topicModel = mongoose.model('topic',topicSchema);

module.exports = topicModel;