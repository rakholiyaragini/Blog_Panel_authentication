const mongoose = require('mongoose');

const subTopicModelSchema = mongoose.Schema({
    subTopic : {
        type:String,
        required:true
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'topic'   
    }
})

const subTopicModel = mongoose.model('subTopic',subTopicModelSchema);

module.exports = subTopicModel;