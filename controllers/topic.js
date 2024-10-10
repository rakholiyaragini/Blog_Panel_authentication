const topicModel = require('../models/topics/topicModel')
const addTopics = (req,res) => {
    console.log("add topic");
    topicModel.find({})
    .then(topic => {
        console.log("topics form my db", topic);
        res.render('pages/samples/topic',{ data: req.user, topic: topic });
    })
    .catch(err => console.log(err));   
}
const addTopicsController = async(req,res) => {
    console.log("add topic controller");
    console.log("req.body",req.body);
    const data = {
        topic: req.body.topic,
        user_id : req.user._id,
        creater_name : req.user.name
    };

    let model = new topicModel(data);
    console.log("model", model);
    await model.save();

    topicModel.find({})
    .then(topic => {
        console.log("topics form my db", topic);
        res.render('pages/samples/topic',{ data: req.user, topic: topic });
    })
    .catch(err => console.log(err));
    
}
const deletTopics = async (req, res) => {
    console.log("delete blog");

    const topicId = req.params.id;

    const deletedTopic = await topicModel.findByIdAndDelete(topicId);
    console.log("deleted Topic con ", deletedTopic);


    res.redirect('/addTopics');
};

const subTopic = async (req, res) => {
    console.log("sub topic");
    res.render('pages/samples/subTopic');
};

module.exports = {addTopics,addTopicsController,deletTopics , subTopic};